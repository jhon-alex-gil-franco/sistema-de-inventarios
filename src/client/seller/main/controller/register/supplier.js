import {
    validateEmail,
    validateDirection,
    validateTel,
    validateId,
    validateName,
    validateCel,
    validateDescrip,
  } from "../../helpers/regularExpresions.js";
  import { insert, ValidateIfExist } from "../../helpers/functions.js";
  import { failInputText, seachFail } from "../../helpers/messages.js";
  
  export const registerSupplier = (doc) => {
    if (doc.btnRSupplier) {
      doc.btnRSupplier.addEventListener("click", (e) => {
        e.preventDefault();
        
        const url = "http://localhost:4000/api/supplier/" + doc.id.value;
        try {
          if (
            validateId(doc.id.value.trim()) &&
            validateName(doc.name.value.trim(), doc.tSupplier.value) &&
            validateDirection(doc.dir.value.trim()) &&
            validateTel(doc.tel.value.trim()) &&
            validateCel(doc.cel.value.trim()) &&
            validateEmail(doc.email.value.trim())&&
            validateDescrip(doc.description.value.trim())
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
                  tipo: doc.tSupplier.value.trim(),
                  description: doc.description.value.trim(),
                };
                swal({
                  title: "Nuevo Proveedor ",
                  text: "Desea registrar "+data.nombre+"?",
                  icon: "info",
                  buttons: true,
                }).then((willDelete) => {
                  if (willDelete) {
                    insert(data, "http://localhost:4000/api/supplier/").then(
                      (res) => {
                        console.log(res)
                        if (res.status == "Create") {
                          doc.id.disabled = true;
                          doc.name.disabled = true;
                          doc.form.reset();
                          swal("Nuevo Proveedor Creado!", {
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
               if(res.idProveedor==doc.id.value) {seachFail(doc, "Ya existe un Proveedor con el id " + doc.id.value +"!");
              
              }
            });      
          } else {
            seachFail(doc, "Registro invalido, verifique los datos ingresados");
          }
        } catch (error) {
          console.error(error);
        }
      });
    }
  
    if (doc.btnResetSupplier) {
      doc.btnResetSupplier.addEventListener("click", (e) => {
        location.reload();
      });
    }
  
    if (doc.tSupplier) {
      doc.tSupplier.addEventListener("change", () => {
        doc.tSupplier.value == "null"
          ? (doc.id.disabled = true)
          : (doc.id.disabled = false);
        doc.tSupplier.value == "null"
          ? (doc.name.disabled = true)
          : (doc.name.disabled = false);
        if (doc.tSupplier.value == "persona") {
          doc.id.placeholder = "Cedula";
          doc.name.placeholder = "Nombre y apellidos";
        } else {
          doc.id.placeholder = "Nit";
          doc.name.placeholder = "Empresa";
        }
      });
    }
  
    if (doc.id) {
      doc.id.addEventListener("keyup", () => {
        failInputText(validateId(doc.id.value.trim()), doc.id, doc.alertErrorIdSupp);
      });
    }
  
    if (doc.name) {
      doc.name.addEventListener("keyup", () => {
        failInputText(
          validateName(doc.name.value.trim(), doc.tSupplier.value),doc.name,doc.alertErrorNameSupp);
      });
    }
  
    if (doc.dir) {
      doc.dir.addEventListener("keyup", () => {
        failInputText(
          validateDirection(doc.dir.value.trim()),
          doc.dir,
          doc.alertErrorDirSupp
        );
      });
    }
  
    if (doc.tel) {
      doc.tel.addEventListener("keyup", () => {
        failInputText(
          validateTel(doc.tel.value.trim()),
          doc.tel,
          doc.alertErrorTelSupp
        );
      });
    }
  
    if (doc.cel) {
      doc.cel.addEventListener("keyup", () => {
        failInputText(
          validateCel(doc.cel.value.trim()),
          doc.cel,
          doc.alertErrorCelSupp
        );
      });
    }
  
    if (doc.email) {
      doc.email.addEventListener("keyup", () => {
        failInputText(
          validateEmail(doc.email.value.trim()),
          doc.email,
          doc.alertErrorEmailSupp
        );
      });
    }


    if (doc.description) {
        doc.description.addEventListener("keyup", () => {
          failInputText(
            validateDescrip(doc.description.value.trim()),
            doc.description,
            doc.alertErrorDescriptionSupp
          );
        });
      }
  };

  
  