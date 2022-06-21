import { consultData, insert, ValidateIfExist } from "../../helpers/functions.js";
import { failInputText, seachFail } from "../../helpers/messages.js";
import { validateEmail, validateId, validateName, validatePassword } from "../../helpers/regularExpresions.js";
import{url}from "../../helpers/global.js";
import { componetSelectOptions } from "../../component/componentSelect.js";

export const registerUser = (doc) => {
  if (doc.btnRegUser) {
    doc.btnRegUser.addEventListener("click", (e) => {
        if (
          validateId(doc.id.value.trim()) &&
          validateName(doc.name.value.trim(),"persona") &&
          validateEmail(doc.email.value.trim())&&
          validatePassword(doc.pass.value) &&
          doc.confirmPass.value==doc.pass.value &&
          doc.rol.value!="null" &&
          doc.category.value!="null"
          ){
            
            ValidateIfExist(`${url}user/${doc.id.value}/qwQQKYKD32336*.DSDPOIIDHSBDJSD3651asdsdsSDFDF`).then(res => {
              if (res === "Void") {
                const data = {
                  id: doc.id.value.trim(),
                  username: doc.name.value.trim(),
                  password: doc.pass.value.trim(),
                  email: doc.email.value.trim(),
                  rol: doc.rol.value,
                  estado: "activo",
                  category: doc.category.value
                }
                swal({
                  title: "Nuevo Usuario",
                  text: "Desea crear "+ data.username +" ?",
                  icon: "info",
                  buttons: true,
                }).then((willCreate) => {
                  if (willCreate) {
                    insert(data,`${url}user/`).then((res) => {
                        if (res.status == "Create") {
                            doc.form.reset();
                            swal("Se creo nuevo usuario!", {icon: "success",});
                        }else {swal("Ocurrio un error inesperado!", {icon: "error"})}
                    });
                  }
                });
              }if (res.status === "err") {swal("Ocurrio un error inesperado!", {icon: "error", });
            }
            if (res.id == doc.id.value) { seachFail(doc, "Ya existe usuario " + doc.id.value) }
          })
        } else { seachFail(doc, "Registro invalido, verifique los datos ingresados") }
    });
  }
  if (doc.btnResetUser) {doc.btnResetUser.addEventListener("click", (e) => {location.reload();});}
  
  if (doc.id) {doc.id.addEventListener("keyup", () => {failInputText(validateId(doc.id.value.trim()), doc.id, doc.alertErrorId);});}
  
  if (doc.name)doc.name.addEventListener("keyup", () => {failInputText(validateName(doc.name.value.trim(), "persona"), doc.name, doc.alertErrorName);});
    
  if (doc.email) {doc.email.addEventListener("keyup", () => {failInputText(validateEmail(doc.email.value.trim()), doc.email, doc.alertErrorEmail);});}

  if (doc.pass) {doc.pass.addEventListener("keyup", () => {failInputText(validatePassword(doc.pass.value.trim()), doc.pass, doc.alertErrorPass);});}

  if (doc.confirmPass) {doc.confirmPass.addEventListener("keyup", () => {
    const validateFielConfirmPass=()=>{if(doc.confirmPass.value==doc.pass.value)return true; else return false}
    failInputText(validateFielConfirmPass(),doc.confirmPass,doc.alertErrorConfimPass)
  })}  

  consultData (`${url}category`).then(res => {componetSelectOptions(doc.category, res, 'nombre','nombre',5);})
  
}
