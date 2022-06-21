
import { insert, ValidateIfExist } from "../../helpers/functions.js";
import { failInputText, seachFail } from "../../helpers/messages.js";
import { validateEmail, validateDirection, validateTel, validateId, validateName, validateCel } from "../../helpers/regularExpresions.js";

export const registerEmployee = (doc) => {
  if (doc.btnRegEmployee) {
    doc.btnRegEmployee.addEventListener("click", (e) => {
      e.preventDefault();
      const url = "http://localhost:4000/api/employee/" + doc.id.value
      try {
        if (
          validateId(doc.id.value.trim()) &&
          validateName(doc.name.value.trim(),"persona") &&
          validateDirection(doc.dir.value.trim()) &&
          validateTel(doc.tel.value.trim()) &&
          validateCel(doc.cel.value.trim()) &&
          validateEmail(doc.email.value.trim())
        ) {
          ValidateIfExist(url).then(res => {
            if (res === "Void") {
              const data = {
                id: doc.id.value.trim(),
                nombre: doc.name.value.trim(),
                direccion: doc.dir.value.trim(),
                telefono: doc.tel.value.trim(),
                celular: doc.cel.value.trim(),
                email: doc.email.value.trim(),
                vinculado: "vinculado"
              }
              swal({
                title: "Nuevo Empleado",
                text: "Desea vincular "+ data.nombre +" ?",
                icon: "info",
                buttons: true,
              }).then((willDelete) => {
                if (willDelete) {
                  insert(data, "http://localhost:4000/api/employee/").then(
                    (res) => {
                      console.log(res)
                      if (res.status == "Create") {
                        doc.form.reset();
                        swal("Nuevo Empleado Vinculado!", {
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

            }if (res.status === "err") {
              swal("Ocurrio un error inesperado!", {
                icon: "error",
              });
            }
            if (res.idEmpleados == doc.id.value) { seachFail(doc, "Ya existe un empleado con Id " + doc.id.value) }
          })

        } else { seachFail(doc, "Registro invalido, verifique los datos ingresados") }

      } catch (error) {
        console.log(error)
      }
    });
  }

  if (doc.btnResetEmployee) {
    doc.btnResetEmployee.addEventListener("click", (e) => {
      location.reload();
    });
  }

  if (doc.id) {
    doc.id.addEventListener("keyup", () => {
      failInputText(validateId(doc.id.value.trim()), doc.id, doc.alertErrorId);
    });
  }

  if (doc.name)
    doc.name.addEventListener("keyup", () => {
      failInputText(validateName(doc.name.value.trim(), "persona"), doc.name, doc.alertErrorName);
    });

  if (doc.dir) {
    doc.dir.addEventListener("keyup", () => {
      failInputText(validateDirection(doc.dir.value.trim()), doc.dir, doc.alertErrorDir);
    });
  }

  if (doc.tel) {
    doc.tel.addEventListener("keyup", () => {
      failInputText(validateTel(doc.tel.value.trim()), doc.tel, doc.alertErrorTel);
    });
  }

  if (doc.cel) {
    doc.cel.addEventListener("keyup", () => {
      failInputText(validateCel(doc.cel.value.trim()), doc.cel, doc.alertErrorCel);
    });
  }

  if (doc.email) {
    doc.email.addEventListener("keyup", () => {
      failInputText(validateEmail(doc.email.value.trim()), doc.email, doc.alertErrorEmail);
    });
  }

};
