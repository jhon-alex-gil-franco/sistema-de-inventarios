import { consultData } from "../../helpers/functions.js"
import { formatterPeso} from "../../helpers/messages.js"
import { validateDate } from "../../helpers/regularExpresions.js"
import{url}from "../../helpers/global.js";

let dataEgress=[]
let dataInvoice=[]
let dataTop=[]
let dir=""
let dir2=""
let sumaInvoice=0, sumaEgress=0, sumaCred=0, sumaprofits=0 ,commEmploye=0


export const reportsTopSales=(doc)=>{
    if(validateDate(doc.dateTopSales1.value)&&doc.dateTopSales2.value==""){
        url="http://localhost:4000/api/reports/"+doc.dateTopSales1.value +"/"+doc.dateTopSales1.value
      
    }if(validateDate(doc.dateTopSales2.value)&&validateDate(doc.dateTopSales1.value)){
        url="http://localhost:4000/api/reports/"+doc.dateTopSales1.value +"/"+doc.dateTopSales2.value
    }  

    consultData(url).then(resp=>{
        dataTop=resp
        if(dataTop==undefined || dataTop=="Void")  swal("No se encontraron resultados. Por favor verifique los parametros ingresados!", {
            icon: "info",
          });

        else{
            createTableTopSales(doc, dataTop)
        }
    })
}

export const reportsSales=(doc)=>{            
    sumaInvoice=0, sumaEgress=0, sumaCred=0, sumaprofits=0 ,commEmploye=0

    if(validateDate(doc.dateSales1.value)&&doc.dateSales2.value==""){
        url="http://localhost:4000/api/egress/"+doc.dateSales1.value +"/"+doc.dateSales1.value
        url2="http://localhost:4000/api/invoice/"+doc.dateSales1.value +"/"+doc.dateSales1.value
    }if(validateDate(doc.dateSales2.value)&&validateDate(doc.dateSales1.value)){
        url="http://localhost:4000/api/egress/"+doc.dateSales1.value +"/"+doc.dateSales2.value
        url2="http://localhost:4000/api/invoice/"+doc.dateSales1.value +"/"+doc.dateSales2.value
    }  

    consultData(url).then(respEgress=>{
        dataEgress=respEgress  
        if(dataEgress==undefined)  swal("No se encontraron resultados. Por favor verifique los parametros ingresados!", {
            icon: "info",
          });
        else{
            for (const list of dataEgress) {
                sumaEgress=sumaEgress+list.valor 
            }   
        }
        consultData(url2).then(respInvoice=>{
            dataInvoice=respInvoice  
            if(dataInvoice==undefined)swal("No se encontraron resultados. Por favor verifique los parametros ingresados!", {
                icon: "info",
              });
            else{
                for (const list of dataInvoice) { 
                    sumaprofits=sumaprofits+list.valor_neto
                    sumaInvoice=sumaInvoice+list.valor_bruto
                    sumaCred=sumaCred+list.abono 
                    commEmploye=commEmploye+list.comision_empleados
                }      
                let cred=sumaInvoice-sumaCred
                if(isNaN(commEmploye))commEmploye=0
                if(isNaN(sumaprofits))sumaprofits=0
                if(isNaN(sumaEgress))sumaEgress=0
                if(isNaN(sumaInvoice))sumaInvoice=0
                if(isNaN(cred))cred=0
                createTableConsult(doc,sumaEgress,sumaInvoice, cred, sumaprofits, commEmploye) 
            }          
        })     
    })  
} 

export const reportsEmployee=(doc)=>{            
   
    consultData(`${url}itemInvoice/${doc.dateEmp1.value}/${doc.dateEmp2.value}/${doc.selectListEmployee.value}`)
    .then(resp=>{

        if(resp=="Void"|| resp==undefined) swal("No hay resultados. Verifique los datos ingresados!", {icon: "info" });

        createTableReportEmployee(doc, resp)
  
    })
 
} 


