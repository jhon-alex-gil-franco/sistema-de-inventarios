import {
  validateEmail,
  validateDirection,
  validateTel,
  validateId,
  validateName,
  validateCel,
} from "../../helpers/regularExpresions.js";
import { insert, ValidateIfExist } from "../../helpers/functions.js";
import { failInputText, seachFail, succes } from "../../helpers/messages.js";



export const registerClient = (doc) => {
  if (doc.btnRClient) {
    doc.btnRClient.addEventListener("click", (e) => {
      e.preventDefault();
      const url = "http://localhost:4000/api/client/" + doc.id.value;

      try {
        if (
          validateId(doc.id.value.trim()) &&
          validateName(doc.name.value.trim(), doc.tClient.value) &&
          validateDirection(doc.dir.value.trim()) &&
          validateTel(doc.tel.value.trim()) &&
          validateCel(doc.cel.value.trim()) &&
          validateEmail(doc.email.value.trim())
        ) {
      
          ValidateIfExist(url).then((res) => {
            if (res==="Void") {
              const data = {
                id: doc.id.value.trim(),
                nombre: doc.name.value.trim(),
                direccion: doc.dir.value.trim(),
                telefono: doc.tel.value.trim(),
                celular: doc.cel.value.trim(),
                email: doc.email.value.trim(),
                tipo: doc.tClient.value.trim(),
              };
              swal({
                title: "Nuevo Cliente ",
                text: "Desea registrar "+data.nombre+"?",
                icon: "info",
                buttons: true,
              }).then((willDelete) => {
                if (willDelete) {
                  insert(data, "http://localhost:4000/api/client/").then(
                    (res) => {
                      console.log(res)
                      if (res.status == "Create") {
                        doc.id.disabled = true;
                        doc.name.disabled = true;
                        try {doc.form.reset();} catch (error) {}
                        try {
                          const modal=document.getElementById("Modal__reg-newClient")   
                          modal.style.display="none"}catch (error) {}
                        doc.form.reset();
                        swal("Nuevo Cliente Creado!", {
                          icon: "success",
                        });
                      } else {
                        swal("Ocurrio un error inesperado!", {
                          icon: "error",
                        });
                      }
                    }
                  );
                }
              }); 
              
            }
            if(res.status==="err"){ swal("Ocurrio un error inesperado!", {
              icon: "error",
            });}
             if(res.idClientes==doc.id.value) {seachFail(doc, "Ya existe un cliente con el id " + doc.id.value +"!");
            
            }
          });      
        } else {seachFail(doc, "Registro invalido, verifique los datos ingresados");
        }
      } catch (error) {
        console.error(error);
      }
    });
  }

  if (doc.btnResetClient) {
    doc.btnResetClient.addEventListener("click", (e) => {
      location.reload();
    });
  }

  if (doc.tClient) {
    doc.tClient.addEventListener("change", () => {
      doc.tClient.value == "null"
        ? (doc.id.disabled = true)
        : (doc.id.disabled = false);
      doc.tClient.value == "null"
        ? (doc.name.disabled = true)
        : (doc.name.disabled = false);
      if (doc.tClient.value == "persona") {
        doc.id.placeholder = "Cedula";
        doc.name.placeholder = "Nombre y apellidos";
      } else {
        doc.id.placeholder = "Nit";
        doc.name.placeholder = "Empresa";
      }
    });
  }

  if (doc.id) {
    doc.id.addEventListener("keyup", () => {failInputText(validateId(doc.id.value.trim()), doc.id, doc.alertErrorId);});
  }

  if (doc.name) {
    doc.name.addEventListener("keyup", () => {
      failInputText(validateName(doc.name.value.trim(), doc.tClient.value),doc.name,doc.alertErrorName);
    });
  }

  if (doc.dir) {doc.dir.addEventListener("keyup", () => {failInputText(validateDirection(doc.dir.value.trim()),doc.dir,doc.alertErrorDir);});}

  if (doc.tel) {doc.tel.addEventListener("keyup", () => { failInputText(validateTel(doc.tel.value.trim()),doc.tel,doc.alertErrorTel);});}

  if (doc.cel) { doc.cel.addEventListener("keyup", () => { failInputText(validateCel(doc.cel.value.trim()),doc.cel, doc.alertErrorCel);});}

  if (doc.email) {doc.email.addEventListener("keyup", () => {failInputText(validateEmail(doc.email.value.trim()),doc.email,doc.alertErrorEmail);});}
};
