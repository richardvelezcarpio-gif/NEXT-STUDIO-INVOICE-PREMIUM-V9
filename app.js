
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

$('#pdfBtn').onclick=()=>{saveHistory(false);window.print()};

function createJpg(){
  const d=renderPreview(), W=1275,H=1650,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
  x.fillStyle='#fff';x.fillRect(0,0,W,H);x.fillStyle='#081d3a';x.fillRect(0,0,W,18);
  x.fillStyle='#081d3a';x.font='bold 40px Arial';x.fillText('NEXT',90,110);x.fillStyle='#1473e6';x.fillText('STUDIO',220,110);
  x.fillStyle='#081d3a';x.font='bold 54px Arial';x.textAlign='right';x.fillText(typeTitle(),1185,110);x.textAlign='left';
  x.fillStyle='#1473e6';x.font='bold 20px Arial';x.textAlign='right';x.fillText('#'+d.number,1185,150);x.textAlign='left';
  x.fillStyle='#dbe7f3';x.fillRect(90,185,1095,3);

  x.fillStyle='#1473e6';x.font='bold 14px Arial';x.fillText(t('billToUpper'),90,255);
  x.fillStyle='#081d3a';x.font='bold 25px Arial';x.fillText(d.clientName||t('clientPlaceholder'),90,290);

  if(d.type==='policy'){
    x.fillStyle='#1473e6';x.font='bold 15px Arial';x.fillText(t('projectLocationUpper'),90,390);
    x.fillStyle='#63758a';x.font='18px Arial';wrapText(x,d.projectLocation,90,425,1050,26);
    x.fillStyle='#1473e6';x.font='bold 15px Arial';x.fillText(t('scopeUpper'),90,560);
    x.fillStyle='#63758a';x.font='18px Arial';wrapText(x,d.policyScope,90,595,1050,26);
    x.fillStyle='#1473e6';x.font='bold 15px Arial';x.fillText(t('termsUpper'),90,760);
    x.fillStyle='#63758a';x.font='17px Arial';wrapText(x,d.policyTerms,90,800,1050,27);
    x.fillStyle='#88671a';x.font='bold 14px Arial';wrapText(x,t('demoNotice'),90,1460,1050,24);
  } else {
    let y=430;x.fillStyle='#081d3a';x.fillRect(90,y,1095,55);x.fillStyle='#fff';x.font='bold 15px Arial';
    x.fillText(t('description').toUpperCase(),110,y+34);x.textAlign='right';x.fillText(t('qty').toUpperCase(),850,y+34);x.fillText(t('rate').toUpperCase(),1010,y+34);x.fillText(t('amount').toUpperCase(),1165,y+34);x.textAlign='left';y+=80;
    x.font='20px Arial';
    d.items.forEach(it=>{x.fillStyle='#16304e';x.fillText(String(it.description||t('service')).slice(0,55),110,y);x.textAlign='right';x.fillText(String(it.qty||0),850,y);x.fillText(money(it.rate),1010,y);x.fillText(money((it.qty||0)*(it.rate||0)),1165,y);x.textAlign='left';x.fillStyle='#e5edf5';x.fillRect(90,y+25,1095,2);y+=65});
    y=Math.max(y+80,850);x.fillStyle='#63758a';x.font='18px Arial';x.fillText(t('subtotal'),820,y);x.textAlign='right';x.fillText(money(d.subtotal),1165,y);y+=38;x.textAlign='left';x.fillText(t('discountLabel'),820,y);x.textAlign='right';x.fillText('-'+money(d.discount),1165,y);y+=38;x.textAlign='left';x.fillText(t('tax'),820,y);x.textAlign='right';x.fillText(money(d.tax),1165,y);y+=38;
    x.fillStyle='#081d3a';x.fillRect(800,y,385,85);x.fillStyle='#fff';x.font='bold 16px Arial';x.textAlign='left';x.fillText(t('balanceDue'),825,y+50);x.fillStyle='#5eb4ff';x.font='bold 29px Arial';x.textAlign='right';x.fillText(money(d.balance),1160,y+52);x.textAlign='left';
  }
  x.fillStyle='#e5edf5';x.fillRect(90,1545,1095,2);x.fillStyle='#7b8c9e';x.font='14px Arial';x.fillText('nextstudio.agency',90,1585);x.textAlign='right';x.fillText('Powered by Next Studio',1185,1585);
  const a=document.createElement('a');a.download=`${d.number}.jpg`;a.href=c.toDataURL('image/jpeg',.94);a.click();toast(t('jpgGenerated'));
}
function wrapText(ctx,text,x,y,maxWidth,lineHeight){
  let paragraphs=String(text||'').split('\\n');
  paragraphs.forEach(p=>{
    let words=p.split(/\\s+/),line='';
    for(const w of words){let test=line+w+' ';if(ctx.measureText(test).width>maxWidth&&line){ctx.fillText(line,x,y);line=w+' ';y+=lineHeight}else line=test}
    ctx.fillText(line,x,y);y+=lineHeight;
  });
}
$('#jpgBtn').onclick=()=>{saveHistory(false);createJpg()};

function encodeShare(){
  const d=getData(), payload=btoa(unescape(encodeURIComponent(JSON.stringify(d))));
  return location.origin+location.pathname+'#doc='+encodeURIComponent(payload);
}
$('#shareBtn').onclick=async()=>{
  saveHistory(false);
  const url=encodeShare();
  try{await navigator.clipboard.writeText(url);toast(t('linkCopied'))}catch{prompt('Copy:',url)}
};
$('#sendBtn').onclick=()=>{
  const d=renderPreview(),url=encodeShare();
  const docName=typeTitle();
  const subject=encodeURIComponent(`${docName} ${d.number} - Next Studio`);
  const intro=lang==='es'?`Hola ${d.clientName||''},\\n\\nAquí está su ${docName.toLowerCase()}: ${url}\\n\\nGracias,\\nNext Studio`:`Hello ${d.clientName||''},\\n\\nHere is your ${docName.toLowerCase()}: ${url}\\n\\nThank you,\\nNext Studio`;
  const body=encodeURIComponent(intro);
  $('#emailLink').href=`mailto:${encodeURIComponent(d.clientEmail||'')}?subject=${subject}&body=${body}`;
  $('#waLink').href=`https://wa.me/?text=${body}`;
  $('#sendDialog').showModal();
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

function loadFromHash(){
  if(!location.hash.startsWith('#doc='))return;
  try{
    const raw=decodeURIComponent(location.hash.slice(5));
    const d=JSON.parse(decodeURIComponent(escape(atob(raw))));
    loadData(d);
    toast(t('opened'));
  }catch(e){console.error(e)}
}

applyLanguage(false);
renderEditors();
renderPreview();
loadFromHash();