const createTableConsult = (doc, sumaEgress,sumaInvoice, cred,  sumaprofits, commEmploye) => {
    try {
        const div = document.createElement("div");
        const divDate = document.createElement("div"); 
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        divDate.style = "background:black;color:white;padding:3px "
        div.className = "table-responsive";
        if(doc.dateSales2.value==""){
            divDate.textContent=`Periodo desde ${doc.dateSales1.value} hasta ${doc.dateSales1.value}`;
        }else{ divDate.textContent=`Periodo desde ${doc.dateSales1.value} hasta ${doc.dateSales2.value}`;}
        table.className = "table table-sm table-bordered";
        thead.style = "background:rgb(182, 184, 183);";
        const tbody = document.createElement("tbody");
        const tr = document.createElement("tr");
        const th1 = document.createElement("th");
        const th2 = document.createElement("th");
        const th3 = document.createElement("th");
        const th4 = document.createElement("th");
        const th5 = document.createElement("th");
        const th6 = document.createElement("th");
        th1.textContent = "T. Egresos";
        th2.textContent = "T. Ingresos";
        th3.textContent = "T. Empleados";
        th4.textContent = "Ganancias";
        th5.textContent ="Saldo por cobrar";
        th6.textContent = "Liquidez";
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
        doc.tableReportSales.appendChild(divDate);      
        doc.tableReportSales.appendChild(div);
        const trdTotal=document.createElement("tr")
        const tdTotal1=document.createElement("td")
        const tdTotal2=document.createElement("td")
        const tdTotal3=document.createElement("td")
        const tdTotal4=document.createElement("td")
        const tdTotal5=document.createElement("td")
        const tdTotal6=document.createElement("td")
        tdTotal1.textContent=formatterPeso.format(`${sumaEgress}`)
        tdTotal2.textContent=formatterPeso.format(`${sumaInvoice}`)
        tdTotal3.textContent=formatterPeso.format(`${commEmploye}`)
        tdTotal4.textContent=formatterPeso.format(`${sumaprofits-sumaEgress}`)
        tdTotal5.textContent=formatterPeso.format(`${cred}`)
        tdTotal6.textContent=formatterPeso.format(`${sumaprofits-sumaEgress-cred}`)
        trdTotal.appendChild(tdTotal1)
        trdTotal.appendChild(tdTotal2)
        trdTotal.appendChild(tdTotal3)
        trdTotal.appendChild(tdTotal4)
        trdTotal.appendChild(tdTotal5)
        trdTotal.appendChild(tdTotal6)
        tbody.appendChild(trdTotal)        
    } catch (error) { console.log(error)}
}

 const createTableReportEmployee = (doc, res) => {
        try {
            const div = document.createElement("div");
            const divDate = document.createElement("div");
            const table = document.createElement("table");
            const thead = document.createElement("thead");
            divDate.style = "background:black;color:white;padding:3px "
            div.className = "table-responsive";
            if(doc.dateEmp2.value==""){
                divDate.textContent=`Periodo desde ${doc.dateEmp1.value} hasta ${doc.dateEmp1.value}`;
            }else{ divDate.textContent=`Periodo desde ${doc.dateEmp1.value} hasta ${doc.dateEmp2.value}`;}
            table.className = "table table-sm table-hover ";
            thead.style = "background:rgb(182, 184, 183);";
            const tbody = document.createElement("tbody");
            const tr = document.createElement("tr");
            const th1 = document.createElement("th");
            const th2 = document.createElement("th");
            const th3 = document.createElement("th");
            const th4 = document.createElement("th");
            const th5 = document.createElement("th");
            const th6 = document.createElement("th");
            const th7 = document.createElement("th");
            th1.textContent = "Id Empleado";
            th2.textContent = "Nombre";
            th3.textContent = "Placa";
            th4.textContent = "Servicio";
            th5.textContent ="Fecha";
            th6.textContent ="Cod Factura";
            th7.textContent = "Comicion";
            tr.appendChild(th1);
            tr.appendChild(th2);
            tr.appendChild(th3);
            tr.appendChild(th4);
            tr.appendChild(th5);
            tr.appendChild(th6);
            tr.appendChild(th7);
            thead.appendChild(tr);
            table.appendChild(thead);
            table.appendChild(tbody);
            div.appendChild(table);
            doc.tableReportEmployee.appendChild(divDate);
            doc.tableReportEmployee.appendChild(div);
            let suma=0
            for (const list of res) {
                suma=suma+list.comision
                const trd = document.createElement("tr");
                const td1 = document.createElement("td");
                const td2 = document.createElement("td");
                const td3 = document.createElement("td");
                const td4 = document.createElement("td");
                const td5 = document.createElement("td");
                const td6 = document.createElement("td");
                const td7 = document.createElement("td");
                td1.textContent = `${list.idEmpleados}`;
                td2.textContent = `${list.nombre}`;
                td3.textContent = `${list.Placa_placa}`;
                td4.textContent = `${list.descripcion}`;
                td5.textContent = `${list.fecha.substr(0,10)}`;
                td6.textContent = `${list.cod_factura}`;
                td7.textContent = formatterPeso.format(`${list.comision}`);
                trd.appendChild(td1);
                trd.appendChild(td2);
                trd.appendChild(td3);
                trd.appendChild(td4);
                trd.appendChild(td5);
                trd.appendChild(td6);
                trd.appendChild(td7);
                tbody.appendChild(trd);
            }
            const trdTotal=document.createElement("tr")
            const tdTotal1=document.createElement("td")
            const tdTotal2=document.createElement("td")
            const tdTotal3=document.createElement("td")
            const tdTotal4=document.createElement("td")
            const tdTotal5=document.createElement("td")
            const tdTotal6=document.createElement("td")
            const tdTotal7=document.createElement("td")
            const stTex=document.createElement("strong")
            const stSum=document.createElement("strong")
            stTex.textContent="TOTAL:"
            stSum.textContent=formatterPeso.format(`${suma}`);
            tdTotal1.appendChild(stTex)
            tdTotal7.appendChild(stSum)
            trdTotal.appendChild(tdTotal1)
            trdTotal.appendChild(tdTotal2)
            trdTotal.appendChild(tdTotal3)
            trdTotal.appendChild(tdTotal4)
            trdTotal.appendChild(tdTotal5)
            trdTotal.appendChild(tdTotal6)
            trdTotal.appendChild(tdTotal7)
            tbody.appendChild(trdTotal)        
        } catch (error) {}
}

