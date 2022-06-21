import { consultData, edit} from "../../helpers/functions.js";
import {validateDirection, validateTel,validateEmail,validateCel, validateName} from "../../helpers/regularExpresions.js";
import { seachFail, mesajeNoFundData, failInputText } from "../../helpers/messages.js";

// consultData("")
export const consultAllClient=(doc,docC)=>
{
  consultData("http://localhost:4000/api/client").then((resp) => 
  {
    createTableConsult(doc,docC, resp)
  })
}

export const consultClientByParam = (doc,docC) => 
{
  consultData("http://localhost:4000/api/client").then((resp) => 
   {
      switch(doc.selectClient.value)
      {
        case "id":
                  const listId=[]
                  const foundId=resp.map(data=>{if(data.idClientes.includes(doc.inputSeach.value)){listId.push(data)};})
                  listId.length>0?createTableConsult(doc,docC, listId): mesajeNoFundData(doc.containerTableconsults);
        break
        case "tc":
                  const listE=[]
                  const foundEmp=resp.map(data=>{if(data.T_cliente.includes(doc.inputSeach.value)){listE.push(data)}}) 
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

const createTableConsult= (doc, docC, res)=>
{
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
    for (const list of res)
     {
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
          
          fetch("http://localhost:4000/api/client/" + list.idClientes)
            .then((respuesta) => respuesta.json())
            .then(( respuesta) => {
              doc.modalEditClient.innerHTML +=    createFormEditClient
              const id= document.getElementById("edit__id_client")
              const name= document.getElementById("edit__name_client")
              const dir= document.getElementById("edit__dir_client")
              const tel= document.getElementById("edit__tel_client")
              const cel= document.getElementById("edit__cel_client")
              const email= document.getElementById("edit__email_client")
              const tClient= document.getElementById("edit__t_client")
              const btnEditClient=document.getElementById("btn__edit-client")
              const btnCancelClient=document.getElementById("cancel__edit-client")
              const alertErrorName=document.getElementById("notification-error__inputName")
              const alertErrorDir=document.getElementById("notification-error__inputDir")
              const alertErrorTel=document.getElementById("notification-error__inputTel")
              const alertErrorCel= document.getElementById("notification-error__inputCel")
              const alertErrorEmail=document.getElementById("notification-error__inputEmail")
              const docum={alert:document.getElementById("edit__message-regClien"), }

              doc.modalEditClient.style.display = "block";
              id.value =  respuesta.idClientes;
              id.disabled = true;
              name.value = respuesta.nombre;
              name.disabled=false
              tClient.disabled=true
              dir.value =  respuesta.Direccion
              tel.value =  respuesta.telefono
              cel.value =  respuesta.celular
              email.value =  respuesta.email
              tClient.value=respuesta.T_cliente
      
              name.addEventListener("keyup", ()=>{failInputText(validateName(name.value.trim(), respuesta.T_cliente),name,alertErrorName);})
              dir.addEventListener("keyup", () => {failInputText(validateDirection(dir.value.trim()),dir,alertErrorDir);});
              tel.addEventListener("keyup", () => { failInputText(validateTel(tel.value.trim()),tel,alertErrorTel);});            
              cel.addEventListener("keyup", () => { failInputText(validateCel(cel.value.trim()),cel, alertErrorCel);});            
              email.addEventListener("keyup", () => {failInputText(validateEmail(email.value.trim()),email,alertErrorEmail);});
              btnCancelClient.addEventListener("click", (e) => {
                const form=document.getElementById("form_reg_client")
                form.reset()
                doc.modalEditClient.style.display = "none";
              });
              if (btnEditClient) {
                  btnEditClient.addEventListener("click", (e) => {
                  try {
                    if (
                      validateDirection(dir.value.trim())&& 
                      validateTel(tel.value.trim())&&
                      validateEmail(email.value.trim())&&
                      validateCel( cel.value.trim()) &&
                      validateName(name.value.trim(),respuesta.T_cliente )                     
                    ) {
                      const data = {
                        Nombre:name.value.trim(),
                        Direccion:dir.value.trim(),
                        telefono:tel.value.trim(),
                        celular:cel.value.trim(),
                        email:email.value.trim(),
                      };
                  
                      swal({
                        title:"Esta seguro?",
                        text: "Desea actualizar datos de " + `${list.nombre}`,
                        icon: "info",
                        buttons: true,
                      }).then((willEdit) => {
                        if (willEdit) {
                            edit(data, "http://localhost:4000/api/client/" + list.idClientes).then((response) => {
                              if (response.status == "Updated") {
                                doc.modalEditClient.style.display = "none";
                                td3.textContent = `${data.Nombre}`;
                                td4.textContent = `${data.Direccion}`;
                                td5.textContent = `${data.telefono}`;
                                td6.textContent = `${data.celular}`;
                                td7.textContent = `${data.email}`;
                                swal("Vehiculo actualizado!", { icon: "success", });
                              } else { swal("Ocurrio un error inesperado!", { icon: "error", }); }
                            });
                        }
                      });
                    } else { seachFail(docum, "Verifique los datos ingresados"); }
                  } catch (error) { console.log(error); }
                });
              }
            });         
          
            
          
        });
      }
    }

}


const createFormEditClient=()=>{`
<div class="modal-dialog flex" role="document">
<div class="modal-content">
<div class="modal-header flex">
<h5 id="title-editClient">Cliente</h5>
</div>
<div class="modal-body">
<form id="form_reg_client">
<div class="form-group">
<label class="control-label">Tipo de documento</label>
<input class=" form-control " id="edit__t_client" type="text"  name="id" maxlength="15"
placeholder="" disabled>
</div>
<div class="form-group">
<input class=" form-control " id="edit__id_client" type="text"  name="id" maxlength="11"
placeholder="Identificacion" disabled>
<label id="notification-error__inputId" class="notifications-input">Verifique los datos
insertados</label>
</div>
<div class="form-group">
<input class="form-control  register-client" id="edit__name_client" name="name" type="text"
placeholder="Nombre" disabled onkeyup="javascript:this.value=this.value.toUpperCase()">
<label id="notification-error__inputName" class="notifications-input">Verifique los datos
insertados</label>
</div>
<div class="form-group">
<input class="form-control  register-client" name="dir" id="edit__dir_client" type="text"
placeholder="Direccion">
<label id="notification-error__inputDir" class="notifications-input">Verifique los datos
insertados</label>
</div>
<div class="form-group">
<input class="form-control register-client" name="tel" id="edit__cel_client" type="text"
placeholder="Celular" maxlength="10">
<label id="notification-error__inputCel" class="notifications-input">Verifique los datos
insertados</label>
</div>
<div class="form-group">
<input class="form-control register-client" name="tel" id="edit__tel_client" type="text"
placeholder="Telefono" maxlength="10">
<label id="notification-error__inputTel" class="notifications-input">Verifique los datos
insertados</label>
</div>
<div class="form-group">
<input class="form-control register-client" name="email" id="edit__email_client" type="email"
placeholder="Email" maxlength="50">
<label id="notification-error__inputEmail" class="notifications-input">Verifique los datos
insertados</label>
</div>

<div id="edit__message-regClien" class="message-reg alert alert-danger mt-3" role="alert"></div>
</form>
<button id="btn__edit-client" class="btn btn-primary"><i
class="fa fa-fw fa-lg fa-edit"> </i>Actualizar</button>
<button id="cancel__edit-client" class="btn btn-secondary">
<i class="fa fa-fw fa-lg fa-times-circle"> </i>Cancelar</button>
</div>
<div class="footer">
</div>
</div>
</div>`
}

