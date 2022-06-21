
const user=document.getElementById("username")
const pass=document.getElementById("password")
const btnSignIN=document.getElementById("sign_in")

const consultData= async(url)=>
{
    try {
          const resp=await fetch(url)
          const data=await resp.json()
          return data
        } catch (error) {swal("Datos para el inicio de session incorrectos!", {icon: "error"});}
}
if(btnSignIN)
 {
    btnSignIN.addEventListener("click", (e) => 
     {
        e.preventDefault()        
        consultData("http://localhost:4000/api/sigIn/"+user.value+"/"+pass.value )
        .then(resp=>
         {   
            if(resp.status!="Void"||resp.status!="Error")
            {
              if(resp.estado=="activo")
              {    
                resp.rol=="admin"?window.location.href = "./admin/views/index.ejs":window.location.href = "./seller/views/index.ejs"
                sessionStorage.setItem("username", resp.username);
                sessionStorage.setItem("id", resp.id);
                sessionStorage.setItem("pass", resp.password);
                sessionStorage.setItem("rol", resp.rol);
                sessionStorage.setItem("estado", resp.estado);
                sessionStorage.setItem("category", resp.categoria);
              }else{swal("Datos para el inicio de session incorrectos!", {icon: "error",});}   
            }else{swal("Datos para el inicio de session incorrectos!", {icon: "error",});}
          })
      })  
  }
