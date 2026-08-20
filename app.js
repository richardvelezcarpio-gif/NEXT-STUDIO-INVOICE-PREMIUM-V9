
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const money = n => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(Number(n)||0);
const today = new Date();
const addDays = (d,n)=>{let x=new Date(d);x.setDate(x.getDate()+n);return x.toISOString().slice(0,10)}
let lang = localStorage.getItem("nsLang") || "en";

const i18n = {
  en:{
    generatorName:"Invoice, Estimate & Policy Generator",newBtn:"+ New",history:"History",salesPage:"Sales Page",
    invoice:"Invoice",estimate:"Estimate",policy:"Policy",document:"Document",number:"Number",issueDate:"Issue Date",dueDate:"Due Date",taxPercent:"Tax %",
    billTo:"Bill To",clientCompany:"Client / Company",email:"Email",phone:"Phone",address:"Address",servicesItems:"Services / Items",addItem:"+ Add Item",
    adjustments:"Adjustments",discount:"Discount $",amountPaid:"Amount Paid $",notesPayment:"Notes & Payment",notes:"Notes",paymentInstructions:"Payment Instructions",
    policyDetails:"Policy Details",projectName:"Project Name",projectLocation:"Project Location",policyScope:"Scope of Work",policyTerms:"Policy / Terms",
    letterSize:"US Letter • 8.5 × 11",saveHistory:"Save to History",copyLink:"Copy Link",send:"Send",tagline:"Building Digital Businesses",
    from:"FROM",businessSolutions:"Business Digital Solutions",billToUpper:"BILL TO",description:"Description",qty:"Qty",rate:"Rate",amount:"Amount",
    notesUpper:"NOTES",paymentUpper:"PAYMENT INSTRUCTIONS",subtotal:"Subtotal",discountLabel:"Discount",tax:"Tax",total:"Total",paid:"Paid",balanceDue:"BALANCE DUE",
    policyFor:"POLICY FOR",project:"PROJECT",projectLocationUpper:"PROJECT LOCATION",scopeUpper:"SCOPE OF WORK",termsUpper:"CONSTRUCTION WORK POLICY / TERMS",
    contractorSignature:"Contractor Signature",clientSignature:"Client Signature",demoNotice:"SAMPLE / DEMO — This is a fictional construction work policy created only to demonstrate the document generator.",
    documents:"DOCUMENTS",historyNote:"Saved in this browser for the sample. Production versions can use private cloud storage.",share:"SHARE",sendDocument:"Send document",
    openEmail:"Open your email app",sendLink:"Send the document link",clientPlaceholder:"Client Name",clientInfo:"Client information",
    saved:"Saved to history",newReady:"New document ready",jpgGenerated:"JPG generated",linkCopied:"Share link copied",opened:"Document opened",
    noDocuments:"No saved documents yet.",noItems:"No items added.",service:"Service",
    invoiceUpper:"INVOICE",estimateUpper:"ESTIMATE",policyUpper:"POLICY",
    defaultNotes:"Thank you for choosing Next Studio.",defaultPayment:"Payment due by the date shown above.",
    policyProjectDefault:"Residential Renovation Sample",policyLocationDefault:"123 Sample Street, New York, NY",
    policyScopeDefault:"Interior renovation work including demolition, framing, drywall installation, painting, and finish work as described in the approved estimate.",
    v3MetaInvoiceNo:"INVOICE NO.",v3MetaEstimateNo:"ESTIMATE NO.",v3DateInvoice:"INVOICE DATE",v3DateEstimate:"ESTIMATE DATE",v3Due:"DUE DATE",v3BillTo:"BILL TO",v3Business:"BUSINESS",v3Description:"DESCRIPTION",v3Qty:"QTY",v3Unit:"UNIT",v3UnitPrice:"UNIT PRICE",v3Amount:"AMOUNT",v3Notes:"◉ NOTES",v3Payment:"▣ PAYMENT TERMS",v3Subtotal:"SUBTOTAL",v3Discount:"DISCOUNT",v3Tax:"TAX",v3Total:"TOTAL DUE",v3Balance:"BALANCE DUE",v3Authorized:"AUTHORIZED BY",v3AuthorizedSignature:"Authorized Signature",v3PaymentInfo:"▦ PAYMENT INFORMATION",v3PaymentInfoText:"Payment instructions appear in the section above.",v3FooterThanks:"Thank you for your business!",
    policyTermsDefault:"1. Work will be performed according to the approved estimate and agreed scope.\\n2. Any additional work or change order must be approved before work begins.\\n3. Client is responsible for providing reasonable access to the work area.\\n4. Material availability and unforeseen site conditions may affect the schedule.\\n5. Deposits and progress payments are due according to the agreed payment schedule.\\n6. Workmanship issues must be reported within the agreed warranty period.\\n7. This document is a SAMPLE construction work policy for demonstration purposes only."
  },
  es:{
    generatorName:"Generador de Facturas, Cotizaciones y Policy",newBtn:"+ Nuevo",history:"Historial",salesPage:"Página de Venta",
    invoice:"Factura",estimate:"Cotización",policy:"Policy",document:"Documento",number:"Número",issueDate:"Fecha",dueDate:"Vencimiento",taxPercent:"Impuesto %",
    billTo:"Facturar A",clientCompany:"Cliente / Compañía",email:"Email",phone:"Teléfono",address:"Dirección",servicesItems:"Servicios / Productos",addItem:"+ Agregar",
    adjustments:"Ajustes",discount:"Descuento $",amountPaid:"Pago Recibido $",notesPayment:"Notas y Pago",notes:"Notas",paymentInstructions:"Instrucciones de Pago",
    policyDetails:"Detalles de Policy",projectName:"Nombre del Proyecto",projectLocation:"Ubicación del Proyecto",policyScope:"Alcance del Trabajo",policyTerms:"Policy / Términos",
    letterSize:"US Letter • 8.5 × 11",saveHistory:"Guardar en Historial",copyLink:"Copiar Link",send:"Enviar",tagline:"Construyendo Negocios Digitales",
    from:"DE",businessSolutions:"Soluciones Digitales para Negocios",billToUpper:"FACTURAR A",description:"Descripción",qty:"Cant.",rate:"Precio",amount:"Importe",
    notesUpper:"NOTAS",paymentUpper:"INSTRUCCIONES DE PAGO",subtotal:"Subtotal",discountLabel:"Descuento",tax:"Impuesto",total:"Total",paid:"Pagado",balanceDue:"SALDO PENDIENTE",
    policyFor:"POLICY PARA",project:"PROYECTO",projectLocationUpper:"UBICACIÓN DEL PROYECTO",scopeUpper:"ALCANCE DEL TRABAJO",termsUpper:"POLICY / TÉRMINOS DEL TRABAJO DE CONSTRUCCIÓN",
    contractorSignature:"Firma del Contratista",clientSignature:"Firma del Cliente",demoNotice:"SAMPLE / DEMO — Esta es una policy ficticia de trabajo de construcción creada únicamente para demostrar el generador de documentos.",
    documents:"DOCUMENTOS",historyNote:"Guardado en este navegador para el sample. La versión de producción puede usar almacenamiento privado en la nube.",share:"COMPARTIR",sendDocument:"Enviar documento",
    openEmail:"Abrir aplicación de email",sendLink:"Enviar el link del documento",clientPlaceholder:"Nombre del Cliente",clientInfo:"Información del cliente",
    saved:"Guardado en historial",newReady:"Nuevo documento listo",jpgGenerated:"JPG generado",linkCopied:"Link copiado",opened:"Documento abierto",
    noDocuments:"Todavía no hay documentos guardados.",noItems:"No hay productos o servicios.",service:"Servicio",
    invoiceUpper:"FACTURA",estimateUpper:"COTIZACIÓN",policyUpper:"POLICY",
    defaultNotes:"Gracias por elegir Next Studio.",defaultPayment:"El pago vence en la fecha indicada arriba.",
    policyProjectDefault:"Sample de Renovación Residencial",policyLocationDefault:"123 Sample Street, New York, NY",
    policyScopeDefault:"Trabajo de renovación interior incluyendo demolición, framing, instalación de drywall, pintura y acabados según la cotización aprobada.",
    v3MetaInvoiceNo:"FACTURA N.º",v3MetaEstimateNo:"COTIZACIÓN N.º",v3DateInvoice:"FECHA DE FACTURA",v3DateEstimate:"FECHA DE COTIZACIÓN",v3Due:"VENCIMIENTO",v3BillTo:"FACTURAR A",v3Business:"NEGOCIO",v3Description:"DESCRIPCIÓN",v3Qty:"CANT.",v3Unit:"UNIDAD",v3UnitPrice:"PRECIO UNITARIO",v3Amount:"IMPORTE",v3Notes:"◉ NOTAS",v3Payment:"▣ TÉRMINOS DE PAGO",v3Subtotal:"SUBTOTAL",v3Discount:"DESCUENTO",v3Tax:"IMPUESTO",v3Total:"TOTAL A PAGAR",v3Balance:"SALDO PENDIENTE",v3Authorized:"AUTORIZADO POR",v3AuthorizedSignature:"Firma Autorizada",v3PaymentInfo:"▦ INFORMACIÓN DE PAGO",v3PaymentInfoText:"Las instrucciones de pago aparecen en la sección superior.",v3FooterThanks:"¡Gracias por su negocio!",
    policyTermsDefault:"1. El trabajo se realizará según la cotización aprobada y el alcance acordado.\\n2. Todo trabajo adicional o change order debe aprobarse antes de comenzar.\\n3. El cliente es responsable de proporcionar acceso razonable al área de trabajo.\\n4. La disponibilidad de materiales y condiciones imprevistas pueden afectar el calendario.\\n5. Los depósitos y pagos de progreso vencen según el calendario acordado.\\n6. Cualquier problema de mano de obra debe reportarse dentro del período de garantía acordado.\\n7. Este documento es una POLICY SAMPLE ficticia para fines de demostración únicamente."
  }
};

