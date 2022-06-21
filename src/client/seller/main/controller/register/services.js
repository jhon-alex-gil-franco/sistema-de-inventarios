import { insert, ValidateIfExist } from "../../helpers/functions.js";
import { failInputText, seachFail} from "../../helpers/messages.js";
import {
  validateCod,
  validateDescrip,
  validatePrice,
  validateServ,
} from "../../helpers/regularExpresions.js";

export const registerService = (doc) => {
  if (doc.btnReg) {
    doc.btnReg.addEventListener("click", (e) => {
      e.preventDefault();
      const url = "http://localhost:4000/api/services/" + doc.cod.value;
      try {
        if (
          validateCod(doc.cod.value.trim()) &&
          validateServ(doc.name.value.trim()) &&
          validateDescrip(doc.description.value.trim()) &&
          validatePrice(doc.price.value.trim())
        ) {
          ValidateIfExist(url).then((res) => {
            if (res === "Void") {
              const data = {
                idServicios: doc.cod.value.trim(),
                nombreServicio: doc.name.value.trim(),
                descripcion: doc.description.value.trim(),
                precio: doc.price.value.trim(),
              };
              swal({
                title: "Nuevo Servicio",
                text: "Desea agregar "+data.nombreServicio+"? ",
                icon: "info",
                buttons: true,
              }).then((willDelete) => {
                if (willDelete) {
                  insert(data, "http://localhost:4000/api/services/").then(
                    (res) => {
                      console.log(res);
                      if (res.status == "Create") {
                        doc.form.reset();
                        swal("Nuevo servicio creado!", {
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
            if (res.status === "err") {
              swal("Ocurrio un error inesperado!", {
                icon: "error",
              });
            }
            if(res.idServicios==doc.cod.value) {
              seachFail(doc, "Ya existe un servicio con codigo  " + doc.cod.value +"!");           
            }
          });
        }else{seachFail(doc,"Registro invalido, verifique los datos ingresados")} 
      } catch (err) {
        console.log(err);
      }
    });
  }

  if(doc.btnReset){
    doc.btnReset.addEventListener("click",(e)=>{
      location.reload()
    })
  }

  if (doc.cod) {
    doc.cod.addEventListener("keyup", () => {
      failInputText(
        validateCod(doc.cod.value.trim()),
        doc.cod,
        doc.alertErrorCod
      );
    });
  }

  if (doc.name) {
    doc.name.addEventListener("keyup", () => {
      failInputText(
        validateServ(doc.name.value.trim()),
        doc.name,
        doc.alertErrorName
      );
    });
  }

  if (doc.description) {
    doc.description.addEventListener("keyup", () => {
      failInputText(
        validateDescrip(doc.description.value.trim()),
        doc.description,
        doc.alertErrorDes
      );
    });
  }

  if (doc.price) {
    doc.price.addEventListener("keyup", () => {
      failInputText(
        validatePrice(doc.price.value.trim()),
        doc.price,
        doc.alertErrorPrice
      );
    });
  }
};
