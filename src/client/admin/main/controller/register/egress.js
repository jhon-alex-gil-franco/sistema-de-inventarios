import { consultData, insert} from "../../helpers/functions.js"
import { dateNow} from "../../helpers/helpers.js";
import {failInputText, seachFail,formatterPeso } from "../../helpers/messages.js";
import {validateDescrip, validateId, validatePrice, } from "../../helpers/regularExpresions.js";
import{url}from "../../helpers/global.js";
import { componetSelectOptions } from "../../component/componentSelect.js";

export const registerNewEgress=(doc)=>{   
  
  if (validateDescrip(doc.concep.value)&&validatePrice(doc.price.value.trim())&&validateId(doc.supplier.value)&& doc.category.value!="null") {
    const data={
      fecha:dateNow(),
      concepto:doc.concep.value,
      valor:doc.price.value,
      categoria:doc.category.value,
      Proveedor_idProveedor:doc.supplier.value
    }
    swal({      
      title: "Desea generar este nuevo egreso ?",
      text:"Proveedor: "+`${doc.supplier.value}`+" \n Concepto: "+`${doc.concep.value}`+"\n Valor: "+`${formatterPeso.format(doc.price.value)}`,
      icon: "info",
      buttons: true,
    }).then((willCreate) => {
      if (willCreate) {
        insert(data,`${url}egress/`)
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
  

  consultData (`${url}supplier`).then(res => {componetSelectOptions(doc.supplier, res, 'nombre','idProveedor',3);})
  consultData (`${url}category`).then(res => {componetSelectOptions(doc.category, res, 'nombre','nombre',3);})
}

}
