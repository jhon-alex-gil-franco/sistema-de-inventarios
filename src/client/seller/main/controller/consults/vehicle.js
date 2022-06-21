import { consultData, edit, ValidateIfExist } from "../../helpers/functions.js";
import {validateKm,validateId, validateAnio, validateMarca, validateModelo} from "../../helpers/regularExpresions.js";
import { seachFail,mesajeNoFundData  } from "../../helpers/messages.js";
import { dropChildOfTable } from "../../helpers/helpers.js";


// consultData("")
export const consultAllVehicle=(doc,docV)=>{
  consultData("http://localhost:4000/api/vehicle").then((resp) => {
    createTableConsult(doc,docV, resp)
  })
}

export const consultVehicleByParam = (doc, docV) => {
  consultData("http://localhost:4000/api/vehicle").then((resp) => {  
  switch(doc.selectVehicle.value){
     case "placa":
      const list=[]
       const foundPlaca=resp.map(data=>{if(data.placa.includes(doc.inputSeach.value.toUpperCase())){list.push(data)}})
        list.length>0?createTableConsult(doc,docV, list): mesajeNoFundData(doc.containerTableconsults);   
       break
     case "modelo":
      const listM=[]
      const foundModelo=resp.map(data=>{  
        if(data.modelo.includes(doc.inputSeach.value.toUpperCase())){listM.push(data)}})
        listM.length>0?createTableConsult(doc,docV, listM): mesajeNoFundData(doc.containerTableconsults);
      break
      case "marca": 
      const listMa=[]
       const foundMarca=resp.map(data=>{  
         if(data.marca.includes(doc.inputSeach.value.toUpperCase())){listMa.push(data)}})
         listMa.length>0?createTableConsult(doc,docV, listMa): mesajeNoFundData(doc.containerTableconsults);
       break
       case "anio":
        const listA=[] 
       const foundAnio=resp.map(data=>{  
         if(data.anio.includes(doc.inputSeach.value)){listA.push(data)}})
         listA.length>0?createTableConsult(doc,docV, listA): mesajeNoFundData(doc.containerTableconsults);
       break
       case "propietario": 
       const listP=[]
       const foundProp=resp.map(data=>{if(data.Clientes_idClientes.includes(doc.inputSeach.value)){listP.push(data)}})
       listP.length>0?createTableConsult(doc,docV, listP): mesajeNoFundData(doc.containerTableconsults);
       break
  }
  });
};

//Funtion constuctor table
const createTableConsult= (doc, docV, res)=>{    
      const div=document.createElement("div")
      const h5=document.createElement("h5");
      const table=document.createElement("table");
      const thead=document.createElement("thead")
      div.className="table-responsive"
      h5.textContent="Vehiculos"
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
      th1.textContent="Placa"
      th2.textContent="Marca"
      th3.textContent="Modelo"
      th4.textContent="Año"
      th5.textContent="Kilometraje"
      th6.textContent="ID Propietario"
      th7.textContent="Nombre propietario"
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
      const trd= document.createElement("tr");
      const td1 = document.createElement("td");
      const td2 = document.createElement("td");
      const td3 = document.createElement("td");
      const td4 = document.createElement("td");
      const td5 = document.createElement("td");
      const td6 = document.createElement("td");
      const td7 = document.createElement("td");
      const td8 = document.createElement("td");
      const btnEdit = document.createElement("button");
      td1.textContent = `${list.placa}`;
      td2.textContent = `${list.marca}`;
      td3.textContent = `${list.modelo}`;
      td4.textContent = `${list.anio}`;
      td5.textContent = `${list.kilometraje}`;
      td6.textContent = `${list.Clientes_idClientes}`;
      td7.textContent=`${list.nombre}`;
      const i=document.createElement("i");
      i.className="fas fa-edit"
      btnEdit.className = "btn btn-info";
      btnEdit.appendChild(i)
      btnEdit.id = `${list.nombre}`;
      btnEdit.className = "btn btn-info";
      btnEdit.id = `${list.placa}`;
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
          fetch("http://localhost:4000/api/vehicle/" + list.placa)
            .then((respuesta) => respuesta.json())
            .then(( respuesta) => {
              doc.modalEditVeh.style.display = "block";
              docV.placa.value =  respuesta.placa;
              docV.placa.disabled = true;
              docV.marca.disabled = false;
              docV.modelo.disabled = false;
              docV.anio.disabled = false;
              docV.marca.value =  respuesta.marca
              docV.modelo.value =  respuesta.modelo
              docV.anio.value =  respuesta.anio
              docV.km.value =  respuesta.kilometraje
              docV.propVh.value =  respuesta.Clientes_idClientes
              doc.titleModalVehicle.textContent = respuesta.placa;
              if (doc.btnEditVehicle) {
                doc.btnEditVehicle.addEventListener("click", (e) => {
                  const url2 = "http://localhost:4000/api/client/" + docV.propVh.value;
                      try {
                        if (
                          validateMarca(docV.marca.value.trim()) &&
                          validateModelo(docV.modelo.value.trim()) &&
                          validateAnio(docV.anio.value.trim()) &&
                          validateKm(docV.km.value.trim()) &&
                          validateId(docV.propVh.value.trim()) 
                        ) {
                          ValidateIfExist(url2).then(
                            (resp) => {
                            if (resp.idClientes == docV.propVh.value) {
                              const data = {
                                anio:docV.anio.value.trim(),
                                modelo:docV.modelo.value.trim(),
                                marca:docV.marca.value.trim(),
                                kilometraje: docV.km.value.trim(),
                                Clientes_idClientes: docV.propVh.value.trim(),
                              };
                              swal({
                                title: "Esta seguro?",
                                text: "Desea Editar los datos del vehiculo " + `${list.placa}`,                                 
                                icon: "info",
                                buttons: true,
                              }).then((willEdit) => {
                                if (willEdit) {
                                  if(respuesta.kilometraje<=data.kilometraje){
                                    edit(data,"http://localhost:4000/api/vehicle/" +list.placa).then((response) => {
                                      if (response.status == "Updated") {
                                        doc.modalEditVeh.style.display = "none";
                                        // const name=document.getElementById("name_client")
                                        // td2.textContent = `${data.marca}`;
                                        // td3.textContent = `${data.modelo}`;
                                        // td4.textContent = `${data.anio}`;
                                        // td5.textContent = `${data.kilometraje}`;
                                        // td6.textContent = `${data.Clientes_idClientes}`;
                                        dropChildOfTable( doc.containerTableconsults)
                                        consultAllVehicle(doc,docV)
                                        
                                        swal("Vehiculo actualizado!", {icon: "success",});
                                      } else {swal("Ocurrio un error inesperado!", {icon: "error",});}
                                    });
                                  }else{swal("El nuevo kilometraje no puede ser inferior al anterior!", {icon: "error",});}
                                }
                              });
                            } else {seachFail(docV,"No se encontro ningun propietario con id " +docV.propVh.value);}
                            
                          });
                        } else {seachFail(docV,"Verifique los datos ingresados");}
                      } catch (error) {console.log(error);}
                });
              }
            });

          if (doc.btnCancelEditV) {
            doc.btnCancelEditV.addEventListener("click", (e) => {
              doc.modalEditVeh.style.display = "none";
             
            });
          }
        });
      }
    }
  
}