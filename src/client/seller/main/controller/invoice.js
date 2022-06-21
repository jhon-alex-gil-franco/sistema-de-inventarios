import { consultAllInvoice, consultInvoice,consultAccountsReceivable, consultInvoiceCancel } from "./consults/invoice.js";
import { createNewInvoice } from "./register/invoice.js";



export const invoice = (doc, docV) => {

  if (doc.btnGenterateNewInvoice) {
    doc.btnGenterateNewInvoice.addEventListener("click", () => {
      doc.containerNewInvoice.style.display = "block";
      doc.containerConsultInvoice.style.display = "none";
    });
  }
  if (doc.btnConsultInvoice) {
    doc.btnConsultInvoice.addEventListener("click", () => {
      doc.containerNewInvoice.style.display = "none";
      doc.containerConsultInvoice.style.display = "block";
    });
  }
  
 if(doc.btnConsultAllInvoice){
   doc.btnConsultAllInvoice.addEventListener("click",()=>{ consultAllInvoice(doc)})
 }

 if(doc.btnConsultAccountsRec){
  doc.btnConsultAccountsRec.addEventListener("click",()=>{ consultAccountsReceivable(doc)})
}

if(doc.btnConsultAllInvoceCancel){
  doc.btnConsultAllInvoceCancel.addEventListener("click",()=>{ 
    consultInvoiceCancel(doc)
  })
}

 if(doc.selectCategory){
  doc.selectCategory.addEventListener('change', ()=>{
      if(doc.selectCategory.value==="null"){doc.inputSeach.disabled=true}
      if(doc.selectCategory.value!="null"){doc.inputSeach.disabled=false}
  })
}

  createNewInvoice(doc,docV);
  consultInvoice(doc)

}