const createTableTopSales = (doc, res) => {
    try {
        const div = document.createElement("div");
        const divDate = document.createElement("div"); 
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        divDate.style = "background:black;color:white;padding:3px "
        div.className = "table-responsive";
        if(doc.dateTopSales2.value==""){
            divDate.textContent=`Periodo desde ${doc.dateTopSales1.value} hasta  ${doc.dateTopSales1.value}`;
        }else{ divDate.textContent=`Periodo desde ${doc.dateTopSales1.value} hasta ${doc.dateTopSales2.value}`;}
        table.className = "table table-sm ";
        thead.style = "background:rgb(182, 184, 183);";
        const tbody = document.createElement("tbody");
        const tr = document.createElement("tr");
        const th1 = document.createElement("th");
        const th2 = document.createElement("th");
        const th3 = document.createElement("th");
        const th4 = document.createElement("th");
        const th5 = document.createElement("th");
        const th6 = document.createElement("th");
        const th7 = document.createElement("th");
        th1.textContent = "T. Item";
        th2.textContent = "Codigo";
        th3.textContent = "Descripcion";
        th4.textContent = "Marca";
        th5.textContent = "Referencia";
        th6.textContent = "Cantidad";
        th7.textContent = "Total ventas";
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        tr.appendChild(th4);
        tr.appendChild(th5);
        tr.appendChild(th6);
        tr.appendChild(th7);
        thead.appendChild(tr);
        table.appendChild(thead);
        table.appendChild(tbody);
        div.appendChild(table);
        doc.tableReportTopSales.appendChild(divDate);      
        doc.tableReportTopSales.appendChild(div);
        for (const list of res) {
            if(list.t_item=="product"){
                const trd = document.createElement("tr");
                const td1 = document.createElement("td");
                const td2 = document.createElement("td");
                const td3 = document.createElement("td");
                const td4 = document.createElement("td");
                const td5 = document.createElement("td");
                const td6 = document.createElement("td");
                const td7 = document.createElement("td");
                td1.textContent = `${list.t_item}`;
                td2.textContent = `${list.cod_item}`;
                td3.textContent = `${list.descripcion}`;
                td4.textContent = `${list.marca}`;
                td5.textContent = `${list.referencia}`;
                td6.textContent = `${list.TotalCantidad}`;
                td7.textContent = formatterPeso.format(`${list.TotalVentas}`);
                trd.appendChild(td1);
                trd.appendChild(td2);
                trd.appendChild(td3);
                trd.appendChild(td4);
                trd.appendChild(td5);
                trd.appendChild(td6);
                trd.appendChild(td7);
                tbody.appendChild(trd);
            }
        }
        const divseparator = document.createElement("div");
        divseparator.style="padding-top:20px"
        tbody.appendChild(divseparator);

        for (const list of res) {
            if(list.t_item=="service"){
                const trd = document.createElement("tr");
                const td1 = document.createElement("td");
                const td2 = document.createElement("td");
                const td3 = document.createElement("td");
                const td4 = document.createElement("td");
                const td5 = document.createElement("td");
                const td6 = document.createElement("td");
                const td7 = document.createElement("td");
                td1.textContent = `${list.t_item}`;
                td2.textContent = `${list.cod_item}`;
                td3.textContent = `${list.descripcion}`;
                td4.textContent = `${list.marca}`;
                td5.textContent = `${list.referencia}`;
                td6.textContent = `${list.TotalCantidad}`;
                td7.textContent = `${list.TotalVentas}`;
                trd.appendChild(td1);
                trd.appendChild(td2);
                trd.appendChild(td3);
                trd.appendChild(td4);
                trd.appendChild(td5);
                trd.appendChild(td6);
                trd.appendChild(td7);
                tbody.appendChild(trd);
            }
        }
    } catch (error) { console.log(error)}
   
}

    




