
//message succes
export const succes=(doc)=>{
    doc.alert.classList.remove("alert-danger");
    doc.alert.classList.add("alert-success");
    doc.alert.classList.remove("message-reg");
    doc.alert.classList.add("amessage-register__succes");
    doc.alert.textContent = "Registro exitoso";
    setTimeout(function () {
      doc.alert.classList.remove("amessage-register__succes");
      doc.alert.classList.add("message-reg");
    }, 5000);
    doc.form.reset();
}


export const seachFail=(doc,ms)=>{
    doc.alert.classList.remove("alert-success");
    doc.alert.classList.add("alert-danger");
    doc.alert.classList.remove("message-reg");
    doc.alert.classList.add("message-register__fail");
    doc.alert.textContent = ms
    setTimeout(function () {
      doc.alert.classList.remove("message-register__fail");
      doc.alert.classList.add("message-reg");
    }, 4000); 

}

export const failInputText= (exp, doc, inputError)=>{
  if (exp || doc.value == "") {
    doc.classList.remove("formulario__grupo-incorrecto");
    doc.classList.add("form-control");
    inputError.classList.remove("notifications-input__error");
    inputError.classList.add("notifications-input");
    console.log("ok")
  } else {
    doc.classList.remove("form-control");
    doc.classList.add("formulario__grupo-incorrecto");
    inputError.classList.add("notifications-input__error");
    inputError.classList.remove("notifications-input");
    console.log("err")
  }
}


export const mesajeNoFundData=(table)=>{
  let HTMLString=`
  <div class="">
  <h4><i class="fa fa-exclamation-circle"></i> No Hay Coincidencias</h4>
  <p>No se encontraron datos relacionados con la busqueda.</p>
  </div>
  `;
  table.innerHTML=HTMLString
  }

  export const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  })