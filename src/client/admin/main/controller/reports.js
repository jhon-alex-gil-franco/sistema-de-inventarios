import { dropChildOfTable } from "../helpers/helpers.js"
import { reportsEmployee, reportsSales, reportsTopSales } from "./consults/report.js"
import{url}from "../helpers/global.js";
import { consultData } from "../helpers/functions.js";
import { componetSelectOptions } from "../component/componentSelect.js";

export const reports=(doc)=>{
  
  if(doc.btnForEmployee){
    doc.btnForEmployee.addEventListener('click', ()=>{
      doc.containerReportEmployee.style.display="block"
      doc.containerReportTopSales.style.display="none"
      doc.containerReportSales.style.display="none"
    })
  }
  
  if(doc.btnForSales){
    doc.btnForSales.addEventListener('click', ()=>{
      doc.containerReportEmployee.style.display="none"
      doc.containerReportTopSales.style.display="none"
      doc.containerReportSales.style.display="block"
    })
  }
  if(doc.btnForTopSales){
    doc.btnForTopSales.addEventListener('click', ()=>{
      doc.containerReportEmployee.style.display="none"
      doc.containerReportSales.style.display="none"
      doc.containerReportTopSales.style.display="block"
      
    })
  }
      
  if(doc.btnClearConsultSales){ 
    doc.btnClearConsultSales.addEventListener("click",()=>{ 
      dropChildOfTable(doc.tableReportSales)
    })
  }
  
  if(doc.btnClearConsultEmployee){ 
    doc.btnClearConsultEmployee.addEventListener("click",()=>{
      dropChildOfTable(doc.tableReportEmployee)
    })
  }
  
  if(doc.btnClearConsultTopSales){ 
    doc.btnClearConsultTopSales.addEventListener("click",()=>{ 
      dropChildOfTable(doc.tableReportTopSales)
    })
  }
  
  
  if(doc.btnListEmployee){
    doc.btnListEmployee.addEventListener("click",()=>{
      reportsEmployee(doc)
    })
  }
  
  
  
  if(doc.btnListSales){
    doc.btnListSales.addEventListener("click",()=>{
      reportsSales(doc)
    })
  }
  
  if(doc.btnListTopSales){
    doc.btnListTopSales.addEventListener("click",()=>{
      reportsTopSales(doc)
      
    })
  }
  
  consultData (`${url}user/qwQQKYKD32336*.DSDPOIIDHSBDJSD3651asdsdsSDFDF`)
  .then(res => {
          const list=[]
          for (const Info of res)  if(Info.estado=="activo") list.push(Info)
          componetSelectOptions(doc.selectListEmployee, list, 'username','id',3);
  })
 
}
                  
                  