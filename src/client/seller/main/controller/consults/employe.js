import { consultData, edit} from "../../helpers/functions.js";
import {validateDirection, validateTel,validateEmail,validateCel, validateName} from "../../helpers/regularExpresions.js";
import { seachFail,mesajeNoFundData  } from "../../helpers/messages.js";

// consultData("")
export const consultAllEmployee=(doc,docE)=>{
  consultData("http://localhost:4000/api/employee").then((resp) => {
    
    createTableConsult(doc,docE, resp)
  })
}



export const consultEmployeByParam=(doc,docE) => {
  consultData("http://localhost:4000/api/employee").then((resp) => {
  switch(doc.selectEmploye.value){
     case "id":
      const listId=[]
      const foundId=resp.map(data=>{
        if(data.idEmpleados.includes(doc.inputSeach.value)){ listId.push(data)}
      })
      listId.length>0?createTableConsult(doc,docE,listId): mesajeNoFundData(doc.containerTableconsults); 
       break
       case "name": 
       const listN=[]
       const foundName=resp.map(data=>{if(data.nombre.includes(doc.inputSeach.value.toUpperCase())){listN.push(data)}})  
       listN.length>0?createTableConsult(doc,docE, listN): mesajeNoFundData(doc.containerTableconsults); 
       break
     case "vin":
       const listV=[]
      const foundV=resp.map(data=>{if(data.vinculado.includes(doc.inputSeach.value)){listV.push(data)}
      })
      listV.length>0?createTableConsult(doc,docE, listV): mesajeNoFundData(doc.containerTableconsults);     
      break
  }
  });
};

const createTableConsult= (doc, docE, res)=>{
  const div=document.createElement("div")
  const h5=document.createElement("h5");
  const table=document.createElement("table");
  const thead=document.createElement("thead")
  div.className="table-responsive"
  h5.textContent="Empleados"
  table.className="table table-striped ";
  thead.style="background:rgb(182, 184, 183);"  
  const tbody=document.createElement("tbody")    
  const tr = document.createElement("tr");
  const th1 = document.createElement("th");
  const th2 = document.createElement("th");
  const th3 = document.createElement("th");
  const th4 = document.createElement("th");
  const th5 = document.createElement("th");
  const th6 = document.createElement("th");
  const th7 = document.createElement("th");
  const th8 = document.createElement("th");
  th1.textContent="C.C"
  th2.textContent="Nombre"
  th3.textContent="Direccion"
  th4.textContent="Telefono"
  th5.textContent="Celular"
  th6.textContent="Email"
  th7.textContent="Estado"
  th8.textContent="Actualizar"
  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  tr.appendChild(th4);
  tr.appendChild(th5);
  tr.appendChild(th6);
  tr.appendChild(th7);
  tr.appendChild(th8);
  thead.appendChild(tr)
  table.appendChild(thead)
  table.appendChild(tbody)
  div.appendChild(table)
  doc.containerTableconsults.appendChild(h5)
  doc.containerTableconsults.appendChild(div)
    for (const list of res) {
      const trd = document.createElement("tr");
      const td1 = document.createElement("td");
      const td2 = document.createElement("td");
      const td3 = document.createElement("td");
      const td4 = document.createElement("td");
      const td5 = document.createElement("td");
      const td6 = document.createElement("td");
      const td7 = document.createElement("td");
      const td8 = document.createElement("td");
      const btnEdit = document.createElement("button");
      td1.textContent = `${list.idEmpleados}`;
      td2.textContent = `${list.nombre}`;
      td3.textContent = `${list.Direccion}`;
      td4.textContent = `${list.telefono}`;
      td5.textContent = `${list.celular}`;
      td6.textContent = `${list.email}`;
      td7.textContent = `${list.vinculado}`;
      btnEdit.className = "btn btn-info";
      const i=document.createElement("i");
      i.className="fas fa-edit"
      btnEdit.className = "btn btn-info";
      btnEdit.appendChild(i)
      btnEdit.id = `${list.nombre}`;
      td8.appendChild(btnEdit);
      trd.appendChild(td1);
      trd.appendChild(td2);
      trd.appendChild(td3);
      trd.appendChild(td4);
      trd.appendChild(td5);
      trd.appendChild(td6);
      trd.appendChild(td7);
      trd.appendChild(td8);
      tbody.appendChild(trd);
      if (btnEdit) {
        btnEdit.addEventListener("click", (e) => {
          fetch("http://localhost:4000/api/employee/" + list.idEmpleados)
            .then((respuesta) => respuesta.json())
            .then(( respuesta) => {
              doc.modalEditEmploye.style.display = "block";
              docE.vinculationDiv.style.display="block";
              docE.id.value =  respuesta.idEmpleados;
              docE.id.disabled = true;
              docE.name.value = respuesta.nombre;
              docE.name.disabled=false
              docE.dir.value =  respuesta.Direccion
              docE.tel.value =  respuesta.telefono
              docE.cel.value =  respuesta.celular
              docE.email.value =  respuesta.email
              respuesta.vinculado=="vinculado"?docE.vinculation.checked=true:docE.vinculation.checked=false;
              doc.titleModalEmploye.textContent = respuesta.nombre;
              docE.name.addEventListener("keyup", ()=>{
                failInputText(validateName(docE.name.value.trim(), "persona",docV.name,docV.alertErrorName));})
              if (doc.btnEditEmploye) {
                doc.btnEditEmploye.addEventListener("click", (e) => {
                  try {
                    if ( 
                      validateName(docE.name.value.trim(),"persona")&&
                      validateDirection(docE.dir.value.trim())&& 
                      validateTel(docE.tel.value.trim())&&
                      validateEmail(docE.email.value.trim())&&
                      validateCel( docE.cel.value.trim())                      
                    ) {
                      let vincular=""
                      docE.vinculation.checked==true?vincular="vinculado":vincular="desvinculado"
                      const data = {
                        Nombre:docE.name.value.trim(),
                        Direccion:docE.dir.value.trim(),
                        telefono:docE.tel.value.trim(),
                        celular:docE.cel.value.trim(),
                        email:docE.email.value.trim(),
                        vinculado:vincular
                      };
                      swal({
                        title:"Esta seguro?",
                        text: "Desea actualizar datos de " + `${list.nombre}`,
                        icon: "info",
                        buttons: true,
                      }).then((willEdit) => {
                        if (willEdit) {
                            edit(data, "http://localhost:4000/api/employee/" + list.idEmpleados).then((response) => {
                              if (response.status == "Updated") {
                                doc.modalEditEmploye.style.display = "none";
                                td2.textContent = `${data.Nombre}`;
                                td3.textContent = `${data.Direccion}`;
                                td4.textContent = `${data.telefono}`;
                                td5.textContent = `${data.celular}`;
                                td6.textContent = `${data.email}`;
                                td7.textContent = `${data.vinculado}`;
                                swal("Empleado actualizado!", { icon: "success", });
                              } else { swal("Ocurrio un error inesperado!", { icon: "error", }); }
                            });
                        }
                      });
                    } else { seachFail(docE, "Verifique los datos ingresados"); }
                  } catch (error) { console.log(error); }
                });
              }
            });         
          if (doc.btnCancelEmploye) {
            doc.btnCancelEmploye.addEventListener("click", (e) => {
              doc.modalEditEmploye.style.display = "none";
            });
          }
        });
      }
    }
}