const state = {
  type:'invoice',
  items:[
    {description:'Website / Digital Service', qty:1, rate:950},
    {description:'Business Setup', qty:1, rate:300}
  ]
};

$('#issueDate').value = today.toISOString().slice(0,10);
$('#dueDate').value = addDays(today,7);

function t(k){ return i18n[lang][k] ?? k }
function toast(msg){const el=$('#toast');el.textContent=msg;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),1800)}
function esc(s=''){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}

function applyLanguage(updateDefaults=false){
  document.documentElement.lang = lang;
  $$('[data-i18n]').forEach(el=>{const k=el.dataset.i18n;if(i18n[lang][k]!=null)el.textContent=i18n[lang][k]});
  $$('.lang-btn').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));
  $$('[data-ph-en]').forEach(el=>el.placeholder=el.dataset['ph'+(lang==='en'?'En':'Es')]);

  if(updateDefaults){
    $('#notes').value=t('defaultNotes');
    $('#paymentInstructions').value=t('defaultPayment');
    $('#projectName').value=t('policyProjectDefault');
    $('#projectLocation').value=t('policyLocationDefault');
    $('#policyScope').value=t('policyScopeDefault');
    $('#policyTerms').value=t('policyTermsDefault');
  }
  renderEditors();
  renderPreview();
}

