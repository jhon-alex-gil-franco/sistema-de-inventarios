import { consultData, deleted, edit, insert } from "../../helpers/functions.js"
import { dateNow, dropChildOfTable } from "../../helpers/helpers.js"
import { formatterPeso, mesajeNoFundData, seachFail } from "../../helpers/messages.js"
import { validateDate, validateDescrip, validatePrice } from "../../helpers/regularExpresions.js"

export  const consultAllInvoice=(doc)=>{
    consultData("http://localhost:4000/api/invoice/1").then((resp) => {
        dropChildOfTable(doc.containerTableConsultInvoice) 
        createTableConsult(doc, resp) 
    })
}

export const consultAccountsReceivable=(doc)=>{
    consultData("http://localhost:4000/api/invoice/1").then((resp) => {
        dropChildOfTable(doc.containerTableConsultInvoice) 
        try {
            const listTP = []
            const foundTP = resp.map(data => {if (data.valor_bruto>data.abono) { listTP.push(data) } })
            listTP.length > 0 ? createTableConsult(doc,  listTP) : mesajeNoFundData(doc.containerTableConsultInvoice); 
        } catch (error) {}    
    })
}

export const consultInvoiceCancel=(doc)=>{
    const url="http://localhost:4000/api/invoiceCancellation/"
    consultData(url).then((resp) => {
        console.log(resp)
        if(resp==undefined || resp=="Void"){
            dropChildOfTable(doc.containerTableConsultInvoice) 
            mesajeNoFundData(doc.containerTableConsultInvoice);
        }else{
            dropChildOfTable(doc.containerTableConsultInvoice) 
            createTableConsult(doc, resp,url) 
        }    
        // dropChildOfTable(doc.containerTableConsultInvoice) 
        // createTableConsult(doc, resp,url) 
    })
}



