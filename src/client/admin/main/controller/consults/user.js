import { consultData, edit} from "../../helpers/functions.js";
import {validateEmail,validatePassword, validateName} from "../../helpers/regularExpresions.js";
import { seachFail,mesajeNoFundData  } from "../../helpers/messages.js";
import{url}from "../../helpers/global.js";
const validationUrl="qwQQKYKD32336*.DSDPOIIDHSBDJSD3651asdsdsSDFDF"
const dir=`${url}user/${validationUrl}`

export const consultAllUser=(doc,docU)=>{consultData(dir).then((resp) => {createTableConsult(doc,docU, resp);});}

export const consultUserByParam=(doc,docU) => {
  consultData(dir).then((resp) => {
  switch(doc.selectUser.value){
     case "id":
      const listId=[]
      const foundId=resp.map(data=>{
        if(data.idEmpleados.includes(doc.inputSeach.value)){ listId.push(data)}
      })
      listId.length>0?createTableConsult(doc,docU,listId): mesajeNoFundData(doc.containerTableconsults); 
       break
       case "name": 
       const listN=[]
       const foundName=resp.map(data=>{if(data.nombre.includes(doc.inputSeach.value.toUpperCase())){listN.push(data)}})  
       listN.length>0?createTableConsult(doc,docU, listN): mesajeNoFundData(doc.containerTableconsults); 
       break
     case "vin":
       const listV=[]
      const foundV=resp.map(data=>{if(data.vinculado.includes(doc.inputSeach.value)){listV.push(data)}
      })
      listV.length>0?createTableConsult(doc,docU, listV): mesajeNoFundData(doc.containerTableconsults);     
      break
  }
  });
};

const createTableConsult= (doc, docU, res)=>{
      const div=document.createElement("div")
      const h5=document.createElement("h5");
      const table=document.createElement("table");
      const thead=document.createElement("thead")
      div.className="table-responsive"
      h5.textContent="Usuarios"
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
      th1.textContent="Id"
      th2.textContent="Username"
      th3.textContent="Password"
      th4.textContent="Email"
      th5.textContent="Rol"
      th6.textContent="Estado"
      th7.textContent="Categoria"
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
           td1.textContent = `${list.id}`;
           td2.textContent = `${list.username}`;
           td3.textContent = `${list.password}`;
           td4.textContent = `${list.email}`;
           td5.textContent = `${list.rol}`;
           td6.textContent = `${list.estado}`;
           td7.textContent = `${list.categoria}`;
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
                       fetch(`${url}user/${list.id}/${validationUrl}`)
                             .then((respuesta) => respuesta.json())
                             .then(( respuesta) => {
                                   const userId= sessionStorage.getItem("id")
                                   let activation="" 
                                   if(userId==respuesta.id){
                                      docU.rol.disabled =true;
                                      docU.vinculationDiv.style.display="none";
                                   }else{
                                         docU.vinculationDiv.style.display="block";
                                         docU.rol.disabled =false;
                                   }
                                   doc.modalEditUser.style.display = "block";
                                   docU.id.value =  respuesta.id;
                                   docU.id.disabled = true;
                                   docU.pass.value =  respuesta.password
                                   docU.confirmPass.value =  respuesta.password
                                   docU.name.value = respuesta.username;
                                   docU.email.value =  respuesta.email
                                   docU.rol.value =  respuesta.rol
                                   docU.category.value =  respuesta.categoria
                                   respuesta.estado=="activo"?docU.activation.checked=true:docU.activation.checked=false;                              
                                   if (doc.btnEditUser) {
                                         doc.btnEditUser.addEventListener("click", (e) => {     
                                             if ( 
                                                 validateName(docU.name.value.trim(),"persona")&&
                                                 validateEmail(docU.email.value.trim())&&
                                                 validatePassword(docU.pass.value) &&
                                                 docU.confirmPass.value==docU.pass.value &&
                                                 docU.rol.value!="null" &&
                                                 docU.category.value!="null"     
                                                ){
                                                         
                                                  docU.activation.checked==true?activation="activo":activation="inactivo"
                                                const data = {
                                                                username:docU.name.value.trim(),
                                                                password:docU.pass.value.trim(),
                                                                email:docU.email.value.trim(),
                                                                rol: docU.rol.value,
                                                                estado:activation,
                                                                categoria:docU.category.value                                                              
                                                  };
                                                  swal({
                                                        title:"seguro?",
                                                        text: "Desea actualizar " + `${list.username}`,
                                                        icon: "info",
                                                        buttons: true,
                                                  }).then((willEdit) => {
                                                           if(willEdit) {
                                                              edit(data, `${url}user/${list.id}`).then((response) => {
                                                                   if(response.status == "Updated"){
                                                                      doc.modalEditUser.style.display = "none";
                                                                      td2.textContent = `${data.username}`;
                                                                      td3.textContent = `${data.password}`;
                                                                      td4.textContent = `${data.email}`;
                                                                      td5.textContent = `${data.rol}`;
                                                                      td6.textContent = `${data.estado}`;
                                                                      td7.textContent = `${data.categoria}`;
                                                                      swal("Usuario actualizado!", { icon: "success", });
                                                                    }else { swal("Ocurrio un error inesperado!", { icon: "error", }); }
                                                              });
                                                            }
                                                      });
                                              }else { seachFail(docU, "Verifique los datos ingresados"); }
                                          });
                                     }
                                });         
                                if (doc.btnCancelUser) {doc.btnCancelUser.addEventListener("click", (e) => {doc.modalEditUser.style.display = "none";});}
               });
           }
      }
}