$$('.lang-btn').forEach(btn=>btn.onclick=()=>{
  lang=btn.dataset.lang;
  localStorage.setItem('nsLang',lang);
  applyLanguage(true);
});

function renderEditors(){
  $('#itemsEditor').innerHTML = state.items.map((it,i)=>`
    <div class="item-editor" data-i="${i}">
      <label>${t('description')}<input data-k="description" value="${esc(it.description)}"></label>
      <label>${t('qty')}<input data-k="qty" type="number" min="0" step="1" value="${it.qty}"></label>
      <label>${t('rate')}<input data-k="rate" type="number" min="0" step=".01" value="${it.rate}"></label>
      <button data-remove="${i}">×</button>
    </div>`).join('');
  $$('.item-editor input').forEach(inp=>inp.addEventListener('input',e=>{
    const row=e.target.closest('.item-editor'), i=+row.dataset.i, k=e.target.dataset.k;
    state.items[i][k]=k==='description'?e.target.value:Number(e.target.value);
    renderPreview();
  }));
  $$('[data-remove]').forEach(b=>b.onclick=()=>{
    state.items.splice(+b.dataset.remove,1);
    renderEditors();
    renderPreview();
  });
}

function getData(){
  return {
    lang,type:state.type,number:$('#docNumber').value,issueDate:$('#issueDate').value,dueDate:$('#dueDate').value,
    clientName:$('#clientName').value,clientEmail:$('#clientEmail').value,clientPhone:$('#clientPhone').value,
    clientAddress:$('#clientAddress').value,taxRate:+$('#taxRate').value||0,discount:+$('#discount').value||0,
    paid:+$('#paid').value||0,notes:$('#notes').value,paymentInstructions:$('#paymentInstructions').value,
    projectName:$('#projectName').value,projectLocation:$('#projectLocation').value,policyScope:$('#policyScope').value,policyTerms:$('#policyTerms').value,
    items:JSON.parse(JSON.stringify(state.items))
  }
}