export const  consultInvoice=(doc)=>{
    if(doc.inputSeach){doc.inputSeach.addEventListener('keyup',(e)=>{consultOnEvents()})}
    
    if(doc.date1){doc.date1.addEventListener('keyup',(e)=>{consultOnEvents()})}  
    
    if(doc.date2){doc.date2.addEventListener('keyup',(e)=>{consultOnEvents()})}   
    
    const consultOnEvents=()=>{
        dropChildOfTable (doc.containerTableConsultInvoice) 
        let url=""
        if(validateDate(doc.date1.value)&&doc.date2.value==""){url="http://localhost:4000/api/invoice/"+doc.date1.value +"/"+doc.date1.value
    }if(validateDate(doc.date2.value)&&validateDate(doc.date1.value)){url="http://localhost:4000/api/invoice/"+doc.date1.value +"/"+doc.date2.value
}if(doc.date1.value===""){url="http://localhost:4000/api/invoice/1"
} 

if(doc.inputSeach.value===""){
    consultData(url).then((resp) => {
        console.log(resp)
        if(resp==undefined || resp=="Void"){
            dropChildOfTable(doc.containerTableConsultInvoice) 
            mesajeNoFundData(doc.containerTableConsultInvoice);
        }else{
           
            switch(doc.selectTpayConsult.value){
                case "all":
                    dropChildOfTable(doc.containerTableConsultInvoice) 
                    createTableConsult(doc, resp) 
                    break;
                case "cont":
                    dropChildOfTable(doc.containerTableConsultInvoice) 
                        const listDataCont=[]
                        resp.map((data) => {if(data.t_pago=="contado"){listDataCont.push(data)}})
                        listDataCont.length > 0 ? createTableConsult(doc, listDataCont) : mesajeNoFundData(doc.containerTableConsultInvoice);
                    break
                    case "cred":
                        dropChildOfTable(doc.containerTableConsultInvoice) 
                            const listDataCred=[]
                            resp.map((data) => {if(data.t_pago=="credito"){listDataCred.push(data)}})
                            listDataCred.length > 0 ? createTableConsult(doc, listDataCred) : mesajeNoFundData(doc.containerTableConsultInvoice);
                        break    
                        case "cancel":
                            dropChildOfTable(doc.containerTableConsultInvoice) 
                                const listDataCancel=[]
                                resp.map((data) => {if(data.t_pago=="cancelada"){listDataCancel.push(data)}})
                                listDataCancel.length > 0 ? createTableConsult(doc,  listDataCancel) : mesajeNoFundData(doc.containerTableConsultInvoice);
                            break  
            }
        }    
    });                
}else{
    switch(doc.selectTpayConsult.value){
        case "all":
            dropChildOfTable(doc.containerTableConsultInvoice) 
            consultData(url).then((resp) => {consultByFilter(doc, resp)}); 
            break;
        case "cont":
            dropChildOfTable(doc.containerTableConsultInvoice) 
            consultData(url).then((resp) => {
                const listData=[]
                resp.map((data) => {if(data.t_pago=="contado"){listData.push(data)}})
                consultByFilter(doc, listData)}); 
            break
            case "cred":
                dropChildOfTable(doc.containerTableConsultInvoice) 
                consultData(url).then((resp) => {
                    const listData=[]
                    resp.map((data) => {if(data.t_pago=="credito"){listData.push(data)}})
                    consultByFilter(doc, listData)}); 
                break    
                case "cancel":
                    dropChildOfTable(doc.containerTableConsultInvoice) 
                    consultData(url).then((resp) => {
                        const listData=[]
                        resp.map((data) => {if(data.t_pago=="cancelada"){listData.push(data)}})
                        consultByFilter(doc, listData)}); 
                    break  
    }
    
    // dropChildOfTable(doc.containerTableConsultInvoice) 
    // consultData(url).then((resp) => {consultByFilter(doc, resp)}); 
}      
}       


const  consultByFilter=(doc,  resp)=>{
        switch (doc.selectCategory.value) {
            case "idClient":dataForIdClient(doc, resp);break
            case "name":dataForName(doc, resp);break
            case "placa":dataForPlaca(doc,resp);break
            case "cod":dataForCod(doc,resp);break
            case "payment":dataForTPay(doc,resp);break            
        }
}

const dataForName=(doc, resp)=>{
    try {
        const listName = []
        const foundName = resp.map((data) => {if(data.nombre.includes(doc.inputSeach.value.toUpperCase())) { listName.push(data) }})
        listName.length > 0 ? createTableConsult(doc,  listName) : mesajeNoFundData(doc.containerTableConsultInvoice);
    } catch (error) {}
}

const dataForIdClient=(doc, resp)=>{
    try {
        const listIdClient = []
        const foundIdClient = resp.map(data => { if (data.idClientes.includes(doc.inputSeach.value)) { listIdClient.push(data) } })
        listIdClient.length > 0 ? createTableConsult(doc,  listIdClient) : mesajeNoFundData(doc.containerTableConsultInvoice); 
    } catch (error) {}
}

const dataForPlaca=(doc, resp)=>{
    try {
        const listPlaca = []
        const foundplaca= resp.map(data => { if (data.placa.includes(doc.inputSeach.value.toUpperCase())) { listPlaca.push(data) } })
        listPlaca.length > 0 ? createTableConsult(doc,  listPlaca) : mesajeNoFundData(doc.containerTableConsultInvoice);  
    } catch (error) {}       
}

const dataForCod=(doc, resp)=>{
    try {
        const listCod = []
        const foundCod = resp.map(data => {if (data.cod_factura==doc.inputSeach.value) { listCod.push(data) } })
        listCod.length > 0 ? createTableConsult(doc,  listCod) : mesajeNoFundData(doc.containerTableConsultInvoice); 
    } catch (error) {}     
}

const dataForTPay=(doc, resp)=>{
    const listTP = []
    const foundTP = resp.map(data => {if (data.t_pago.includes(doc.inputSeach.value)) { listTP.push(data) } })
    listTP.length > 0 ? createTableConsult(doc,  listTP) : mesajeNoFundData(doc.containerTableConsultInvoice); 
}
}



