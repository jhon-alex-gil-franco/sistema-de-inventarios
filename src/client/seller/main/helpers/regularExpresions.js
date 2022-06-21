const validateId = (id) => {
  const regEx = /^\d{7,13}$/;
  const regEx2 = /^[0-9]{9,15}[-]{1}[0-9]{1}$/;
  if (regEx.test(id)||regEx2.test(id)) {
    return true;
  } else {
    return false;
  }
};

const validateNit = (id) => {
  const regEx = /^[0-9]{9}[-]{1}[0-9]{1}$/;
 
  if (regEx.test(id)||regEx2.test(id)) {
    return true;
  } else {
    return false;
  }
};

const validateName = (name, arg) => {
  const regEx = /^[a-zA-Z Ñ]+\s[a-zA-Z Ñ]*\s*[a-zA-ZÑ]*\s*[a-zA-ZÑ]*\s*[a-zA-ZÑ]*\s*[a-zA-ZÑ]+$/;
  const regEx2= /^[a-zA-ZÑñ 0-9\- #.&_,?']{3,60}$/;
  if(arg=="persona"){
    if (regEx.test(name)) {return true;
    } else {return false;
    }
  }else{
    if (regEx2.test(name)) {return true;
    } else {return false;
    }

  }
 
};

// const validateBusiness = (business) => {
//   const regEx =
//   if (regEx.test(business)) {
//     return true;
//   } else {
//     return false;
//   }
// };

const validateDirection = (dir) => {
  const regEx = /^[a-zA-Z 0-9\-#ñÑ]{5,70}$/;
  if (regEx.test(dir)) {
    return true;
  } else {
    return false;
  }
};

const validateTel = (tel) => {
  const regEx = /^\d{7}$/;
  const regEx2 = /^\d{10}$/;
  if (regEx.test(tel) || regEx2.test(tel) || tel == "") {
    return true;
  } else {
    return false;
  }
};

const validateCel = (cel) => {
  const regEx = /^\d{10}$/;
  if (regEx.test(cel)|| cel == "") {
    return true;
  } else {
    return false;
  }
};

const validateEmail = (email) => {
  const regEx =
    /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regEx.test(email) || email == "") {
    return true;
  } else {
    return false;
  }
};

// const validateTclient = (tClient) => {
//   const regEx = /^[persona|empresa]$/;
//   if (regEx.test(tClient)) {
//     return true;
//   } else {
//     return false;
//   }
// };

const validatePlaca = (placa) => {
  const regEx = /^[A-Z0-9]{6}$/;
  if (regEx.test(placa)) {
    return true;
  } else {
    return false;
  }
};

const validateMarca = (marca) => {
  const regEx = /^[a-zA-Z ñÑ]{1,30}$/;
  if (regEx.test(marca)) {
    return true;
  } else {
    return false;
  }
};


const validateModelo = (modelo) => {
  const regEx = /^[A-Za-z0-9 ñÑ]{1,30}$/;
  if (regEx.test(modelo)) {
    return true;
  } else {
    return false;
  }
};

const validateAnio = (anio) => {
  const regEx = /^[0-9]{4}$/;
  if (regEx.test(anio)&& anio>=1950 && anio<=2050) {
    return true;
  } else {
    return false;
  }
};

const validateKm = (km) => {
  const regEx = /^[0-9]{1,6}$/;
  if( km!=""){
    if(regEx.test(km)){
      if(km>=0){return true;
      }else{return false;}
    }else{return false;}
  }else{return true;}
    // if ( km=="") {   
    // } else {
    //   return false;
    // }
 
};
 
const validateCod=(cod)=>{
  const regEx=/^[A-Z10-9]{1,10}$/;
  if(regEx.test(cod)){
    return true
  }else{return false}
}

const validatePrice=(price)=>{
  const regEx=/^[0-9]{2,9}$/;
  if(regEx.test(price)){
    return true
  }else{return false}
}

const validateDescrip=(des)=>{
  const regEx=/^[a-z A-Z \ 0-9 \.,Ññ]{0,200}$/;
  if(regEx.test(des)&& des!=""){
    return true
  }else{return false}
} 

const validateServ=(ser)=>{
  const regEx=/^[a-z A-Z  0-9ñÑ]{1,50}$/;
  if(regEx.test(ser)){
    return true
  }else{return false}
} 

const validateRef=(ref)=>{
  const regEx= /^[a-zA-Z 0-9\- #._,ñÑ']{1,30}$/;
  if(regEx.test(ref)){
    return true
  }else{return false}
} 

const validateAmount=(amount)=>{
  const regEx=/^[0-9]{0,3}$/;
  if(regEx.test(amount) && amount>=0){
    return true
  }else{return false}
} 

const validateAmountMin=(amountMin)=>{
  const regEx=/^[0-9]{1,2}$/;
  if(regEx.test(amountMin) && amountMin>0){
    return true
  }else{return false}
} 

const validateDate=(date)=>{
  const regEx=/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
  if(regEx.test(date)){
    return true
  }else{return false}
} 

export {
  validateDate,
  validateAmountMin,
  validateEmail,
  validateAmount,
  validateRef,
  validateDirection,
  validateTel,
  validateId,
  validateName,
  validateCel,
  validateNit,
  validatePlaca,
  validateMarca,
  validateModelo,
  validateAnio,
  validateKm,
  validateCod,
  validatePrice,
  validateDescrip,
  validateServ
};