function typeTitle(){
  if(state.type==='invoice') return t('invoiceUpper');
  if(state.type==='estimate') return t('estimateUpper');
  return t('policyUpper');
}

function renderPreview(){
  const d=getData();
  const subtotal=d.items.reduce((s,it)=>s+(Number(it.qty)||0)*(Number(it.rate)||0),0);
  const taxable=Math.max(0,subtotal-d.discount), tax=taxable*(d.taxRate/100), total=taxable+tax, balance=total-d.paid;

  const isPolicy=d.type==='policy';

  // Toggle V3 invoice/estimate visual vs V4 policy visual.
  $('#invoiceEstimatePreview').classList.toggle('hidden',isPolicy);
  $('#policyPreview').classList.toggle('hidden',!isPolicy);
  $$('.invoice-estimate-only').forEach(el=>el.classList.toggle('hidden',isPolicy));
  $('.policy-only').classList.toggle('hidden',!isPolicy);
  $('.tax-field').classList.toggle('hidden',isPolicy);
  $('.due-field').classList.toggle('hidden',isPolicy);

  if(!isPolicy){
    $('#previewType').textContent=d.type==='invoice'?t('invoiceUpper'):t('estimateUpper');
    $('#previewNumber').textContent=d.number;
    $('#pIssueDate').textContent=d.issueDate||'—';
    $('#pDueDate').textContent=d.dueDate||'—';
    $('#pClientName').textContent=d.clientName||t('clientPlaceholder');
    $('#pClientInfo').innerHTML=[d.clientAddress,d.clientEmail,d.clientPhone].filter(Boolean).map(esc).join('<br>')||t('clientInfo');

    // V3 visual labels: ONLY one selected language at a time.
    $('#metaNumberLabel').textContent=d.type==='invoice'?t('v3MetaInvoiceNo'):t('v3MetaEstimateNo');
    $('#metaDateLabel').textContent=d.type==='invoice'?t('v3DateInvoice'):t('v3DateEstimate');
    $('#metaDueLabel').textContent=t('v3Due');
    $('#v3BillToLabel').textContent=t('v3BillTo');
    $('#v3BusinessLabel').textContent=t('v3Business');
    $('#v3DescriptionLabel').textContent=t('v3Description');
    $('#v3QtyLabel').textContent=t('v3Qty');
    $('#v3UnitLabel').textContent=t('v3Unit');
    $('#v3PriceLabel').textContent=t('v3UnitPrice');
    $('#v3AmountLabel').textContent=t('v3Amount');
    $('#v3NotesLabel').textContent=t('v3Notes');
    $('#v3PaymentLabel').textContent=t('v3Payment');
    $('#v3SubtotalLabel').textContent=t('v3Subtotal');
    $('#v3DiscountLabel').textContent=t('v3Discount');
    $('#v3TaxLabel').textContent=t('v3Tax');
    $('#v3TotalLabel').textContent=t('v3Total');
    $('#v3BalanceLabel').textContent=t('v3Balance');
    $('#v3AuthorizedLabel').textContent=t('v3Authorized');
    $('#v3AuthorizedSignature').textContent=t('v3AuthorizedSignature');
    $('#v3PaymentInfoLabel').textContent=t('v3PaymentInfo');
    $('#v3PaymentInfoText').textContent=t('v3PaymentInfoText');
    $('#v3FooterThanks').textContent=t('v3FooterThanks');

    $('#previewItems').innerHTML=d.items.length?d.items.map((it,i)=>`
      <tr>
        <td>${i+1}</td>
        <td>${esc(it.description||t('service'))}</td>
        <td>${it.qty||0}</td>
        <td>${lang==='es'?'Servicio':'Service'}</td>
        <td>${money(it.rate)}</td>
        <td>${money((it.qty||0)*(it.rate||0))}</td>
      </tr>`).join(''):`<tr><td colspan="6">${t('noItems')}</td></tr>`;

    $('#pSubtotal').textContent=money(subtotal);
    $('#pDiscount').textContent='-'+money(d.discount);
    $('#pTax').textContent=money(tax);
    $('#pTotal').textContent=money(total);
    $('#pBalance').textContent=money(balance);
    $('#pNotes').textContent=d.notes;
    $('#pPayment').textContent=d.paymentInstructions;
  } else {
    $('#policyPreviewType').textContent=t('policyUpper');
    $('#policyPreviewNumber').textContent='#'+d.number;
    $('#pPolicyIssueDate').textContent=d.issueDate||'—';
    $('#pPolicyHeaderClient').textContent=d.clientName||t('clientPlaceholder');
    $('#pPolicyHeaderInfo').innerHTML=[d.clientAddress,d.clientEmail,d.clientPhone].filter(Boolean).map(esc).join('<br>')||t('clientInfo');
    $('#pPolicyClient').textContent=d.clientName||t('clientPlaceholder');
    $('#pProjectName').textContent=d.projectName||'—';
    $('#pProjectLocation').textContent=d.projectLocation||'—';
    $('#pPolicyScope').textContent=d.policyScope||'—';
    $('#pPolicyTerms').textContent=d.policyTerms||'—';
  }

  return {...d,subtotal,tax,total,balance};
}