const createTableConsult = (doc, res, rute) => {
    try {
        const div = document.createElement("div");
        const h5 = document.createElement("h5");
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        div.className = "table-responsive";
        h5.textContent = "Facturas";
        table.className = "table table-striped ";
        thead.style = "background:rgb(182, 184, 183);";
        const tbody = document.createElement("tbody");
        if(rute=="http://localhost:4000/api/invoiceCancellation/"){
            h5.textContent = "Facturas Anuladas";
            const tr = document.createElement("tr");
            const th1 = document.createElement("th");
            const th2 = document.createElement("th");
            const th3 = document.createElement("th");
            const th4 = document.createElement("th");
            const th5 = document.createElement("th");
            const th6 = document.createElement("th");
            const th7 = document.createElement("th");
            const th8 = document.createElement("th");
            const th9 = document.createElement("th");
            th1.textContent = "Cod";
            th2.textContent = "Placa";
            th3.textContent = "ID. Cliente";
            th4.textContent = "Nombre";
            th5.textContent = "Motivo Anulacion";
            th6.textContent = "Valor";
            th7.textContent = "Estado";
            th8.textContent = "Fecha";
            th9.textContent = "Detalle";
            tr.appendChild(th1);
            tr.appendChild(th2);
            tr.appendChild(th3);
            tr.appendChild(th4);
            tr.appendChild(th5);
            tr.appendChild(th6);
            tr.appendChild(th7);
            tr.appendChild(th8);
            tr.appendChild(th9);
            thead.appendChild(tr);
            table.appendChild(thead);
            table.appendChild(tbody);
            div.appendChild(table);
            doc.containerTableConsultInvoice.appendChild(h5);
            doc.containerTableConsultInvoice.appendChild(div);
            }else{
                const tr = document.createElement("tr");
                const th1 = document.createElement("th");
                const th2 = document.createElement("th");
                const th3 = document.createElement("th");
                const th4 = document.createElement("th");
                const th5 = document.createElement("th");
                const th6 = document.createElement("th");
                const th7 = document.createElement("th");
                const th8 = document.createElement("th");
                const th9 = document.createElement("th");
                const th10 = document.createElement("th");
                const th11 = document.createElement("th");
                th1.textContent = "Cod";
                th2.textContent = "Placa";
                th3.textContent = "ID. Cliente";
                th4.textContent = "Nombre";
                th5.textContent = "T.Pago";
                th6.textContent = "Valor";
                th7.textContent = "Abono";
                th8.textContent = "Fecha";
                th9.textContent = "Detalle";
                th10.textContent = "Abonar";
                th11.textContent = "L. Abonos";
                tr.appendChild(th1);
                tr.appendChild(th2);
                tr.appendChild(th3);
                tr.appendChild(th4);
                tr.appendChild(th5);
                tr.appendChild(th6);
                tr.appendChild(th7);
                tr.appendChild(th8);
                tr.appendChild(th9);
                tr.appendChild(th10);
                tr.appendChild(th11);
                thead.appendChild(tr);
                table.appendChild(thead);
                table.appendChild(tbody);
                div.appendChild(table);
                doc.containerTableConsultInvoice.appendChild(h5);
                doc.containerTableConsultInvoice.appendChild(div);
              
            }
         let suma1=0   
         let suma2=0  
        for (const list of res) {
            if(rute=="http://localhost:4000/api/invoiceCancellation/"){
                const trd = document.createElement("tr");
                const td1 = document.createElement("td");
                const td2 = document.createElement("td");
                const td3 = document.createElement("td");
                const td4 = document.createElement("td");
                const td5 = document.createElement("td");
                const td6 = document.createElement("td");
                const td7 = document.createElement("td");
                const td8 = document.createElement("td");
                const td9 = document.createElement("td");
                const i1= document.createElement("i")              
                const btnWatch= document.createElement("button")
                btnWatch.className="btn btn-outline-success "
                i1.className="far fa-file";
                td1.textContent = `${list.cod_factura}`;
                td2.textContent =  `${list.placa}`;
                td3.textContent = `${list.idClientes}`;
                td4.textContent = `${list.nombre}`;
                td5.textContent = `${list.comentario}`;
                td6.textContent = formatterPeso.format(`${list.valor_bruto}`);
                td7.textContent = "ANULADA"
                td8.textContent = `${list.fecha.substr(0,10)}`;
                btnWatch.appendChild(i1) 
                td9.appendChild(btnWatch)
                trd.appendChild(td1);
                trd.appendChild(td2);
                trd.appendChild(td3);
                trd.appendChild(td4);
                trd.appendChild(td5);
                trd.appendChild(td6);
                trd.appendChild(td7);
                trd.appendChild(td8);
                trd.appendChild(td9);
                tbody.appendChild(trd);
              
                if(btnWatch){
                    btnWatch.addEventListener("click",()=>{
                        let url="http://localhost:4000/api/itemsInvoiceCancellation/"                  
                        CreateInvoice(doc,list,url)
                        doc.containerMain.style.display = "none"
                        doc.containerInfoClientPrintInvoice.style.display="block"
                    })
                }

            }else{
                const trd = document.createElement("tr");
                const td1 = document.createElement("td");
                const td2 = document.createElement("td");
                const td3 = document.createElement("td");
                const td4 = document.createElement("td");
                const td5 = document.createElement("td");
                const td6 = document.createElement("td");
                const td7 = document.createElement("td");
                const td8 = document.createElement("td");
                const td9 = document.createElement("td");
                const td10 = document.createElement("td");
                const td11 = document.createElement("td");
                const i1= document.createElement("i")
                const i2= document.createElement("i")
                const i3= document.createElement("i")
                const btnListPayment= document.createElement("button")
                const btnWatch= document.createElement("button")
                const btnpayment= document.createElement("button")
                btnListPayment.className="btn btn-outline-dark"
                btnpayment.className="btn btn-outline-info"
                btnWatch.className="btn btn-outline-success "
                i1.className="far fa-file";
                i2.className="fas fa-money-bill-wave";
                i3.className="fas fa-list-ol";
                td1.textContent = `${list.cod_factura}`;
                td2.textContent =  `${list.placa}`;
                td3.textContent = `${list.idClientes}`;
                td4.textContent = `${list.nombre}`;
                td5.textContent = `${list.t_pago}`;
                td6.textContent = formatterPeso.format(`${list.valor_bruto}`);
                td7.textContent = formatterPeso.format(`${list.abono}`);
                td8.textContent = `${list.fecha.substr(0,10)}`;
                list.abono==list.valor_bruto?btnpayment.disabled=true:btnpayment.disabled=false
                list.t_pago=="contado"?btnListPayment.disabled=true:btnListPayment.disabled=false
                btnWatch.appendChild(i1) 
                btnpayment.appendChild(i2)
                btnListPayment.appendChild(i3)
                td9.appendChild(btnWatch)
                td10.appendChild(btnpayment)
                td11.appendChild(btnListPayment)
                trd.appendChild(td1);
                trd.appendChild(td2);
                trd.appendChild(td3);
                trd.appendChild(td4);
                trd.appendChild(td5);
                trd.appendChild(td6);
                trd.appendChild(td7);
                trd.appendChild(td8);
                trd.appendChild(td9);
                trd.appendChild(td10);
                trd.appendChild(td11);
                tbody.appendChild(trd);
                suma1=suma1+list.valor_bruto
                suma2=suma2+list.abono
           
                if(btnListPayment){
                    btnListPayment.addEventListener("click",()=>{
                        doc.listPayment.style.display="block"
                        CreatelistPaymentTable(doc,list)
                    })
                }
                if(btnpayment){
                    btnpayment.addEventListener("click",()=>{
                        paymentTonInvoice(doc,list)
                    })
                }
                if(btnWatch){
                    btnWatch.addEventListener("click",()=>{
                        let url="http://localhost:4000/api/itemInvoice/"
                        // if(rute==){
                        //    url="http://localhost:4000/api/itemsInvoiceCancellation/";
                        // }else {url="http://localhost:4000/api/itemInvoice/"}                   
                        CreateInvoice(doc,list,url)
                        doc.containerMain.style.display = "none"
                        doc.containerInfoClientPrintInvoice.style.display="block"
                    })
                }
            }           
        }
        const p=document.createElement("p")
        const p2=document.createElement("p")
        const p3=document.createElement("p")
        p.textContent=`FACTURADO. ${formatterPeso.format(suma1)} `
        p2.textContent=`ABONOS. ${formatterPeso.format(suma2)} `
        p3.textContent=`SALDO. ${formatterPeso.format(suma1-suma2)} `
        const trdTotal=document.createElement("tr")
        const tdTotal1=document.createElement("td")
        const tdTotal2=document.createElement("td")
        const tdTotal3=document.createElement("td")
        const tdTotal4=document.createElement("td")
        const tdTotal5=document.createElement("td")
        const tdTotal6=document.createElement("td")
        const tdTotal7=document.createElement("td")
        const tdTotal8=document.createElement("td")
        const tdTotal9=document.createElement("td")
        const tdTotal10=document.createElement("td")
        const tdTotal11=document.createElement("td")
        // const stTex=document.createElement("strong")
        // const stSum=document.createElement("strong")
        // const stSum2=document.createElement("strong")
        // stTex.textContent=`TOTALES: `
        // stSum.textContent=formatterPeso.format(`${suma1}`);
        // stSum2.textContent=formatterPeso.format(`${suma2}`);
        tdTotal6.appendChild(p)
        tdTotal7.appendChild(p2)
        tdTotal9.appendChild(p3)
        trdTotal.appendChild(tdTotal1)
        trdTotal.appendChild(tdTotal2)
        trdTotal.appendChild(tdTotal3)
        trdTotal.appendChild(tdTotal4)
        trdTotal.appendChild(tdTotal5)
        trdTotal.appendChild(tdTotal6)
        trdTotal.appendChild(tdTotal7)
        trdTotal.appendChild(tdTotal8)
        trdTotal.appendChild(tdTotal9)
        trdTotal.appendChild(tdTotal10)
        trdTotal.appendChild(tdTotal11)
        tbody.appendChild(trdTotal)     
    } catch (error) { console.log(error)      
    }
}

