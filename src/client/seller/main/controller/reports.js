import { dropChildOfTable } from "../helpers/helpers.js"
import { reportsEmployee, reportsSales, reportsTopSales } from "./consults/report.js"

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
  
  if (doc.selectListEmployee) {
    doc.selectListEmployee.addEventListener("click", () => {
      fetch("http://localhost:4000/api/employee/", { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        if (doc.selectListEmployee.childNodes.length == 3) {
          const fragment = document.createDocumentFragment();
          for (const Info of res) {
            if(Info.vinculado=="vinculado"){
              const listItem = document.createElement("OPTION");
              listItem.textContent = `${Info.nombre}`+" - "+`${Info.idEmpleados}`;
              listItem.value = Info.idEmpleados;
              listItem.className = "form-control";
              fragment.appendChild(listItem);
            }
          }
          doc.selectListEmployee.appendChild(fragment);
        }
      })
      .catch((error) => {
        console.log("ocurrio un error en la peticion:", error);
      });
    });
  } 
  
}
                  
                  