import { consultEgress,consultAllEgress } from "./consults/egress.js";
import { complemetRegEgress, registerNewEgress } from "./register/egress.js";

export const egress=(doc)=>{
    consultEgress(doc)
   
    if(doc.btnRegEgress){doc.btnRegEgress.addEventListener('click', (e)=>{registerNewEgress(doc)})}

    if(doc.btnGenterateEgress){
        doc.btnGenterateEgress.addEventListener('click', ()=>{
            complemetRegEgress(doc)
            doc.containerRegEgress.style.display="block"
            doc.containerConsultEgress.style.display="none"
        })
    }
    if(doc.btnConsultEgress){
        doc.btnConsultEgress.addEventListener('click', (e)=>{
            doc.containerConsultEgress.style.display="block"
            doc.containerRegEgress.style.display="none"
        })
    }
   
    if(doc.btnConsultAllEgress){
        doc.btnConsultAllEgress.addEventListener('click', (e)=>{
            consultAllEgress(doc) 
        })
    }

    if(doc.btnCancelEgress){
        doc.btnCancelEgress.addEventListener('click', (e)=>{
            doc.form.reset();
        })
    }

    if(doc.selectEgress){
        doc.selectEgress.addEventListener('change', ()=>{
            if(doc.selectEgress.value==="null"){doc.inputSeach.disabled=true}
            if(doc.selectEgress.value!="null"){doc.inputSeach.disabled=false}
        })
    }
}