$$('.form-section input,.form-section textarea').forEach(el=>el.addEventListener('input',renderPreview));

$('#addItem').onclick=()=>{
  state.items.push({description:t('service'),qty:1,rate:0});
  renderEditors();renderPreview();
};

function setType(type, resetNumber=true){
  state.type=type;
  $$('.doc-tabs button').forEach(b=>b.classList.toggle('active',b.dataset.type===type));
  if(resetNumber){
    $('#docNumber').value=type==='invoice'?'NS-INV-1001':type==='estimate'?'NS-EST-1001':'NS-POL-1001';
  }
  renderPreview();
}
$$('.doc-tabs button').forEach(btn=>btn.onclick=()=>setType(btn.dataset.type,true));

function saveHistory(show=true){
  const d=renderPreview(), list=JSON.parse(localStorage.getItem('nsInvoiceHistoryV4')||'[]');
  const item={...d,savedAt:new Date().toISOString()};
  const existing=list.findIndex(x=>x.number===d.number&&x.type===d.type);
  if(existing>=0)list[existing]=item;else list.unshift(item);
  localStorage.setItem('nsInvoiceHistoryV4',JSON.stringify(list.slice(0,75)));
  if(show)toast(t('saved'));
  return item;
}
$('#saveBtn').onclick=()=>saveHistory();

function nextNumber(){
  const d=getData(), m=d.number.match(/(\d+)$/), next=m?String(+m[1]+1).padStart(m[1].length,'0'):'1001';
  return d.type==='invoice'?`NS-INV-${next}`:d.type==='estimate'?`NS-EST-${next}`:`NS-POL-${next}`;
}
$('#newDoc').onclick=()=>{
  saveHistory(false);
  $('#docNumber').value=nextNumber();
  $('#clientName').value='';$('#clientEmail').value='';$('#clientPhone').value='';$('#clientAddress').value='';
  $('#paid').value=0;
  state.items=[{description:t('service'),qty:1,rate:0}];
  renderEditors();renderPreview();toast(t('newReady'));
};


