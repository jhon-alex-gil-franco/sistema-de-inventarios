import { consultData, edit} from "../../helpers/functions.js";
import{url}from "../../helpers/global.js";
import {validateDirection, validateTel,validateEmail,validateCel, validateName} from "../../helpers/regularExpresions.js";
import { seachFail, mesajeNoFundData, failInputText } from "../../helpers/messages.js";

// consultData("")
export const consultAllClient=(doc,docC)=>{
             consultData(`${url}client`).then((resp) => {createTableConsult(doc,docC, resp);})
}

export const consultClientByParam = (doc,docC) => {
      consultData(`${url}client`).then((resp) => {
                  switch(doc.selectClient.value){
                          case "id":
                                   const listId=[]
                                   const foundId=resp.map(data=>{if(data.idClientes.includes(doc.inputSeach.value)){listId.push(data)};})
                                   listId.length>0?createTableConsult(doc,docC, listId): mesajeNoFundData(doc.containerTableconsults);
                          break

                          case "tc":
                                    const listE=[]
                                    const foundEmp=resp.map(data=>{if(data.T_cliente.includes(doc.inputSeach.value)){listE.push(data)};})  
                                    listE.length>0?createTableConsult(doc,docC, listE): mesajeNoFundData(doc.containerTableconsults);   
                          break
      
                          case "name": 
                                      const listN=[]
                                      const foundName=resp.map(data=>{if(data.nombre.includes(doc.inputSeach.value.toUpperCase())){listN.push(data)};})
                                      listN.length>0?createTableConsult(doc,docC, listN): mesajeNoFundData(doc.containerTableconsults); 
                          break
                  } 
      });
};

const createTableConsult= (doc, docC, res)=>{
    const div=document.createElement("div")
    const h5=document.createElement("h5");
    const table=document.createElement("table");
    const thead=document.createElement("thead")
    div.className="table-responsive"
    h5.textContent="Clientes"
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
    th1.textContent="T.Cliente"
    th2.textContent="CC o NIT"
    th3.textContent="Nombre"
    th4.textContent="Direccion"
    th5.textContent="Telefono"
    th6.textContent="Celular"
    th7.textContent="Email"
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
      td1.textContent = `${list.T_cliente}`;
      td2.textContent = `${list.idClientes}`;
      td3.textContent = `${list.nombre}`;
      td4.textContent = `${list.Direccion}`;
      td5.textContent = `${list.telefono}`;
      td6.textContent = `${list.celular}`;
      td7.textContent = `${list.email}`;
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
            fetch(`${url}client/${list.idClientes}` )
            .then((respuesta) => respuesta.json())
            .then(( respuesta) => {
                  doc.modalEditClient.style.display = "block";
                  docC.id.value =  respuesta.idClientes;
                  docC.id.disabled = true;
                  docC.name.value = respuesta.nombre;
                  docC.name.disabled=false
                  docC.tClient.style.display="none"
                  docC.dir.value =  respuesta.Direccion
                  docC.tel.value =  respuesta.telefono
                  docC.cel.value =  respuesta.celular
                  docC.email.value =  respuesta.email
                  doc.titleModalCient.textContent = respuesta.nombre;
                  docC.name.addEventListener("keyup", ()=>{failInputText(validateName(docC.name.value.trim(), respuesta.T_Client),docC.name,docC.alertErrorName);})
                  if (doc.btnEditClient) {
                      doc.btnEditClient.addEventListener("click", (e) => {
                        if (
                            validateDirection(docC.dir.value)&& 
                            validateTel(docC.tel.value)&&
                            validateEmail(docC.email.value)&&
                            validateCel( docC.cel.value) &&
                            validateName(docC.name.value, respuesta.T_Client)                     
                          ) 
                          {
                            const data = {
                                         Nombre:docC.name.value,
                                         Direccion:docC.dir.value,
                                         Telefono:docC.tel.value,
                                         Celular:docC.cel.value,
                                         Email:docC.email.value,
                            };
                            swal({
                                title:"Seguro?",
                                text: "Desea actualizar datos de" + `${list.nombre}`,
                                icon: "info",
                                buttons: true,
                             }).then((willEdit) => {
                                   if(willEdit) {
                                      edit(data, `${url}client/${list.idClientes}`).then((response) => {
                                          if(response.status == "Updated") {
                                              doc.modalEditClient.style.display = "none";
                                              td3.textContent = `${data.Nombre}`;
                                              td4.textContent = `${data.Direccion}`;
                                              td5.textContent = `${data.Telefono}`;
                                              td6.textContent = `${data.Celular}`;
                                              td7.textContent = `${data.Email}`;       
                                              swal("Atualizado!", { icon: "success", });
                                            }else {swal("Ocurrio un error inesperado!", { icon: "error", }); }
                                      });
                                    };
                                  });
                        }else { seachFail(docC, "Verifique los datos ingresados");};
                      });
                  }
                });   
          });
        }
        if (doc.btnCancelClient){doc.btnCancelClient.addEventListener("click", (e) => {doc.modalEditClient.style.display = "none";});}
    }
}