const CreateInvoice = (doc, list, url) => {
    let dataItemsInvoice=[]
    let InfoClient = `
    <div class="col-md-12">
    <div class="tile">
    <section class="invoice">
    <div class="row mb-4">
    <div class="col-6">
    <h2 class="page-header"> <img src="../source/images/logo.png" alt="" style="height:110px; width:250px;"></h2>
    </div>
    <div class="col-6">
    <h5 class="text-right">Fecha: ${list.fecha.substr(0,10)} </h5>
    <h6 id="text_anulation"class="text-right"></h6>
    </div>
    </div>
    <div class="row invoice-info" >
    <div class="col-4">
    <address><strong>Lubriservicios San Jose</strong><br>Nit: 73.571.231-1 <br>Regimen Simplificado<br>Dir: San jose de los campanos Cra100 No 33A-60<br>Tel: 6664384<br>Cel: 3008801069<br>Email: lubriserviciosanjose@gmail.com</address>
    </div>
    <div class="col-5" >
    <address><strong>Cliente</strong><br>Id: ${list.idClientes}<br>Nombre: ${list.nombre}<br>Dir: ${list.Direccion}<br>Tel: ${list.celular}</address>
    </div>
    <div class="col-3" ><b>Factura # ${list.cod_factura}</b><br>Orden ID: 00${list.cod_factura}<br>Factura ${list.t_pago}<br>Placa: ${list.placa} <br>Km: ${list.km} </div>
    </div>
    <div class="row">
    <div class="col-12 table-responsive">
    <table class="table table-striped">
    <thead >
    <tr>
    <th>Cod</th>
    <th>Description</th>
    <th>Marca</th>
    <th>Ref</th>
    <th>Cantidad</th>
    <th>V. Unitario</th>
    <th>Subtotal</th>
    </tr>
    </thead>
    <tbody id="items__print-invoice">
    </tbody>
    </table>
    <div class="mb-3 line-head"> </div>
    <div class="col-3 mb-3 line-head" ><b>SUBTOTAL. ${ formatterPeso.format(list.valor_bruto)}</b> </div>
    <div class="col-3 mb-3 line-head" ><b>IVA. ${ formatterPeso.format(0)}</b> </div>
    <div class="col-3" ><b>TOTAL. ${ formatterPeso.format(list.valor_bruto)}</b> </div>
    <div class="mb-3 line-head"> </div>
    </div>
    </div>
    <div class="row d-print-none mt-2" style="display:flex">
    <div class="col-12 text-right" id="container__btn-invoice">
    <a id="btn_print" class="btn btn-primary" href="javascript:window.print();"><i class="fa fa-print"></i> </a>
    <a class="btn btn-secondary" id="btn__return-ToConsutInvoice" href="#"><i class="fas fa-undo-alt"></i> </a>
    </div>
    </div>
    </section>
    </div>
    </div>`; 
   
    doc.containerInfoClientPrintInvoice.innerHTML = InfoClient
    let rows=0
    const table=document.getElementById("items__print-invoice")    
    consultData(url).then(resp=>{ 
        for (let position of resp) {          
            if(position.factura_codFactura==list.cod_factura) {
                rows=rows+1
                dataItemsInvoice.push(position)
                let item= `
                <tr>
                <td>${position.cod_item}</td>
                <td>${position.descripcion}</td>
                <td>${position.marca}</td>
                <td>${position.referencia}</td>
                <td>${position.cantidad}</td>
                <td>${formatterPeso.format(position.valor_unitario)}</td>
                <td>${formatterPeso.format(position.valor_total)}</td>
                </tr> `
                table.innerHTML +=item
            }            
        }
        let totalRows=20-rows
        for(let i=1; i<=totalRows; i++ ){
            let item= `<br> `
            table.innerHTML +=item
        }     
      
    })

    if(url!="http://localhost:4000/api/itemsInvoiceCancellation/"){
        if(list.fecha.substr(0,10)==dateNow()){
            let container=document.getElementById("container__btn-invoice");
            let botton=` <a class="btn btn-danger" id="btn__cancel-Invoice" href="#"><i class="fa fa-fw fa-lg fa-times-circle"> </i> </a>`
            container.innerHTML+=botton
            const btnCancelInvoice =document.getElementById("btn__cancel-Invoice")
            if(doc.btnCancelAnnulmentInvoice){doc.btnCancelAnnulmentInvoice.addEventListener("click", ()=>{
                 doc.cancelAnnulment.style.display="none"
                 doc.comentary.value=""
                })  
            }
            if(btnCancelInvoice){
                btnCancelInvoice.addEventListener("click", ()=>{
                    swal({
                        title: "Anular Factura # " + list.cod_factura,
                        text: "Esta seguro de anular esta factura?",
                        icon: "info",
                        buttons: true,
                    }).then((willAnull) => {
                        if (willAnull) {
                            doc.cancelAnnulment.style.display="block"
                            doc.comentary.addEventListener("keyup",()=>{
                                validateDescrip(doc.comentary.value)? doc.comentary.classList.remove("is-invalid") : doc.comentary.classList.add("is-invalid")
                            })
                            doc.btnAnnulmentInvoice.addEventListener("click",()=>{
                                if(validateDescrip(doc.comentary.value  )&& doc.comentary.value !=""){
                                    swal({
                                        title: "¡seguro!",
                                        text: "Desea continuar ? ",
                                        icon: "info",
                                        buttons: true,
                                    }).then((willAnull)=>{
                                        if(willAnull){ 
                                            //init function nullify of invoice
                                            const data={cod:list.cod_factura}
                                            //moved the data of table invoice to table invoice cancellation
                                            insert(data,"http://localhost:4000/api/invoiceCancellation/").then(res=>{
                                                if(res.status== 'Moved'){
                                                    // console.log(res.status)
                                                    const dataItems={cod:list.cod_factura}
                                                    insert(dataItems,"http://localhost:4000/api/itemsInvoiceCancellation/").then(respo=>{
                                                        if(respo.status== 'moved'){
                                                            for( const travelsTItem of  dataItemsInvoice){
                                                                if(travelsTItem.t_item=="product"){
                                                                    consultData("http:localhost:4000/api/product/"+travelsTItem.cod_item).then(responseProducts=>{
                                                                        console.log(responseProducts)
                                                                        console.log(travelsTItem.cod_item)
                                                                        let dataProducts=responseProducts
                                                                        dataProducts.Cantidad=parseInt(dataProducts.Cantidad)+parseInt(travelsTItem.cantidad)                                      
                                                                        edit(dataProducts,"http:localhost:4000/api/product/"+travelsTItem.cod_item)
                                                                    })
                                                                }
                                                            }            
                                                            deleted("http://localhost:4000/api/servicesByEmploye/"+list.cod_factura).then(respuesta=>console.log(respuesta))  
                                                            deleted("http://localhost:4000/api/invoice/"+list.cod_factura).then(respuesta=>console.log(respuesta))   
                                                            deleted("http://localhost:4000/api/itemInvoice/"+list.cod_factura).then(respuesta=>console.log(respuesta))  
                                                            swal("Se anulo la factura "+list.cod_factura+" satisfactoriamente", { icon: "success", }) .then((willOk)=>{if(willOk){location.reload()}})                                                                                                          
                                                        }else{swal("Ocurrio un error inesperado", { icon: "error", })}
                                                    })
                                                   
                                                    edit({comentario:doc.comentary.value},"http://localhost:4000/api/invoiceCancellation/"+list.cod_factura)
                                                }else{swal("Ocurrio un error inesperado", { icon: "error", })}
                                            })
                                        }
                                    })
                                }else{swal("El comentario ingresado no es invalido.", { icon: "error", });
                            }
                        }) 
                    }})
                })
            }  
        } 
    }else{
        const btnPrint=document.getElementById("btn_print")
        const text=document.getElementById("text_anulation")
        btnPrint.style.display="none" 
        text.textContent="FACTURA ANULADA"
    }

    const btnReturn=document.getElementById("btn__return-ToConsutInvoice")
    if(btnReturn){btnReturn.addEventListener("click", ()=>{
        doc.containerInfoClientPrintInvoice.style.display="none"
        doc.containerMain.style.display = "block"
       
    })}
}


