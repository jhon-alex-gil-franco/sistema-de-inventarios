import { consultData, edit} from "../../helpers/functions.js";
import {validateDescrip,validatePrice, validateServ} from "../../helpers/regularExpresions.js";
import { seachFail,mesajeNoFundData ,formatterPeso } from "../../helpers/messages.js";

// consultData("")
export const consultAllServices=(doc,docS)=>{
  consultData("http://localhost:4000/api/services").then((resp) => {
    
    createTableConsult(doc,docS, resp)
  })
}



export const consultServiceByParam=(doc,docS) => {
  consultData("http://localhost:4000/api/services").then((resp) => {
  switch(doc.selectService.value){
     case "cod":
      const listCo=[]
      const foundId=resp.map(data=>{
        if(data.idServicios.includes(doc.inputSeach.value.toUpperCase())){ listCo.push(data)}
      })
      listCo.length>0?createTableConsult(doc,docS,listCo): mesajeNoFundData(doc.containerTableconsults); 
       break
       case "name": 
       const listName=[]
       const foundName=resp.map(data=>{if(data.nombreServicio.includes(doc.inputSeach.value.toUpperCase())){listName.push(data)}})  
       listName.length>0?createTableConsult(doc,docS, listName): mesajeNoFundData(doc.containerTableconsults); 
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
  h5.textContent="Servicios"
  table.className="table table-striped ";
  thead.style="background:rgb(182, 184, 183);"  
  const tbody=document.createElement("tbody")    
  const tr = document.createElement("tr");
  const th1 = document.createElement("th");
  const th2 = document.createElement("th");
  const th3 = document.createElement("th");
  const th4 = document.createElement("th");
  const th5 = document.createElement("th");
  th1.textContent="Codigo"
  th2.textContent="Nombre"
  th3.textContent="Descripcion"
  th4.textContent="Precio"
  th5.textContent="Actualizar"
  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  tr.appendChild(th4);
  tr.appendChild(th5);
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
      const btnEdit = document.createElement("button");
      td1.textContent = `${list.idServicios}`;
      td2.textContent = `${list.nombreServicio}`;
      td3.textContent = `${list.descripcion}`;
      td4.textContent = formatterPeso.format(`${list.precio}`);
      const i=document.createElement("i");
      i.className="fas fa-edit"
      btnEdit.className = "btn btn-info";
      btnEdit.appendChild(i)
      btnEdit.className = "btn btn-info";
      td5.appendChild(btnEdit);
      trd.appendChild(td1);
      trd.appendChild(td2);
      trd.appendChild(td3);
      trd.appendChild(td4);
      trd.appendChild(td5);
      tbody.appendChild(trd);
      if (btnEdit) {
        btnEdit.addEventListener("click", (e) => {
          fetch("http://localhost:4000/api/services/" + list.idServicios)
            .then((respuesta) => respuesta.json())
            .then(( respuesta) => {
              doc.modalEditService.style.display = "block";
              docS.cod.value =  respuesta.idServicios;
              docS.cod.disabled=true
              docS.name.value = respuesta.nombreServicio;
              docS.name.disabled=false
              docS.description.value = respuesta.descripcion;
              docS.price.value =  respuesta.precio;
              doc.titleModalService.textContent = respuesta.nombreServicio;
              if (doc.btnEditService) {
                  doc.btnEditService.addEventListener("click", (e) => {
                  try {
                    if ( 
                        validateServ(docS.name.value.trim())&&
                        validateDescrip(docS.description.value.trim())&&
                        validatePrice(docS.price.value.trim())              
                    ) {
                      const data = {
                        nombre:docS.name.value.trim(),
                        descripcion: docS.description.value.trim(),
                        precio: docS.price.value.trim(),
                      };
                  
                      swal({
                        title:"Esta seguro?",
                        text: "Desea actualizar el servicio " + `${list.nombreServicio}`,
                        icon: "info",
                        buttons: true,
                      }).then((willEdit) => {
                        if (willEdit) {
                            edit(data, "http://localhost:4000/api/services/" + list.idServicios).then((response) => {       
                              if (response.status == "Updated") {
                                doc.modalEditService.style.display = "none";
                                td2.textContent = `${data.nombre}`;
                                td3.textContent = `${data.descripcion}`;
                                td4.textContent = `${data.precio}`;
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
          if (doc.btnCancelService) {
            doc.btnCancelService.addEventListener("click", (e) => {
              doc.modalEditService.style.display = "none";
              console.log("cerrar");
            });
          }
        });
      }
    }
}