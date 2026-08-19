import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

const __dirname=path.dirname(fileURLToPath(import.meta.url));

function loadEnv(){
  const p=path.join(__dirname,".env");
  if(!fs.existsSync(p)) throw new Error("Create .env from .env.example first.");
  for(const raw of fs.readFileSync(p,"utf8").split(/\r?\n/)){
    const line=raw.trim();
    if(!line||line.startsWith("#")||!line.includes("=")) continue;
    const i=line.indexOf("=");process.env[line.slice(0,i).trim()]=line.slice(i+1).trim();
  }
}
loadEnv();

const MODE=process.env.PAYPAL_MODE==="live"?"live":"sandbox";
if(MODE!=="sandbox") throw new Error("For safety, setup-paypal.mjs only runs when PAYPAL_MODE=sandbox.");
const BASE="https://api-m.sandbox.paypal.com";
const ID=process.env.PAYPAL_CLIENT_ID;
const SECRET=process.env.PAYPAL_CLIENT_SECRET;
if(!ID||!SECRET||ID.includes("PASTE_")||SECRET.includes("PASTE_")) throw new Error("Add Sandbox Client ID and Secret to .env.");

async function token(){
  const auth=Buffer.from(`${ID}:${SECRET}`).toString("base64");
  const r=await fetch(`${BASE}/v1/oauth2/token`,{method:"POST",headers:{Authorization:`Basic ${auth}`,"Content-Type":"application/x-www-form-urlencoded"},body:"grant_type=client_credentials"});
  const d=await r.json();if(!r.ok)throw new Error(JSON.stringify(d));return d.access_token;
}
const access=await token();

async function post(endpoint,body,prefix){
  const r=await fetch(BASE+endpoint,{
    method:"POST",
    headers:{
      Authorization:`Bearer ${access}`,
      "Content-Type":"application/json",
      Accept:"application/json",
      "PayPal-Request-Id":`${prefix}-${crypto.randomUUID()}`
    },
    body:JSON.stringify(body)
  });
  const d=await r.json();
  if(!r.ok)throw new Error(JSON.stringify(d,null,2));
  return d;
}

console.log("Creating PayPal Sandbox product...");
const product=await post("/v1/catalogs/products",{
  name:"Next Studio Branded Document Generator",
  description:"Personalized Invoice, Estimate and Policy Generator",
  type:"SERVICE",
  category:"SOFTWARE"
},"NS-PRODUCT");

console.log("Product:",product.id);
console.log("Creating plan: $140 setup + 1 month free + $10/month...");

const plan=await post("/v1/billing/plans",{
  product_id:product.id,
  name:"Next Studio Generator Membership",
  description:"$140 setup, first month included, then $10 USD monthly until canceled.",
  billing_cycles:[
    {
      frequency:{interval_unit:"MONTH",interval_count:1},
      tenure_type:"TRIAL",
      sequence:1,
      total_cycles:1,
      pricing_scheme:{fixed_price:{value:"0",currency_code:"USD"}}
    },
    {
      frequency:{interval_unit:"MONTH",interval_count:1},
      tenure_type:"REGULAR",
      sequence:2,
      total_cycles:0,
      pricing_scheme:{fixed_price:{value:"10",currency_code:"USD"}}
    }
  ],
  payment_preferences:{
    auto_bill_outstanding:true,
    setup_fee:{value:"140",currency_code:"USD"},
    setup_fee_failure_action:"CANCEL",
    payment_failure_threshold:3
  }
},"NS-PLAN");

const dataDir=path.join(__dirname,"data");
fs.mkdirSync(dataDir,{recursive:true});
fs.writeFileSync(path.join(dataDir,"paypal-plan.json"),JSON.stringify({
  mode:"sandbox",
  product_id:product.id,
  plan_id:plan.id,
  created_at:new Date().toISOString()
},null,2));

console.log("\\nSUCCESS");
console.log("Product ID:",product.id);
console.log("Plan ID:",plan.id);
console.log("Saved to data/paypal-plan.json");
console.log("\\nNow run: node server.mjs");