const paymentTonInvoice=(doc,list)=>{
    const balance=list.valor_bruto-list.abono
    doc.textTitlePaymentToInvoice.textContent="Abonos de factura "+list.cod_factura
    doc.labelMissingBalance.textContent="Saldo: "+ formatterPeso.format(balance)
    doc.PaymentToInvoice.style.display="block"
    if(doc.btnPaymentToInvoice){
        doc.btnPaymentToInvoice.addEventListener("click", ()=>{
            if(validatePrice(doc.intoPaymentToInvoice.value)&& doc.intoPaymentToInvoice.value<=balance){
                swal({
                    title: "Abono "+formatterPeso.format(doc.intoPaymentToInvoice.value), 
                    text: "Factura:"+list.cod_factura+"\nDesea realizar el abono a esta factura?",
                    icon: "info",
                    buttons: true,
                }).then((willPay)=>{
                    if(willPay){ 
                        const data={
                            payment:doc.intoPaymentToInvoice.value,
                            date:dateNow(),
                            cod:list.cod_factura
                        }
                        insert(data,"http://localhost:4000/api/payment/").then(re=>{
                            if(re.status=='Create'){
                                consultData("http://localhost:4000/api/invoice/"+list.cod_factura).then(resp=>{
                                    for(const travel of resp){
                                        if(travel.cod_factura==list.cod_factura){
                                            travel.abono=parseInt(travel.abono)+parseInt(doc.intoPaymentToInvoice.value)
                                            let abono=travel.abono
                                            let tPay=travel.t_pago
                                            // console.log(abono)
                                            // console.log(travel.valor_bruto)
                                            if(abono===list.valor_bruto){
                                                // console.log(abono)
                                                tPay="cancelada"
                                            }else{ tPay="credito"}
                                            console.log(tPay)
                                            edit({abono, tPay},"http://localhost:4000/api/invoice/"+list.cod_factura).then(responseUPDATE=>{
                                                if(responseUPDATE.status=='Updated'){    
                                                    swal("Abonos de factura # "+list.cod_factura+" existosa", { icon: "success"} ).then((willOk)=>{
                                                        if(willOk){
                                                            // location.reload()
                                                            consultAccountsReceivable(doc)
                                                            doc.PaymentToInvoice.style.display="none"
                                                            doc.intoPaymentToInvoice.value=""
                                                            doc.containerNewInvoice.style.display = "none";
                                                            doc.containerConsultInvoice.style.display = "block";
                                                          
                                                        }})
                                                                                
                                                }else{swal("No se pudo realizar la operacion", { icon: "error", })}
                                            })
                                        }
                                    }   
                                })
                            }else{swal("No se pudo realizar la operacion", { icon: "error", })}
                        })
                    }
                })
            }else{swal("Debe ingresar un valor valido y menor o igual al saldo", { icon: "error", })  }
        })
    }
    if(doc.btnCancelPaymentToInvoice){
        doc.btnCancelPaymentToInvoice.addEventListener("click",()=>{
            doc.PaymentToInvoice.style.display="none"
            doc.intoPaymentToInvoice.value=""
        })
    }
    if (doc.intoPaymentToInvoice) {
        doc.intoPaymentToInvoice.addEventListener("keyup", () => {
          validatePrice(doc.intoPaymentToInvoice.value) ? doc.intoPaymentToInvoice.classList.remove("is-invalid") : doc.intoPaymentToInvoice.classList.add("is-invalid")
        })
      }
}