async function waitForImages(root){
  const images=[...root.querySelectorAll('img')];
  await Promise.all(images.map(img=>{
    if(img.complete && img.naturalWidth) return Promise.resolve();
    return new Promise(resolve=>{
      img.addEventListener('load',resolve,{once:true});
      img.addEventListener('error',resolve,{once:true});
    });
  }));
}

async function captureExactDocument(){
  if(typeof html2canvas!=='function'){
    throw new Error('html2canvas is not loaded');
  }

  renderPreview();

  const original=$('#invoicePaper');
  const stage=document.createElement('div');

  stage.style.position='fixed';
  stage.style.left='-12000px';
  stage.style.top='0';
  stage.style.width='8.5in';
  stage.style.height='11in';
  stage.style.background='#fff';
  stage.style.overflow='hidden';
  stage.style.zIndex='-9999';

  const clone=original.cloneNode(true);

  clone.removeAttribute('id');
  clone.style.transform='none';
  clone.style.transformOrigin='top left';
  clone.style.margin='0';
  clone.style.width='8.5in';
  clone.style.minHeight='11in';
  clone.style.height='11in';
  clone.style.boxShadow='none';
  clone.style.position='relative';
  clone.style.left='0';
  clone.style.top='0';

  stage.appendChild(clone);
  document.body.appendChild(stage);

  try{
    await document.fonts?.ready;
    await waitForImages(clone);

    const canvas=await html2canvas(clone,{
      backgroundColor:'#ffffff',
      scale:2,
      useCORS:true,
      allowTaint:false,
      logging:false,
      width:clone.scrollWidth,
      height:clone.scrollHeight,
      windowWidth:clone.scrollWidth,
      windowHeight:clone.scrollHeight,
      scrollX:0,
      scrollY:0
    });

    return canvas;
  }finally{
    stage.remove();
  }
}

function canvasToBlob(canvas,type='image/jpeg',quality=.96){
  return new Promise((resolve,reject)=>{
    canvas.toBlob(blob=>{
      if(blob) resolve(blob);
      else reject(new Error('Unable to generate file'));
    },type,quality);
  });
}

async function buildPdfBlob(){
  if(!window.jspdf?.jsPDF){
    throw new Error('jsPDF is not loaded');
  }

  const canvas=await captureExactDocument();
  const imageData=canvas.toDataURL('image/jpeg',.96);
  const {jsPDF}=window.jspdf;

  const pdf=new jsPDF({
    orientation:'portrait',
    unit:'in',
    format:'letter',
    compress:true
  });

  // One exact US Letter page: 8.5 × 11.
  pdf.addImage(imageData,'JPEG',0,0,8.5,11,undefined,'FAST');
  return pdf.output('blob');
}

function downloadBlob(blob,filename){
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download=filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1500);
}

$('#pdfBtn').onclick=async()=>{
  saveHistory(false);
  const btn=$('#pdfBtn');
  const old=btn.textContent;
  try{
    btn.disabled=true;
    btn.textContent='Generating PDF...';
    const d=renderPreview();
    const blob=await buildPdfBlob();
    downloadBlob(blob,`${d.number}.pdf`);
    toast(lang==='es'?'PDF generado':'PDF generated');
  }catch(err){
    console.error(err);
    alert(lang==='es'?'No se pudo generar el PDF.':'Could not generate PDF.');
  }finally{
    btn.disabled=false;
    btn.textContent=old;
  }
};

async function createJpg(){
  const d=renderPreview();
  const canvas=await captureExactDocument();
  const blob=await canvasToBlob(canvas,'image/jpeg',.96);
  downloadBlob(blob,`${d.number}.jpg`);
  toast(t('jpgGenerated'));
}

