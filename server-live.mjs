import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname=path.dirname(fileURLToPath(import.meta.url));

function loadEnv(){
  const envPath=path.join(__dirname,".env.live");
  if(!fs.existsSync(envPath)) return;
  for(const raw of fs.readFileSync(envPath,"utf8").split(/\r?\n/)){
    const line=raw.trim();
    if(!line || line.startsWith("#") || !line.includes("=")) continue;
    const i=line.indexOf("=");
    const k=line.slice(0,i).trim();
    const v=line.slice(i+1).trim();
    if(!(k in process.env)) process.env[k]=v;
  }
}
loadEnv();

const PORT=Number(process.env.PORT||8083);
const MODE=process.env.PAYPAL_MODE==="live"?"live":"sandbox";
const PAYPAL_BASE=MODE==="live"?"https://api-m.paypal.com":"https://api-m.sandbox.paypal.com";
const CLIENT_ID=process.env.PAYPAL_CLIENT_ID||"";
const CLIENT_SECRET=process.env.PAYPAL_CLIENT_SECRET||"";
const APPS_SCRIPT_WEB_APP_URL=process.env.APPS_SCRIPT_WEB_APP_URL||"https://script.google.com/macros/s/AKfycbzDoV7TmgeMaTbnCs6T6nojWNAtHBsBhd8VeZPReSWJ0XZXuP47Bvhmjd-67ucqmD-pvQ/exec";

const dataDir=path.join(__dirname,"data");
const onboardingDir=path.join(dataDir,"onboarding");
fs.mkdirSync(onboardingDir,{recursive:true});

function planId(){
  if(process.env.PAYPAL_PLAN_ID) return process.env.PAYPAL_PLAN_ID;
  const file=path.join(dataDir,"paypal-plan.json");
  if(fs.existsSync(file)){
    try{return JSON.parse(fs.readFileSync(file,"utf8")).plan_id||""}catch{}
  }
  return "";
}

async function accessToken(){
  if(!CLIENT_ID||!CLIENT_SECRET) throw new Error("PayPal credentials missing");
  const auth=Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  const r=await fetch(`${PAYPAL_BASE}/v1/oauth2/token`,{
    method:"POST",
    headers:{
      "Authorization":`Basic ${auth}`,
      "Content-Type":"application/x-www-form-urlencoded"
    },
    body:"grant_type=client_credentials"
  });
  const d=await r.json();
  if(!r.ok) throw new Error(d.error_description||"Unable to get PayPal access token");
  return d.access_token;
}

async function paypalGet(endpoint){
  const token=await accessToken();
  const r=await fetch(`${PAYPAL_BASE}${endpoint}`,{
    headers:{"Authorization":`Bearer ${token}`,"Accept":"application/json"}
  });
  const d=await r.json();
  if(!r.ok) throw new Error(d.message||"PayPal API error");
  return d;
}

function json(res,status,data){
  const body=JSON.stringify(data);
  res.writeHead(status,{"Content-Type":"application/json","Content-Length":Buffer.byteLength(body)});
  res.end(body);
}

function mime(file){
  const ext=path.extname(file).toLowerCase();
  return {".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".json":"application/json"}[ext]||"application/octet-stream";
}

function bodyJson(req,limit=4*1024*1024){
  return new Promise((resolve,reject)=>{
    let data="";let size=0;
    req.on("data",c=>{size+=c.length;if(size>limit){reject(new Error("Request too large"));req.destroy();return;}data+=c});
    req.on("end",()=>{try{resolve(data?JSON.parse(data):{})}catch(e){reject(e)}});
    req.on("error",reject);
  });
}

async function verifySubscription(id){
  const sub=await paypalGet(`/v1/billing/subscriptions/${encodeURIComponent(id)}`);
  const expectedPlan=planId();
  const planMatches=!expectedPlan||sub.plan_id===expectedPlan;
  const active=sub.status==="ACTIVE";
  return {verified:active&&planMatches,status:sub.status,plan_id:sub.plan_id,subscription_id:sub.id,subscriber:sub.subscriber||null};
}

async function sendOnboardingToAppsScript(payload){
  if(!APPS_SCRIPT_WEB_APP_URL) throw new Error("Apps Script Web App URL is not configured");
  const r=await fetch(APPS_SCRIPT_WEB_APP_URL,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(payload),
    redirect:"follow"
  });
  const text=await r.text();
  let data=null;
  try{data=JSON.parse(text)}catch{}
  if(!r.ok) throw new Error(`Apps Script HTTP ${r.status}: ${text.slice(0,300)}`);
  if(data && data.success===false) throw new Error(data.error||"Apps Script reported an error");
  return data||{success:true,raw:text};
}

