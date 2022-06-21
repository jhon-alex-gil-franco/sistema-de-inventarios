import { insert, ValidateIfExist } from "../../helpers/functions.js";
import { failInputText, seachFail} from "../../helpers/messages.js";
import {
  validateCod,
  validateDescrip,
  validatePrice,
  validateServ,
  validateAmount,
  validateRef,
  validateMarca,
  validateAmountMin,
} from "../../helpers/regularExpresions.js";

export const registerProduct = (doc) => {
  if (doc.btnReg) {
    doc.btnReg.addEventListener("click", (e) => {
      e.preventDefault();
    
      const url = "http://localhost:4000/api/product/"+doc.cod.value ;
      
      try {
        if (
          validateCod(doc.cod.value.trim()) &&
          validateServ(doc.name.value.trim()) &&
          validateDescrip(doc.description.value.trim()) &&
          validateAmount(doc.amount.value.trim())&&
          validateRef(doc.ref.value.trim())&&
          validateMarca(doc.mark.value.trim())&&
          validatePrice(doc.price.value.trim())&&
          validateAmountMin(doc.amountMin.value.trim())
        ) {
          ValidateIfExist(url).then((res) => {
            if (res === "Void") {
              const data = {
                CodProducto: doc.cod.value.trim(),
                NombreProducto: doc.name.value.trim(),
                Referencia: doc.ref.value.trim(),
                Marca: doc.mark.value.trim(),
                Descripcion: doc.description.value.trim(),
                Min:doc.amountMin.value.trim(),
                Cantidad: doc.amount.value.trim(),
                Precio:doc.price.value.trim()
              };
              swal({
                title: "Nuevo Producto",
                text: "Desea agregar "+data.NombreProducto+"? ",
                icon: "info",
                buttons: true,
              }).then((willDelete) => {
                if (willDelete) {
                  insert(data, "http://localhost:4000/api/product/").then(
                    (res) => {
                      console.log(res);
                      if (res.status == "Create") {
                        doc.form.reset();
                        swal("Nuevo producto creado!", {
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
            if(res.CodProducto==doc.cod.value) {
              seachFail(doc, "Ya existe un producto con codigo  " + doc.cod.value +"!");           
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
      failInputText(validateCod(doc.cod.value.trim()),doc.cod,doc.alertErrorCod);
    });
  }

  if (doc.name) {
    doc.name.addEventListener("keyup", () => {
      failInputText(
        validateServ(doc.name.value.trim()),doc.name,doc.alertErrorName );
    });
  }

  if (doc.ref) {
    doc.ref.addEventListener("keyup", () => {
      failInputText(
        validateRef(doc.ref.value.trim()),doc.ref,doc.alertErrorRef);
    });
  }

  if (doc.mark) {
    doc.mark.addEventListener("keyup", () => {
      failInputText(validateMarca(doc.mark.value.trim()),doc.mark,doc.alertErrorMark);
    });
  }

  
  if (doc.amount) {
    doc.amount.addEventListener("keyup", () => {
      failInputText(validateAmount(doc.amount.value.trim()),doc.amount,doc.alertErrorAmount);
    });
  }

  if (doc.amountMin) {
    doc.amountMin.addEventListener("keyup", () => {
      failInputText(validateAmountMin(doc.amountMin.value.trim()),doc.amountMin,doc.alertErrorAmountMin);
    });
  }


  if (doc.description) {
    doc.description.addEventListener("keyup", () => {
      failInputText(validateDescrip(doc.description.value.trim()),doc.description,doc.alertErrorDes);
    });
  }

  if (doc.price) {
    doc.price.addEventListener("keyup", () => {
      failInputText(validatePrice(doc.price.value.trim()),doc.price, doc.alertErrorPrice
      );
    });
  }
};