$('#jpgBtn').onclick=async()=>{
  saveHistory(false);
  const btn=$('#jpgBtn');
  const old=btn.textContent;
  try{
    btn.disabled=true;
    btn.textContent='Generating JPG...';
    await createJpg();
  }catch(err){
    console.error(err);
    alert(lang==='es'?'No se pudo generar la imagen.':'Could not generate JPG.');
  }finally{
    btn.disabled=false;
    btn.textContent=old;
  }
};


function bytesToBase64Url(bytes){
  let binary='';
  const chunk=0x8000;

  for(let i=0;i<bytes.length;i+=chunk){
    binary+=String.fromCharCode(...bytes.subarray(i,i+chunk));
  }

  return btoa(binary)
    .replace(/\+/g,'-')
    .replace(/\//g,'_')
    .replace(/=+$/,'');
}

function base64UrlToBytes(value){
  let base64=value
    .replace(/-/g,'+')
    .replace(/_/g,'/');

  while(base64.length%4){
    base64+='=';
  }

  const binary=atob(base64);
  const bytes=new Uint8Array(binary.length);

  for(let i=0;i<binary.length;i++){
    bytes[i]=binary.charCodeAt(i);
  }

  return bytes;
}

async function compressShareData(data){
  const json=JSON.stringify(data);
  const input=new TextEncoder().encode(json);

  if(typeof CompressionStream!=='function'){
    return 'u.'+bytesToBase64Url(input);
  }

  const stream=new Blob([input])
    .stream()
    .pipeThrough(new CompressionStream('deflate-raw'));

  const compressed=new Uint8Array(
    await new Response(stream).arrayBuffer()
  );

  return 'z.'+bytesToBase64Url(compressed);
}

async function decompressShareData(payload){
  const mode=payload.slice(0,2);
  const value=payload.slice(2);
  const bytes=base64UrlToBytes(value);

  if(mode==='u.'){
    return JSON.parse(
      new TextDecoder().decode(bytes)
    );
  }

  if(mode!=='z.'){
    throw new Error('Unsupported share link');
  }

  if(typeof DecompressionStream!=='function'){
    throw new Error('This browser cannot open compressed share links');
  }

  const stream=new Blob([bytes])
    .stream()
    .pipeThrough(new DecompressionStream('deflate-raw'));

  const decompressed=await new Response(stream).arrayBuffer();

  return JSON.parse(
    new TextDecoder().decode(decompressed)
  );
}

async function encodeShare(){
  const payload=await compressShareData(getData());
  return `${location.origin}${location.pathname}#s=${payload}`;
}

$('#shareBtn').onclick=async()=>{
  saveHistory(false);

  try{
    const url=await encodeShare();
    await navigator.clipboard.writeText(url);
    toast(t('linkCopied'));
  }catch(err){
    console.error(err);

    try{
      const url=await encodeShare();
      prompt('Copy:',url);
    }catch(innerErr){
      console.error(innerErr);
      alert(
        lang==='es'
          ?'No se pudo generar el link.'
          :'Could not generate the link.'
      );
    }
  }
};

function cleanEmailText(d){
  const docName=typeTitle();
  if(lang==='es'){
    return `Hola ${d.clientName||''},

Adjunto encontrará su ${docName.toLowerCase()} ${d.number}.

Gracias por su preferencia.

Next Studio`;
  }

  return `Hello ${d.clientName||''},

Attached is your ${docName.toLowerCase()} ${d.number}.

Thank you for your business.

Next Studio`;
}

$('#sendBtn').onclick=()=>{
  saveHistory(false);
  const d=renderPreview();
  const body=cleanEmailText(d);

  // WhatsApp no longer receives the giant encoded document URL.
  $('#waLink').href=`https://wa.me/?text=${encodeURIComponent(body)}`;
  $('#sendDialog').showModal();
};

$('#emailLink').onclick=async(e)=>{
  e.preventDefault();

  const d=renderPreview();
  const docName=typeTitle();
  const subject=`${docName} ${d.number} - Next Studio`;
  const body=cleanEmailText(d);

  const link=$('#emailLink');
  const old=link.innerHTML;

  try{
    link.style.pointerEvents='none';
    link.innerHTML='<b>Preparing PDF...</b><small>Please wait</small>';

    const pdfBlob=await buildPdfBlob();
    const file=new File([pdfBlob],`${d.number}.pdf`,{type:'application/pdf'});

    // Best result: native share sheet with the actual PDF attached.
    if(navigator.share && (!navigator.canShare || navigator.canShare({files:[file]}))){
      await navigator.share({
        title:subject,
        text:body,
        files:[file]
      });
      return;
    }

    // Fallback for browsers that cannot attach a file to the share sheet:
    // download the PDF and open a CLEAN email without the huge data link.
    downloadBlob(pdfBlob,`${d.number}.pdf`);

    const mailto=`mailto:${encodeURIComponent(d.clientEmail||'')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href=mailto;

    setTimeout(()=>{
      alert(
        lang==='es'
          ?`El PDF ${d.number}.pdf fue descargado. Adjúnte ese archivo al email que se abrió.`
          :`The PDF ${d.number}.pdf was downloaded. Attach that file to the email that opened.`
      );
    },700);

  }catch(err){
    if(err?.name!=='AbortError'){
      console.error(err);
      alert(lang==='es'?'No se pudo preparar el PDF para email.':'Could not prepare the PDF for email.');
    }
  }finally{
    link.style.pointerEvents='';
    link.innerHTML=old;
  }
};

$('#closeSend').onclick=()=>$('#sendDialog').close();


function loadData(d){
  if(d.lang){lang=d.lang;localStorage.setItem('nsLang',lang)}
  setType(d.type||'invoice',false);
  const map={docNumber:'number',issueDate:'issueDate',dueDate:'dueDate',clientName:'clientName',clientEmail:'clientEmail',clientPhone:'clientPhone',clientAddress:'clientAddress',taxRate:'taxRate',discount:'discount',paid:'paid',notes:'notes',paymentInstructions:'paymentInstructions',projectName:'projectName',projectLocation:'projectLocation',policyScope:'policyScope',policyTerms:'policyTerms'};
  Object.entries(map).forEach(([id,k])=>{if(d[k]!==undefined)$('#'+id).value=d[k]});
  state.items=d.items||[];
  applyLanguage(false);renderEditors();renderPreview();
}

function showHistory(){
  const list=JSON.parse(localStorage.getItem('nsInvoiceHistoryV4')||'[]');
  $('#historyList').innerHTML=list.length?list.map((d,i)=>`
    <div class="history-row">
      <div><b>${esc(d.number)}</b><br><small>${esc((d.type||'').toUpperCase())}</small></div>
      <div>${esc(d.clientName||t('clientPlaceholder'))}</div>
      <div><b>${d.type==='policy'?'—':money(d.total)}</b><br><small>${new Date(d.savedAt).toLocaleDateString()}</small></div>
      <button data-open="${i}">Open</button>
    </div>`).join(''):`<p class="muted">${t('noDocuments')}</p>`;
  $$('[data-open]').forEach(b=>b.onclick=()=>{loadData(list[+b.dataset.open]);$('#historyDialog').close();toast(t('opened'))});
  $('#historyDialog').showModal();
}
$('#historyBtn').onclick=showHistory;
$('#closeHistory').onclick=()=>$('#historyDialog').close();

async function loadFromHash(){
  if(location.hash.startsWith('#s=')){
    try{
      const payload=location.hash.slice(3);
      const d=await decompressShareData(payload);

      loadData(d);
      toast(t('opened'));
    }catch(e){
      console.error(e);
    }

    return;
  }

  // Compatibilidad con los links largos anteriores
  if(location.hash.startsWith('#doc=')){
    try{
      const raw=decodeURIComponent(location.hash.slice(5));

      const d=JSON.parse(
        decodeURIComponent(
          escape(atob(raw))
        )
      );

      loadData(d);
      toast(t('opened'));
    }catch(e){
      console.error(e);
    }
  }
}


applyLanguage(false);
renderEditors();
renderPreview();
loadFromHash();
