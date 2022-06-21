import {
  validatePlaca,
  validateMarca,
  validateModelo,
  validateAnio,
  validateKm,
  validateId,
} from "../../helpers/regularExpresions.js";
import { consultData, insert, ValidateIfExist } from "../../helpers/functions.js";
import { seachFail, failInputText } from "../../helpers/messages.js";

export const registerVehicle = (doc,docI,docC) => {
  if (doc.btnRVehicle) {
    doc.btnRVehicle.addEventListener("click", (e) => {
      e.preventDefault();
      const url = "http://localhost:4000/api/vehicle/" + doc.placa.value;
      const url2 = "http://localhost:4000/api/client/" + doc.propVh.value;
      try {
        if (
          validatePlaca(doc.placa.value.trim()) &&
          validateMarca(doc.marca.value.trim()) &&
          validateModelo(doc.modelo.value.trim()) &&
          validateAnio(doc.anio.value.trim()) &&
          validateKm(doc.km.value.trim()) &&
          validateId(doc.propVh.value.trim())
        ) {
          ValidateIfExist(url).then((res) => {
            if (res == "Void") {
              ValidateIfExist(url2).then((res) => {
                if (res.idClientes == doc.propVh.value) {
                  const data = {
                    placa: doc.placa.value,
                    marca: doc.marca.value,
                    modelo: doc.modelo.value,
                    anio: doc.anio.value,
                    kilometraje: doc.km.value,
                    Clientes_idClientes: doc.propVh.value,
                  };
                  swal({
                    title: "Nuevo Vehiculo",
                    text: "Desea registrar "+data.placa+"?",
                    icon: "info",
                    buttons: true,
                  }).then((willCreate) => {
                    if (willCreate) {
                      insert(data, "http://localhost:4000/api/vehicle/").then(
                        (res) => {
                          if (res.status == "Create") {
                            
                            swal("Nuevo vehiculo creado!", {icon: "success"});
                            try {doc.form.reset();} catch (error) {}
                            try {docI.regNewVehicle.style.display="none"}catch (error) {}
                          } else {swal("Ocurrio un error inesperado!", {icon: "error",});
                          }
                        }
                      );
                    }
                  });
                } else {seachFail(doc,"No se encontro ningun propietario con id " +doc.propVh.value);}
              });
            }
            if (res.status === "err") {
              swal("Ocurrio un error inesperado!", {
                 icon: "error",
               });
             }  
            if (res.placa == doc.placa.value) {seachFail(doc,"Ya existe un vehiculo " + doc.placa.value + "!");}
          });
        } else {seachFail(doc, "Registro invalido, verifique los datos ingresados");}
      } catch (error) {
      }
    });
  }

  if (doc.btnResetVehicle) {doc.btnResetVehicle.addEventListener("click", (e) => {location.reload();});}

  if (doc.placa) {
    doc.placa.addEventListener("keyup", () => {failInputText(validatePlaca(doc.placa.value.trim()),doc.placa,doc.alertErrorPlaca);});
  }

  if (doc.marca) {
    doc.marca.addEventListener("keyup", () => {failInputText(validateMarca(doc.marca.value.trim()),doc.marca,doc.alertErrorMarca);});
  }

  if (doc.modelo) { 
    doc.modelo.addEventListener("keyup", () => {failInputText(validateModelo(doc.modelo.value.trim()),doc.modelo,doc.alertErrorModelo)});
  }

  if (doc.anio) {
    doc.anio.addEventListener("keyup", () => {failInputText(validateAnio(doc.anio.value.trim()),doc.anio, doc.alertErrorAnio);});
  }

  if (doc.km) {
    doc.km.addEventListener("keyup", () => {failInputText(validateKm(doc.km.value.trim()), doc.km, doc.alertErrorKm);});
  }

  if (doc.propVh) {
    doc.propVh.addEventListener("keyup", () => {failInputText(validateId(doc.propVh.value.trim()),doc.propVh,doc.alertErrorProp);});
  }

  if (doc.propVh) {
    doc.propVh.addEventListener("change", () => {
      if(  validateId(doc.propVh.value.trim())){
        consultData("http://localhost:4000/api/client/" + doc.propVh.value).then(resp=>{
          if(resp.idClientes!=doc.propVh.value){
            swal({
              title: "Cliente no encontrado",
              text: "Desea registrar "+doc.propVh.value+"?",
              icon: "info",
              buttons: true,
            }).then((willCreate) => {
              if (willCreate) {
                const modal=document.getElementById("Modal__reg-newClient")
                const id=document.getElementById("id_client")
                const btnCloseModal=document.getElementById("cancelRegisterClient")
                id.value=doc.propVh.value
                modal.style.display="block"
                if(btnCloseModal){btnCloseModal.addEventListener("click", ()=>{
                  console.log("ssss")
                  const form=document.getElementById("form_reg_client")
                  form.reset()
                  modal.style.display="none"})}         
              }
            });
          }
        })
      }   
    });
  }
};
