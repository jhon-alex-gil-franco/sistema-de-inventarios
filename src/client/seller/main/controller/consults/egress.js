import { consultData } from "../../helpers/functions.js"
import { dropChildOfTable } from "../../helpers/helpers.js"
import { formatterPeso, mesajeNoFundData } from "../../helpers/messages.js"
import { validateDate } from "../../helpers/regularExpresions.js"


export  const consultAllEgress=(doc)=>
{
    consultData("http://localhost:4000/api/egress/").then(resp => 
    {
        dropChildOfTable(doc.containerTableEgress) 
        createTableConsult(doc, resp) 
    })
}

export const consultEgress=(doc)=>
{
    if(doc.inputSeach){doc.inputSeach.addEventListener('keyup',(e)=>{consultOnEvents()})}
    if(doc.date1){doc.date1.addEventListener('keyup',(e)=>{consultOnEvents()})}  
    if(doc.date2){doc.date2.addEventListener('keyup',(e)=>{consultOnEvents()})
}   
    
const consultOnEvents=()=>
{
        dropChildOfTable (doc.containerTableEgress) 
        let url=""
        if(validateDate(doc.date1.value)&&doc.date2.value==""){url="http://localhost:4000/api/egress/"+doc.date1.value +"/"+doc.date1.value
         }if(validateDate(doc.date2.value)&&validateDate(doc.date1.value)){url="http://localhost:4000/api/egress/"+doc.date1.value +"/"+doc.date2.value
           }if(doc.date1.value==="")url="http://localhost:4000/api/egress" 
           if(doc.inputSeach.value===""){
               consultData(url).then((resp) => {
                   if(resp==undefined || resp=="Void"){
                       dropChildOfTable(doc.containerTableEgress) 
                       mesajeNoFundData(doc.containerTableEgress);
                    }else{
                        dropChildOfTable(doc.containerTableEgress) 
                        createTableConsult(doc, resp) 
                    }    
                });                
            }else{
                dropChildOfTable(doc.containerTableEgress) 
                consultData(url).then((resp) => {
                    consultByFilter(doc, resp)
                }); 
            }      
        }       
        
        const  consultByFilter=(doc,  resp)=>{
            switch (doc.selectEgress.value) {
                case "name":dataForName(doc, resp);break
                case "sup":dataForSupplier(doc,resp);break
                case "concep":dataForConept(doc,resp);break
            } 
        }

        const dataForName=(doc, resp)=>{
            try {
                const listName = []
                const foundName = resp.map((data) => {if (data.nombre.includes(doc.inputSeach.value.toUpperCase())) { listName.push(data) } })
                listName.length > 0 ? createTableConsult(doc,  listName) : mesajeNoFundData(doc.containerTableEgress);
            } catch (error) {}            
        }
        
        const dataForSupplier=(doc, resp)=>{
            try {
                const listSup = []
                const foundSup = resp.map(data => { if (data.idProveedor.includes(doc.inputSeach.value)) { listSup.push(data) } })
                listSup.length > 0 ? createTableConsult(doc,  listSup) : mesajeNoFundData(doc.containerTableEgress); 
            } catch (error) {}
        }
        
        const dataForConept=(doc, resp)=>{
            try {
                const listConcep = []
                const foundConcep = resp.map(data => { if (data.concepto.includes(doc.inputSeach.value.toLowerCase())) { listConcep.push(data) } })
                listConcep.length > 0 ? createTableConsult(doc,  listConcep) : mesajeNoFundData(doc.containerTableEgress);
            } catch (error) {}       
        }
    }
    const createTableConsult = (doc, res) => {
        try {
            const div = document.createElement("div");
            const h5 = document.createElement("h5");
            const table = document.createElement("table");
            const thead = document.createElement("thead");
            div.className = "table-responsive";
            h5.textContent = "Egresos";
            table.className = "table table-striped ";
            thead.style = "background:rgb(182, 184, 183);";
            const tbody = document.createElement("tbody");
            const tr = document.createElement("tr");
            const th1 = document.createElement("th");
            const th2 = document.createElement("th");
            const th3 = document.createElement("th");
            const th4 = document.createElement("th");
            const th5 = document.createElement("th");
            const th6 = document.createElement("th");
            th1.textContent = "Cod";
            th2.textContent = "Fecha";
            th3.textContent = "Concepto";
            th4.textContent = "ID Proveedor";
            th5.textContent = "N. Proveedor";
            th6.textContent = "Costo";
            tr.appendChild(th1);
            tr.appendChild(th2);
            tr.appendChild(th3);
            tr.appendChild(th4);
            tr.appendChild(th5);
            tr.appendChild(th6);
            thead.appendChild(tr);
            table.appendChild(thead);
            table.appendChild(tbody);
            div.appendChild(table);
            doc.containerTableEgress.appendChild(h5);
            doc.containerTableEgress.appendChild(div);
            let suma=0
            for (const list of res) {
                suma=suma+list.valor
                const trd = document.createElement("tr");
                const td1 = document.createElement("td");
                const td2 = document.createElement("td");
                const td3 = document.createElement("td");
                const td4 = document.createElement("td");
                const td5 = document.createElement("td");
                const td6 = document.createElement("td");
                td1.textContent = `${list.cod}`;
                td2.textContent = `${list.fecha.substr(0,10)}`;
                td3.textContent = `${list.concepto}`;
                td4.textContent = `${list.Proveedor_idProveedor}`;
                td5.textContent = `${list.nombre}`;
                td6.textContent = formatterPeso.format(`${list.valor}`);
                trd.appendChild(td1);
                trd.appendChild(td2);
                trd.appendChild(td3);
                trd.appendChild(td4);
                trd.appendChild(td5);
                trd.appendChild(td6);
                tbody.appendChild(trd);
            }
            const trdTotal=document.createElement("tr")
            const tdTotal1=document.createElement("td")
            const tdTotal2=document.createElement("td")
            const tdTotal3=document.createElement("td")
            const tdTotal4=document.createElement("td")
            const tdTotal5=document.createElement("td")
            const tdTotal6=document.createElement("td")
            const stTex=document.createElement("strong")
            const stSum=document.createElement("strong")
            stTex.textContent="TOTAL:"
            stSum.textContent=formatterPeso.format(`${suma}`);
            tdTotal1.appendChild(stTex)
            tdTotal6.appendChild(stSum)
            trdTotal.appendChild(tdTotal1)
            trdTotal.appendChild(tdTotal2)
            trdTotal.appendChild(tdTotal3)
            trdTotal.appendChild(tdTotal4)
            trdTotal.appendChild(tdTotal5)
            trdTotal.appendChild(tdTotal6)
            tbody.appendChild(trdTotal)        
        } catch (error) {}
    }