async function handleApi(req,res,url){
  if(req.method==="GET" && url.pathname==="/api/paypal/config"){
    return json(res,200,{mode:MODE,clientId:CLIENT_ID,planId:planId()});
  }

  if(req.method==="POST" && url.pathname==="/api/paypal/verify-subscription"){
    try{
      const body=await bodyJson(req);
      if(!body.subscriptionID) return json(res,400,{error:"subscriptionID is required"});
      return json(res,200,await verifySubscription(body.subscriptionID));
    }catch(e){return json(res,400,{error:e.message})}
  }

  if(req.method==="GET" && url.pathname.startsWith("/api/paypal/subscription/")){
    try{
      const id=decodeURIComponent(url.pathname.split("/").pop());
      return json(res,200,await verifySubscription(id));
    }catch(e){return json(res,400,{error:e.message})}
  }

  if(req.method==="POST" && url.pathname==="/api/onboarding"){
    try{
      const body=await bodyJson(req);
      if(!body.subscriptionID) return json(res,400,{error:"Missing subscription ID"});
      const verified=await verifySubscription(body.subscriptionID);
      if(!verified.verified) return json(res,403,{error:"Subscription is not active or does not match this plan."});

      body.paypalStatus=verified.status;
      body.paypalPlanId=verified.plan_id;
      body.receivedAt=new Date().toISOString();

      let logoPath=null;
      if(body.logoData){
        const m=String(body.logoData).match(/^data:(image\/(?:png|jpeg));base64,(.+)$/);
        if(!m) return json(res,400,{error:"Invalid logo format"});
        const ext=m[1]==="image/png"?".png":".jpg";
        const buf=Buffer.from(m[2],"base64");
        if(buf.length>2*1024*1024) return json(res,400,{error:"Logo exceeds 2 MB"});
        logoPath=path.join(onboardingDir,`${body.subscriptionID}${ext}`);
        fs.writeFileSync(logoPath,buf);
      }

      const backup={...body};
      delete backup.logoData;
      backup.logoStored=logoPath?path.basename(logoPath):null;
      fs.writeFileSync(path.join(onboardingDir,`${body.subscriptionID}.json`),JSON.stringify(backup,null,2));

      const emailResult=await sendOnboardingToAppsScript(body);

      return json(res,200,{
        ok:true,
        emailed:true,
        appsScript:emailResult?.success!==false,
        subscriptionID:body.subscriptionID
      });
    }catch(e){
      console.error("Onboarding error:",e);
      return json(res,400,{error:e.message});
    }
  }

  if(req.method==="POST" && url.pathname==="/api/paypal/webhook"){
    // Production note: configure PAYPAL_WEBHOOK_ID and add PayPal signature verification
    // before treating webhook payloads as authoritative.
    const body=await bodyJson(req);
    fs.appendFileSync(path.join(dataDir,"webhooks-unverified.ndjson"),JSON.stringify({receivedAt:new Date().toISOString(),body})+"\n");
    return json(res,200,{received:true,verified:false});
  }

  return false;
}

const server=http.createServer(async(req,res)=>{
  try{
    const url=new URL(req.url,`http://${req.headers.host||"localhost"}`);
    if(url.pathname.startsWith("/api/")){
      const handled=await handleApi(req,res,url);
      if(handled!==false) return;
      return json(res,404,{error:"API route not found"});
    }

    let pathname=decodeURIComponent(url.pathname);
    if(pathname==="/") pathname="/index.html";
    const file=path.normalize(path.join(__dirname,pathname));
    if(!file.startsWith(__dirname)) {res.writeHead(403);return res.end("Forbidden");}
    if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404);return res.end("Not found");}
    res.writeHead(200,{"Content-Type":mime(file),"Cache-Control":"no-store"});
    fs.createReadStream(file).pipe(res);
  }catch(e){
    console.error(e);
    json(res,500,{error:"Server error"});
  }
});

server.listen(PORT,()=>console.log(`Next Studio V9 running at http://localhost:${PORT} (${MODE})`));