const CreatelistPaymentTable=(doc,list)=>{
    consultData("http://localhost:4000/api/payment/"+list.cod_factura).then(resp=>{
        try {
        const div = document.createElement("div");
        const h5 = document.createElement("h5");
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const btnClose=document.createElement("button")
        const i=document.createElement("i")
        i.className="fa fa-fw fa-lg fa-times-circle"
        btnClose.className="btn btn-secondary"
        btnClose.textContent="Cerrar"
        div.className = "table-responsive";
        h5.textContent = "Abonos a la factra #"+ list.cod_factura;
        table.className = "table table-striped ";
        thead.style = "background:rgb(182, 184, 183);";
        const tbody = document.createElement("tbody");
        const tr = document.createElement("tr");
        const th1 = document.createElement("th");
        const th2 = document.createElement("th");
        const th3 = document.createElement("th");
        th1.textContent = "FACTURA";
        th2.textContent = "ABONO";
        th3.textContent = "FECHA";
        btnClose.appendChild(i)
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        thead.appendChild(tr);
        table.appendChild(thead);
        table.appendChild(tbody);
        div.appendChild(table);
        doc.containerListPayment.appendChild(div);
        doc.containerListPayment.appendChild(btnClose);
        btnClose.addEventListener("click",()=>{
            doc.listPayment.style.display="none"
            dropChildOfTable(doc.containerListPayment)
        })
        th1.textContent = "COD";
        for (const travel of resp) {
            const trd = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
                td1.textContent = travel.factura_codFactura;
                td2.textContent =  formatterPeso.format(`${travel.abonado}`);
                td3.textContent = travel.fecha.substr(0,10);
                trd.appendChild(td1);
                trd.appendChild(td2);
                trd.appendChild(td3);
                tbody.appendChild(trd);  
        }    
        } catch (error) {
            
        }    
    })
}
     