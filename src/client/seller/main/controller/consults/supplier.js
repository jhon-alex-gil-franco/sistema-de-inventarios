import { consultData, edit} from "../../helpers/functions.js";
import {validateDirection, validateTel,validateEmail,validateCel, validateDescrip, validateName} from "../../helpers/regularExpresions.js";
import { seachFail, mesajeNoFundData, failInputText } from "../../helpers/messages.js";

// consultData("")
export const consultAllSupplier=(doc,docS)=>{
  consultData("http://localhost:4000/api/supplier").then((resp) => {
    createTableConsult(doc,docS, resp)
  })
}

export const consultSupplierByParam = (doc,docS) => {
  consultData("http://localhost:4000/api/supplier").then((resp) => {
  switch(doc.selectSupplier.value){
     case "id":
      const listId=[]
      const foundId=resp.map(data=>{
        if(data.idProveedor.includes(doc.inputSeach.value)){listId.push(data)}
      })
      listId.length>0?createTableConsult(doc,docS, listId): mesajeNoFundData(doc.containerTableconsults);
       break
     case "ts":
      const listE=[]
      const foundEmp=resp.map(data=>{if(data.T_proveedor.includes(doc.inputSeach.value)){listE.push(data)}
      }) 
      listE.length>0?createTableConsult(doc,docS, listE): mesajeNoFundData(doc.containerTableconsults);   
      break 
      
     case "name": 
     const listN=[]
     const foundName=resp.map(data=>{if(data.nombre.includes(doc.inputSeach.value.toUpperCase())){listN.push(data)}        
     })
     listN.length>0?createTableConsult(doc,docS, listN): mesajeNoFundData(doc.containerTableconsults); 
     break

     case "des": 
     const listD=[]
     const foundDescription=resp.map(data=>{if(data.descripcion.includes(doc.inputSeach.value.toLowerCase())){listD.push(data)}        
     })
     listD.length>0?createTableConsult(doc,docS, listD): mesajeNoFundData(doc.containerTableconsults); 
     break
  }
  });
};

const createTableConsult= (doc, docS, res)=>{
  const div=document.createElement("div")
  const h5=document.createElement("h5");
  const table=document.createElement("table");
  const thead=document.createElement("thead")
  div.className="table-responsive"
  h5.textContent="Proveedores"
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
  const th9 = document.createElement("th");
  th1.textContent="T.Proveedor"
  th2.textContent="CC o NIT"
  th3.textContent="Nombre"
  th4.textContent="Direccion"
  th5.textContent="Telefono"
  th6.textContent="Celular"
  th7.textContent="Email"
  th8.textContent="Descripcion"
  th9.textContent="Atualizar"
  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  tr.appendChild(th4);
  tr.appendChild(th5);
  tr.appendChild(th6);
  tr.appendChild(th7);
  tr.appendChild(th8);
  tr.appendChild(th9);
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
      const td9 = document.createElement("td");
      const btnEdit = document.createElement("button");
      td1.textContent = `${list.T_proveedor}`;
      td2.textContent = `${list.idProveedor}`;
      td3.textContent = `${list.nombre}`;
      td4.textContent = `${list.direccion}`;
      td5.textContent = `${list.telefono}`;
      td6.textContent = `${list.celular}`;
      td7.textContent = `${list.email}`;
      td8.textContent = `${list.descripcion}`;
      btnEdit.className = "btn btn-info";
      const i=document.createElement("i");
      i.className="fas fa-edit"
      btnEdit.className = "btn btn-info";
      btnEdit.appendChild(i)
      td9.appendChild(btnEdit);
      trd.appendChild(td1);
      trd.appendChild(td2);
      trd.appendChild(td3);
      trd.appendChild(td4);
      trd.appendChild(td5);
      trd.appendChild(td6);
      trd.appendChild(td7);
      trd.appendChild(td8);
      trd.appendChild(td9);
      tbody.appendChild(trd);
      if (btnEdit) {
        btnEdit.addEventListener("click", (e) => {
          fetch("http://localhost:4000/api/supplier/" + list.idProveedor)
            .then((respuesta) => respuesta.json())
            .then(( respuesta) => {
              doc.modalEditSupplier.style.display = "block";
              docS.id.value =  respuesta.idProveedor;
              docS.id.disabled = true;
              docS.name.value = respuesta.nombre;
              docS.name.disabled=false
              docS.tSupplier.value=respuesta.T_proveedor
              docS.tSupplier.disabled=true
              docS.dir.value =  respuesta.direccion
              docS.tel.value =  respuesta.telefono
              docS.cel.value =  respuesta.celular
              docS.email.value =  respuesta.email
              docS.description.value =  respuesta.descripcion
              doc.titleModalSupplier.textContent = respuesta.nombre;
              docS.name.addEventListener("keyup", ()=>{
                failInputText(validateName(docS.name.value.trim(), respuesta.T_proveedor),docS.name,docS.alertErrorNameSupp);
              })
              if (doc.btnEditSupplier) {
                doc.btnEditSupplier.addEventListener("click", (e) => {
                  try {
                    if (
                      validateName(docS.name.value.trim(),respuesta.T_proveedor)&&
                      validateDirection(docS.dir.value)&& 
                      validateTel(docS.tel.value)&&
                      validateEmail(docS.email.value)&&
                      validateCel( docS.cel.value)&&
                      validateDescrip(docS.description.value)                     
                    ) {
                      const data = {
                        nombre:docS.name.value.trim(),
                        direccion:docS.dir.value.trim(),
                        telefono:docS.tel.value.trim(),
                        celular:docS.cel.value.trim(),
                        email:docS.email.value.trim(),
                        descripcion:docS.description.value.trim(),
                      };
                  
                      swal({
                        title:"Esta seguro?",
                        text: "Desea actualizar datos de " + `${list.nombre}`,
                        icon: "info",
                        buttons: true,
                      }).then((willEdit) => {
                        if (willEdit) {
                            edit(data, "http://localhost:4000/api/supplier/" + list.idProveedor).then((response) => {
                              if (response.status == "Updated") {
                                doc.modalEditSupplier.style.display = "none";
                                td3.textContent = `${data.nombre}`;
                                td4.textContent = `${data.direccion}`;
                                td5.textContent = `${data.telefono}`;
                                td6.textContent = `${data.celular}`;
                                td7.textContent = `${data.email}`;
                                td8.textContent = `${data.descripcion}`;
                                swal("Vehiculo actualizado!", { icon: "success", });
                              } else { swal("Ocurrio un error inesperado!", { icon: "error", }); }
                            });
                        }
                      });
                    } else { seachFail(docS, "Verifique los datos ingresados"); }
                  } catch (error) { console.log(error); }
                });
              }
            });         
          if (doc.btnCancelSupplier) {
            doc.btnCancelSupplier.addEventListener("click", (e) => {
              doc.modalEditSupplier.style.display = "none";
              console.log("cerrar");
            });
          }
        });
      }
    }

}