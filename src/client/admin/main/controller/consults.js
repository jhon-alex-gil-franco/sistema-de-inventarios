
import { consultClientByParam, consultAllClient} from "./consults/client.js"
import { consultAllUser, consultUserByParam} from "./consults/user.js"
import { consultAllProducts,consultProductByParam } from "./consults/product.js"
import { consultAllSupplier, consultSupplierByParam } from "./consults/supplier.js"
import { dropChildOfTable } from "../helpers/helpers.js"


export const Consults= (doc,docC,docU,docP,docSup)=>{
    if(doc.category){
        doc.category.addEventListener("change", (e)=>{
         doc.inputSeach.value=""              
         if(doc.category.childNodes.length==15){
             doc.category.removeChild(doc.category.children[0])
         }
         dropChildOfTable(doc.containerTableconsults)
         switch(doc.category.value){

            case"c":selectConsult(doc.containerSelectCli)
            break;

            case"u":selectConsult(doc.containerSelectUser)
            break;

            
            case"p":selectConsult(doc.containerSelectProd)
            break; 

            case"s":selectConsult(doc.containerSelectSup)
            break; 
        }           
        })
    }
    
    if(doc.btnListAll){
        doc.btnListAll.addEventListener("click",(e)=>{
            dropChildOfTable(doc.containerTableconsults)
       
            switch(doc.category.value){
    
                case "c":consultAllClient(doc,docC) 
                break;
    
                case "u":consultAllUser(doc,docU)
                break;   
                
                case "p":consultAllProducts(doc,docP)
                break;  

                case "s":consultAllSupplier(doc,docSup)
                break;  
            }

        })

    }
  
    if(doc.inputSeach){
        doc.inputSeach.addEventListener("keyup",(e)=>{
            dropChildOfTable(doc.containerTableconsults)
            switch(doc.category.value){             
    
                case"c":consultClientByParam(doc,docC)
                break;
    
                case"u":consultUserByParam(doc,docU)
                break;
                
                case"p":consultProductByParam(doc,docP)
                break;  
                
                case"s":consultSupplierByParam(doc,docSup)
                break;  
            }
        })
    }
  

    const selectConsult=(category)=>{
        const list=[doc.containerSelectCli,doc.containerSelectUser, doc.containerSelectProd,doc.containerSelectSup]
       
        for(let i=0; i<=list.length; i++){
           try {
            if(list[i].classList.contains('show')){
                list[i].classList.remove("show");
                list[i].classList.add("hide")
            }                  
             if(list[i]==category ){
                list[i].classList.remove("hide");
                list[i].classList.add("show")
            }   
           }catch(error) {}
        }
    }

}