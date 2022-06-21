import { insert, ValidateIfExist} from "../../helpers/functions.js"
import {failInputText, seachFail} from "../../helpers/messages.js";
import {validateDescrip,validateMarca } from "../../helpers/regularExpresions.js";
import{url}from "../../helpers/global.js";

export const registerCategory=(doc)=>{   
   
    if(doc.btnRegCategory){
       doc.btnRegCategory.addEventListener("click",()=>{
        if (validateDescrip(doc.description.value)&&validateMarca(doc.name.value.trim())) {
            ValidateIfExist(`${url}category/${doc.name.value}`).then(resp=>{
                if(resp.status=="Void"){
                   const data={
                               name:doc.name.value.trim(),
                               description:doc.description.value
                              } 
                   swal({      
                         title: "Esta seguro ?",
                         text:`Se creara  nueva categoria `,
                         icon: "info",
                         buttons: true,
                        }).then((willCreate) => {
                                if (willCreate) {
                                    insert(data, `${url}category/`)
                                    .then((res) => {
                                       if (res.status == "Create") {
                                           doc.form.reset();
                                           swal("Egreso generado!", {icon: "success",});                  
                                       } else { swal("Ocurrio un error inesperado!", {icon: "error"});}                   
                                    });
                                }
                          });   
                }else{seachFail(doc,"Ya existe categoria "+doc.name.value)} 
            })             
         }else{seachFail(doc,"Registro invalido, verifique los datos ingresados")} 
       })
        
    }

   if(doc.btnCancelCategory){ doc.btnCancelCategory.addEventListener("click", ()=>{doc.form.reset()})}
   if (doc.description) { doc.description.addEventListener("keyup", () => {failInputText(validateDescrip(doc.description.value.trim()),doc.description,doc.alertErrorDescription);});}
   if (doc.name) {doc.name.addEventListener("keyup", () => {failInputText(validateMarca(doc.name.value.trim()),doc.name,doc.alertErrorName);});}
}

 