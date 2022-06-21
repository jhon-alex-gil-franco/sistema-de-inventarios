import { insert} from "../../helpers/functions.js"
import { dateNow} from "../../helpers/helpers.js";
import {failInputText, seachFail,formatterPeso } from "../../helpers/messages.js";
import {validateDescrip, validateId, validatePrice, } from "../../helpers/regularExpresions.js";

export const registerNewEgress=(doc)=>{   
  
  if (validateDescrip(doc.concep.value)&&validatePrice(doc.price.value.trim())&&validateId(doc.supplier.value)) {
    const data={
      fecha:dateNow(),
      concepto:doc.concep.value,
      valor:doc.price.value,
      Proveedor_idProveedor:doc.supplier.value
    }
    swal({      
      title: "Desea generar este nuevo egreso ?",
      text:"Proveedor: "+`${doc.supplier.value}`+" \n Concepto: "+`${doc.concep.value}`+"\n Valor: "+`${formatterPeso.format(doc.price.value)}`,
      icon: "info",
      buttons: true,
    }).then((willCreate) => {
      if (willCreate) {
        insert(data, "http://localhost:4000/api/egress/")
        .then((res) => {
          if (res.status == "Create") {
            doc.form.reset();
            swal("Egreso generado!", {icon: "success",});                  
          } else { swal("Ocurrio un error inesperado!", {icon: "error"});}                   
        });
      }
    });              
  }else{doc.supplier.value=="null"?seachFail(doc,"Registro invalido, debe ingresar un proveedor"):seachFail(doc,"Registro invalido, verifique los datos ingresados")} 
}

export const complemetRegEgress=(doc)=>{ 
  if (doc.concep) { doc.concep.addEventListener("keyup", () => {failInputText(validateDescrip(doc.concep.value.trim()),doc.concep,doc.alertErrorConcep);});}
  if (doc.price) {doc.price.addEventListener("keyup", () => {failInputText(validatePrice(doc.price.value.trim()),doc.price,doc.alertErrorPrice);});
  
  if (doc.supplier) {
    doc.supplier.addEventListener("click", () => {
      fetch("http://localhost:4000/api/supplier", { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        if (doc.supplier.childNodes.length == 3) {
          const fragment = document.createDocumentFragment();
          for (const Info of res) {
            const listItem = document.createElement("OPTION");
            listItem.textContent = `${Info.nombre}`+" - "+`${Info.idProveedor}`;
            listItem.value = Info.idProveedor;
            listItem.className = "form-control";
            fragment.appendChild(listItem);
          }
          doc.supplier.appendChild(fragment);
        }
      })
      .catch((error) => {
        console.log("ocurrio un error en la peticion:", error);
      });
    });
  } 
}
}
