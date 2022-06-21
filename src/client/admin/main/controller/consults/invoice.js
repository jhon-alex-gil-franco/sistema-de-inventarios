import { consultData, deleted, edit, insert } from "../../helpers/functions.js"
import { dateNow, dropChildOfTable } from "../../helpers/helpers.js"
import { formatterPeso, mesajeNoFundData,seachFail } from "../../helpers/messages.js"
import { validateDate,  validatePrice, validateAmount } from "../../helpers/regularExpresions.js"
import{url}from "../../helpers/global.js";
import { componetSelectOptions } from "../../component/componentSelect.js";

let dataProducts =[]
let listItemsInvoice=[]
let  forItemInvoice={}
let codFactura=0
let user=""
  

 export const  consultAnullInvoice=(doc)=>{
    consultData(`${url}invoice/1`).then((resp) => 
    {
        let listInvoce=[]
        for(const list of resp){
            if(list.estado=="anulada")
                listInvoce.push(list)
        }
     dropChildOfTable(doc.containerTableConsultInvoice) 
     createTableConsult(doc, listInvoce) 
    })

 }
export  const consultAllInvoice=(doc)=>
{
    consultData(`${url}invoice/1`).then((resp) => 
    {
        let listInvoce=[]
        for(const list of resp){
            if(list.estado!="anulada")
                listInvoce.push(list)
        }
     dropChildOfTable(doc.containerTableConsultInvoice) 
     createTableConsult(doc, listInvoce) 
    })
}

export const  consultInvoice=(doc)=>{
    if(doc.inputSeach){doc.inputSeach.addEventListener('keyup',(e)=>{consultOnEvents()})}
    if(doc.date1){doc.date1.addEventListener('keyup',(e)=>{consultOnEvents()})}  
    if(doc.date2){doc.date2.addEventListener('keyup',(e)=>{consultOnEvents()})}   
    
    const consultOnEvents=()=>
    {
        dropChildOfTable (doc.containerTableConsultInvoice) 
        let dir=""

        if(validateDate(doc.date1.value)&&doc.date2.value==""){dir=`${url}invoice/${doc.date1.value}/${doc.date1.value}`
        } if(validateDate(doc.date2.value)&&validateDate(doc.date1.value)){dir=`${url}invoice/${doc.date1.value}/${doc.date2.value}`
          } if(doc.date1.value===""){dir=`${url}invoice/1`}

        if(doc.inputSeach.value==="")
        {
            consultData(dir).then((response) =>
            {
                console.log(response)
                let resp=[]
                for(const list of response){
                    if(list.estado!="anulada")
                        resp.push(list)
                }
                if(resp==undefined || resp=="Void"|| resp.length==0){
                    dropChildOfTable(doc.containerTableConsultInvoice) 
                    mesajeNoFundData(doc.containerTableConsultInvoice);
                }else{
                        dropChildOfTable(doc.containerTableConsultInvoice) 
                        createTableConsult(doc, resp) 
                }    
            });                
        }else{
                dropChildOfTable(doc.containerTableConsultInvoice) 
                consultData(dir).then((response) => {
                    let resp=[]
                    for(const list of response){
                        if(list.estado!="anulada")
                            resp.push(list)
                    }
                    consultByFilter(doc, resp)
                }); 
        }      
    }       


    const  consultByFilter=(doc,  resp)=>
    {
        switch (doc.selectCategory.value) 
        {
            case "idClient":dataForIdClient(doc, resp);break
            case "name":dataForName(doc, resp);break
            case "cod":dataForCod(doc,resp);break
            case "payment":dataForTPay(doc,resp);break
        }
    }

    const dataForName=(doc, resp)=>
    {
        try {
                const listName = []
                const foundName = resp.map((data) => {if(data.Nombre.includes(doc.inputSeach.value.toUpperCase())) { listName.push(data) }})
                listName.length > 0 ? createTableConsult(doc,  listName) : mesajeNoFundData(doc.containerTableConsultInvoice);
            } catch (error) {}
    }

    const dataForIdClient=(doc, resp)=>
    {
        try {
               const listIdClient = []
               const foundIdClient = resp.map(data => { if (data.idClientes.includes(doc.inputSeach.value)) { listIdClient.push(data) } })
               listIdClient.length > 0 ? createTableConsult(doc,  listIdClient) : mesajeNoFundData(doc.containerTableConsultInvoice); 
            } catch (error) {}
    }

    const dataForCod=(doc, resp)=>
    {
        try {
                const listCod = []
                const foundCod = resp.map(data => {if (data.cod_factura==doc.inputSeach.value) { listCod.push(data) } })
                listCod.length > 0 ? createTableConsult(doc,  listCod) : mesajeNoFundData(doc.containerTableConsultInvoice); 
            } catch (error) {}     
    }

    const dataForTPay=(doc, resp)=>
    {
        try {
                const listTP = []
                const foundTP = resp.map(data => {if (data.t_pago.includes(doc.inputSeach.value)) { listTP.push(data) } })
                listTP.length > 0 ? createTableConsult(doc,  listTP) : mesajeNoFundData(doc.containerTableConsultInvoice);  
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
        h5.textContent = "Facturas";
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
        const th7 = document.createElement("th");
        const th8 = document.createElement("th");
        const th9 = document.createElement("th");
        const th10 = document.createElement("th");
        const th11 = document.createElement("th");
        const th12 = document.createElement("th");
        th1.textContent = "Cod";
        th2.textContent = "Client";
        th3.textContent = "Nombre";
        th4.textContent = "Estado";
        th5.textContent = "Valor";
        th6.textContent = "Abonado";
        th7.textContent = "Fecha";
        th8.textContent = "Ver";
        th9.textContent = "Abonar";
        th10.textContent = "Abonos";
        th11.textContent = "Edit";
        th12.textContent = "Anular";
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
        tr.appendChild(th12);
        thead.appendChild(tr);
        table.appendChild(thead);
        table.appendChild(tbody);
        div.appendChild(table);
        doc.containerTableConsultInvoice.appendChild(h5);
        doc.containerTableConsultInvoice.appendChild(div);
        for (const list of res) {
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
            const td12 = document.createElement("td");
            const i1= document.createElement("i")
            const i2= document.createElement("i")
            const i3= document.createElement("i")
            const i4= document.createElement("i")
            const i5= document.createElement("i")
            const btnListPayment= document.createElement("button")
            const btnWatch= document.createElement("button")
            const btnpayment= document.createElement("button")
            const btnEditInvoice= document.createElement("button")
            const btnAnullInvoice= document.createElement("button")
            btnListPayment.className="btn btn-dark btn-sm"
            btnpayment.className="btn btn-light btn-sm"
            btnWatch.className="btn btn-success btn-sm"
            btnEditInvoice.className="btn btn-info btn-sm"
            btnAnullInvoice.className="btn btn-danger btn-sm"
            i1.className="far fa-file";
            i2.className="fas fa-money-bill-wave";
            i3.className="fas fa-list-ol";
            i4.className="far fa-edit";
            i5.className="fa fa-fw fa-lg fa-times-circle";
            td1.textContent = `${list.cod_factura}`;
            td2.textContent =  `${list.idClientes}`;
            td3.textContent = `${list.nombre}`;
            td4.textContent = `${list.t_pago}`;
            td5.textContent = formatterPeso.format(`${list.valor}`);
            td6.textContent = formatterPeso.format(`${list.abono}`);
            td7.textContent = `${list.fecha.substr(0,10)}`;
            list.t_pago!="credito"?btnpayment.disabled=true:btnpayment.disabled=false
            list.t_pago!="contado" ?btnListPayment.disabled=false:btnListPayment.disabled=true
            if(list.estado=="anulada"){
                btnAnullInvoice.disabled=true
                btnpayment.disabled=true
                btnListPayment.disabled=true
                btnEditInvoice.disabled=true
                h5.textContent = "Facturas anuladas";
            }
            btnWatch.appendChild(i1) 
            btnpayment.appendChild(i2)
            btnListPayment.appendChild(i3)
            btnEditInvoice.appendChild(i4)
            btnAnullInvoice.appendChild(i5)
            td8.appendChild(btnWatch)
            td9.appendChild(btnpayment)
            td10.appendChild(btnListPayment)
            td11.appendChild(btnEditInvoice)
            td12.appendChild(btnAnullInvoice)
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
            trd.appendChild(td12);
            tbody.appendChild(trd);

            if(btnListPayment){
                btnListPayment.addEventListener("click",()=>{
                    doc.listPayment.style.display="block"
                    CreatelistPaymentTable(doc,list)
                })
            }
 
            if(btnWatch){
                btnWatch.addEventListener("click",()=>{
                    CreateInvoice(doc,list)
                    doc.containerMain.style.display = "none"
                    doc.containerInfoClientPrintInvoice.style.display="block"
                })
            }
            if(btnpayment){
                btnpayment.addEventListener("click",()=>{
                    paymentTonInvoice(doc,list)
                })
            }
            if(btnEditInvoice){
                btnEditInvoice.addEventListener("click",()=>{
                    doc.containerMain.style.display = "none"
                    editInvoice(doc,list)
                    doc.containerEditInvoice.style.display="block"
                })
            }

            if(btnAnullInvoice){
                btnAnullInvoice.addEventListener("click",()=>{
                    swal({
                        title: "Esta seguro",
                        text: "Desea anular esta factura? " ,
                        icon: "info",
                        buttons: true,
                  }).then((willDelete) => {
                        if(willDelete)
                        {
                            let data={}
                            edit(data,`${url}invoice/${list.cod_factura}/anulada`).then(responseUPDATE=>{
                                if(responseUPDATE.status=='Updated'){  
                             
                                    consultData(`${url}itemInvoice`)
                                    .then(resp=>{

                                        consultData(`${url}product`)
                                        .then(res=>{
                                            dataProducts=res

                                            for(const travelItems of resp){
                                                if(travelItems.factura_codFactura==list.cod_factura){

                                                    for(const travelProduct of dataProducts){
                                                        if(travelItems.producto_CodProducto==travelProduct.CodProducto){                                                                    
                                                           travelProduct.Cantidad=travelProduct.Cantidad+travelItems.cantidad 
                                                        }
                                                    } 

                                                    dataProducts.forEach((element) =>{ edit(element,`${url}product/${element.CodProducto}`); })                                                                                                                                                          
                                                }  
                                            }

                                        })
                                        
                                    })  
                                    consultAnullInvoice(doc)
                                    dataProducts=[]                                
                                    swal("Se anulo la factura "+list.cod_factura+" de manera existosa", { icon: "success", })
                                }
                            })
                        }
                    })
                })
            }
        }
    } catch (error) {  mesajeNoFundData(doc.containerTableConsultInvoice);     
    }
}

const CreateInvoice = (doc, list) => {
    let dataItemsInvoice=[]
    let InfoClient = `
    <div class="col-md-12">
    <div class="tile">
    <section class="invoice">
    <div class="row mb-4">
    <div class="col-6">
    </div>
    <div class="col-6">
    <h5 class="text-right">Fecha: ${list.fecha.substr(0,10)} </h5>
    </div>
    </div>
    <div class="row invoice-info" >
    <div class="col-4">
    <address><strong>SISTEMA DE VENTAS</strong><br>
    </div>
    <div class="col-5" >
    <address><strong>Cliente</strong><br>Id: ${list.idClientes}<br>Nombre: ${list.nombre}<br>Dir: ${list.Direccion}<br>Tel: ${list.celular}</address>
    </div>
    <div class="col-3" ><b>Factura: ${list.cod_factura}</b><br>Vendedor: ${list.username}<br>Factura ${list.t_pago}<br> Estado ${list.estado}</div>
    </div>
    <div class="row">
    <div class="col-12 table-responsive">
    <table class="table table-striped">
    <thead >
    <tr>
    <th>Descripcion</th>
    <th>Cantidad</th>
    <th>Referencia</th>
    <th>Marca</th>
    <th>V. Unitario</th>
    <th>Subtotal</th>
    </tr>
    </thead>
    <tbody id="items__print-invoice">
    </tbody>
    </table>
    <div class="col-3" ><b>TOTAL. ${ formatterPeso.format(list.valor)}</b> </div>
    </div>
    </div>
    <div class="row d-print-none mt-2" style="display:flex">
    <div class="col-12 text-right" id="container__btn-invoice">
    <a class="btn btn-primary" href="javascript:window.print();"><i class="fa fa-print"></i> </a>
    <a class="btn btn-secondary" id="btn__return-ToConsutInvoice" href="#"><i class="fas fa-undo-alt"></i> </a>
    </div>
    </div>
    </div>
    </section>
    </div>
    </div>`; 
   
    doc.containerInfoClientPrintInvoice.innerHTML = InfoClient
   
    const table=document.getElementById("items__print-invoice")    
    consultData(`${url}itemInvoice/`).then(resp=>{ 
        for (let position of resp) {          
            if(position.factura_codFactura==list.cod_factura) {
                dataItemsInvoice.push(position)
                let item= `
                <tr>
                <td>${position.descripcion}</td>
                <td>${position.cantidad}</td>
                <td>${position.referencia}</td>
                <td>${position.marca}</td>
                <td>${formatterPeso.format(position.valor_unitario)}</td>
                <td>${formatterPeso.format(position.valor_total)}</td>
                </tr> `
                table.innerHTML +=item
              
            }            
        }
    })
    const btnReturn=document.getElementById("btn__return-ToConsutInvoice")
    if(btnReturn){btnReturn.addEventListener("click", ()=>{
        doc.containerMain.style.display = "block"
        doc.containerInfoClientPrintInvoice.style.display="none"
    })}
}

const paymentTonInvoice=(doc,list)=>{
    const balance=list.valor-list.abono
    doc.textTitlePaymentToInvoice.textContent="Abono de factura-"+list.cod_factura
    doc.labelMissingBalance.textContent="Saldo: "+ formatterPeso.format(balance)
    doc.PaymentToInvoice.style.display="block"
    if(doc.btnPaymentToInvoice){
        doc.btnPaymentToInvoice.addEventListener("click", ()=>{
            if(validatePrice(doc.intoPaymentToInvoice.value)&& doc.intoPaymentToInvoice.value<=balance){
                swal({
                    title: "Seguro",
                    text: "Desea continuar con el proceso?",
                    icon: "info",
                    buttons: true,
                }).then((willInsert)=>{
                    if(willInsert){ 
                        const data={
                            payment:doc.intoPaymentToInvoice.value,
                            date:dateNow(),
                            cod:list.cod_factura,
                            user:sessionStorage.getItem("id")
                        }
                        insert(data,`${url}payment/`).then(re=>{
                            if(re.status=='Create'){
                                consultData(`${url}invoice/${list.cod_factura}`).then(resp=>{
                                    console.log(resp)
                                    for(const travel of resp){
                                        if(travel.cod_factura==list.cod_factura){
                                            travel.abono=parseInt(travel.abono)+parseInt(doc.intoPaymentToInvoice.value)
                                            const abono=travel.abono
                                            let t_pago=travel.t_pago
                                            abono==travel.valor?t_pago="cancelada":t_pago=travel.t_pago
                                            const data={
                                                t_pago,
                                                valor:list.valor,
                                                abono,
                                                fecha:list.fecha.substr(0,10)
                                            }
                                            edit(data,`${url}invoice/${list.cod_factura}`).then(responseUPDATE=>{
                                                if(responseUPDATE.status=='Updated'){    
                                                    swal("Abonos de factura # "+list.cod_factura+" existosa", { icon: "success", })
                                                    .then((isSucces)=>{
                                                        if(isSucces){
                                                            consultAllInvoice(doc)
                                                            doc.PaymentToInvoice.style.display="none"
                                                            doc.intoPaymentToInvoice.value="" 
                                                        }
                                                    })                                              
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
    if(doc.btnCancelPaymentToInvoice)
    {   doc.btnCancelPaymentToInvoice.addEventListener("click",()=>{
                doc.PaymentToInvoice.style.display="none"
                doc.intoPaymentToInvoice.value=""
        })
    }
    if (doc.intoPaymentToInvoice) 
    {
        doc.intoPaymentToInvoice.addEventListener("keyup", () => {
            validatePrice(doc.intoPaymentToInvoice.value) ? doc.intoPaymentToInvoice.classList.remove("is-invalid") : doc.intoPaymentToInvoice.classList.add("is-invalid")
        })
    }
}


const CreatelistPaymentTable=(doc,list)=>{
    consultData(`${url}payment/${list.cod_factura}`).then(resp=>{
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
        const tbody = document.createElement("tbody");
        const tr = document.createElement("tr");
        const th1 = document.createElement("th");
        const th2 = document.createElement("th");
        const th3 = document.createElement("th");
        const th4 = document.createElement("th");
        th1.textContent = "FACTURA";
        th2.textContent = "ABONO";
        th3.textContent = "FECHA";
        th3.textContent = "USER";
        btnClose.appendChild(i)
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        tr.appendChild(th4);
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
        for (const travel of resp) {
            const trd = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            const td4 = document.createElement("td");
                td1.textContent = travel.factura_codFactura;
                td2.textContent =  formatterPeso.format(`${travel.abonado}`);
                td3.textContent = travel.fecha.substr(0,10);
                td3.textContent = travel.username
                trd.appendChild(td1);
                trd.appendChild(td2);
                trd.appendChild(td3);
                trd.appendChild(td4);
                tbody.appendChild(trd);  
        }  
        } catch (error) {}    
    })
}


let cod_item=0
let totalInvoiceBruto=0
const editInvoice=(doc, list)=>{
    consultData(`${url}product/`)
    .then(resp=>{dataProducts=resp;componetSelectOptions(concep, dataProducts, 'NombreProducto','CodProducto',3)})
    let editInvoice=`
    <div class="tile">
    <form >
    <div style="display flex">
    <p > <strong>Fecha: ${list.fecha.substr(0,10)}</strong></p>
    <h5 >Cod: ${list.cod_factura}</h5>
    </div>
    <div class="col-md-12 mr-2 mb-3" style="display: flex;flex-wrap: wrap;">
    <div class="col-md-3 ">
    <input class="form-control" type="text" maxlength="15" placeholder=${list.idClientes}  id="idClient__editInvoice" disabled>
    </div>
    <div class="col-md-4"><input id="client__editInvoice" type="text" class="form-control" placeholder=${list.nombre}  disabled></div>
    <div class=" col-md-2 " id=" ">
    <div ><input  type="text" class="form-control" placeholder=${list.t_pago}  disabled></div>
    </div>
    <div  class=" col-md-3 "><input id="date_edit-invoice"  type="date" class="form-control"></div>
    </div>
    <div>
    <div class="col-md-12 mr-2 mb-3" style=" display: flex; flex-wrap: wrap;">
    <div class="col-md-8 " id="product__edit-Invoince">
    <select class="form-control "  id="concep__forItem-editInvoice">
    <option value="null" disabled selected>Productos</option>
    </select>
    </div>
    <div class="col-md-1 " id="container__input-cantProductInvoince">
    <input id="cant__editInvoice" name="precio" class="form-control" type="number"
    placeholder="1" min=1 max=99 data-toggle="tooltip" data-placement="bottom"
    data-title="cantidad">
    </div>
    <div id="container_price-service" class="col-md-2" style="display: flex; ">
    <input id="price-of__editItemInvoice" name="precio" class="number  form-control"
    type="number" placeholder="$ 00" min="100" max="9999999">
    </div>
    <div class="col-md-1 ">
    <button id="add__item-editInvoice" class="btn btn-success " type="button"><i
    class="fas fa-plus"></i></button>
    </div>
    </div>
    <div id="message-regEditItem" class="message-reg alert alert-danger mt-3" role="alert"></div>
    </div>
    </form>
    <div  class="table-responsive" >
    <table class="table table-striped ">
    <thead style="background:rgb(182, 184, 183);">
    <tr>
    <th>Descripcion</th>
    <th>Cantidad</th>
    <th>Referencia</th>
    <th>Marca</th>
    <th>Valor</th>
    <th>Subtotal</th>
    <th>Quitar</th>
    </tr>
    </thead>
    <tbody id="table__items-editInvoice">
    </tbody>
    </table>
    <div style="display: flex;">
    <div style="display: flex; margin-left: 1rem;"><strong>Total:</strong>
    <p id="text__total"></p>
    </div>
    </div>
    </div>  
    <div class="tile-footer">
    <button id="edit-Invoice" class="btn btn-info btn-sm" type="button" ><i
    class="far fa-edit">
    </i> Editar </button>&nbsp;&nbsp;&nbsp;<a class="btn btn-secondary btn-sm"
    id="cancel__edit-Invoice" href="#"><i
    class="fa fa-fw fa-lg fa-times-circle"></i>Cancel</a>
    </div>
    </div>
    </div>`
   doc.containerEditInvoice.innerHTML= editInvoice
   const table=document.getElementById("table__items-editInvoice")
   const btnEditInvoice=document.getElementById("edit-Invoice")
   const btnCancelEditInvoice=document.getElementById("cancel__edit-Invoice")
   const btnAddItemInvoice=document.getElementById("add__item-editInvoice")
   const concep=document.getElementById("concep__forItem-editInvoice")
   const amount=document.getElementById("cant__editInvoice")
   const price=document.getElementById("price-of__editItemInvoice")
   const alert=document.getElementById("message-regEditItem")
   const date=document.getElementById("date_edit-invoice")
   const documen={alert,table}

if (price) {price.addEventListener("keyup", () => {validatePrice(price.value) ? price.classList.remove("is-invalid") : price.classList.add("is-invalid")})}
if (amount) {amount.addEventListener("keyup", () => {validateAmount(amount.value) ? amount.classList.remove("is-invalid") : amount.classList.add("is-invalid")})}
  
   consultData(`${url}itemInvoice/`).then(resp=>{ 
       for (let position of resp) {          
           if(position.factura_codFactura==list.cod_factura) {
               codFactura= position.factura_codFactura
               user=position.vendedor
                createTdTable( 
                   position.producto_CodProducto,
                   position.descripcion,
                   position.referencia,
                   position.marca,
                   position.cantidad,
                   position.valor_unitario, 
                   position.valor_compra,
                   position.valor_total,
                   position.vendedor,
                   position.factura_codFactura,
                   position.categoria,
                   table
                )
            }            
        }
    })
    if (btnAddItemInvoice) {
        btnAddItemInvoice.addEventListener("click", () => { 
            let marca, referencia,cantidad,valor_unitario,descripcion,valor_total, categoria, codProduct, priceBuy;
            let valuePrice=false; let  stock=false;
            amount.value==""||amount.value<=0?cantidad=1:cantidad=amount.value
            

            for (const list of dataProducts) {
                if(list.CodProducto == concep.value){
                    codProduct=list.CodProducto
                   descripcion= list.NombreProducto
                   referencia=list.Referencia
                   marca=list.Marca
                   categoria=list.Categoria
                   priceBuy=list.Precio
                   if(price.value>list.Precio){
                      valor_unitario=parseFloat( price.value)
                      valuePrice=true
                   }else{valuePrice=false}
                   if (cantidad <= list.Cantidad) {
                       stock = true
                       valor_total=cantidad*valor_unitario  
                       if(list.Min>=list.Cantidad)swal(`Quedan ${list.Cantidad-cantidad} unidades de ${list.NombreProducto} - ${list.Referencia}!`, { icon: "info" });
                    }else{stock = false }        
                }
            }
            //validation of item
            if (concep.value != "null" && cantidad > 0 && stock == true &&  valuePrice==true
                && validateAmount(cantidad)&& validatePrice(valor_unitario)
               )
            {
                
                for (const list of dataProducts){ if (list.CodProducto == concep.value) {list.Cantidad = list.Cantidad - cantidad}; }
                createTdTable( codProduct,descripcion,referencia,marca,cantidad, valor_unitario,priceBuy,valor_total,user,codFactura,categoria, table)
                concep.value="null"; amount.value=""; price.value="";
            } else {if(stock==false)seachFail(documen, "No hay cantidad suficientes en stock")
                     if(concep.value == "null" || price=="")seachFail(documen, "Verifique la informacion ingresada")
                      if(valuePrice==false)seachFail(documen, "El valor del producto debe ser mayor al precio de compra")
           }
        })
    }
    if(btnCancelEditInvoice){btnCancelEditInvoice.addEventListener("click",()=>{
        consultAllInvoice(doc)
        listItemsInvoice=[];forItemInvoice={}; cod_item=0; totalInvoiceBruto=0;
        doc.containerEditInvoice.style.display="none"
        doc.containerMain.style.display = "block"
        
    })}
    if(btnEditInvoice){
        btnEditInvoice.addEventListener("click",()=>{
            let newDate=""
            if(date.value=="")newDate=list.fecha.substr(0,10)
            else{
                if(validateDate(date.value))newDate=date.value
                else{newDate=list.fecha.substr(0,10)}}
                if(listItemsInvoice.length>0){ 
                    swal({
                        title: "Seguro",
                        text: "Desea continuar?",
                        icon: "info",
                        buttons: true,
                    }).then((willEdit)=>{
                        if(willEdit){ 
                            deleted(`${url}itemInvoice/${list.cod_factura}`)
                            listItemsInvoice.forEach((element) => {insert(element,`${url}itemInvoice/`).then(res => console.log(res)); }); 
                            list.t_pago=="credito"?list.abono=list.abono:list.abono=totalInvoiceBruto
                            const data={
                                t_pago:list.t_pago,
                                valor:totalInvoiceBruto,
                                abono:list.abono,
                                fecha:newDate
                            }

                            dataProducts.forEach((element) => 
                            {
                              for (const list of listItemsInvoice)
                              {
                                   if (element.CodProducto == list.codProduct) {edit(element,`${url}product/${element.CodProducto}`);} 
                              }
                            });
                            
                            edit(data,`${url}invoice/${list.cod_factura}`).then(responseUPDATE=>{
                                if(responseUPDATE.status=='Updated'){    
                                    swal("Abonos de factura # "+list.cod_factura+" existosa", { icon: "success", })
                                    .then((isSucces)=>{
                                        if(isSucces){
                                            listItemsInvoice=[]
                                            forItemInvoice={}
                                            cod_item=0
                                            totalInvoiceBruto=0
                                            doc.containerMain.style.display = "block"
                                            doc.containerEditInvoice.style.display="none"
                                            consultAllInvoice(doc)
                                        }
                                    })                                              
                                }else{swal("No se pudo realizar la operacion", { icon: "error", })}
                            }) 
                        }
                    })   
                }else{seachFail(documen, "No se puede editar la factura sin items")}  
        })
    }
}

const createTdTable=(codProduct, description,ref ,mark, amount, price, priceBuy, priceT, seller, idInvoice, category, table)=>{
    let code=cod_item
    forItemInvoice = { code, codProduct, description,ref ,mark, amount, price,priceBuy, priceT,seller, idInvoice, category}
    totalInvoiceBruto=totalInvoiceBruto+priceT
    listItemsInvoice.push(forItemInvoice)
    const textTotal=document.getElementById("text__total")
    const trd = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");
    const td6 = document.createElement("td");
    const td7 = document.createElement("td");
    const i = document.createElement("i")
    const btnDelete = document.createElement("button");
    td1.textContent = `${description}  `
    td2.textContent=`${amount}  `
    td3.textContent=`${ref}  `
    td4.textContent=`${mark}  `
    td5.textContent = formatterPeso.format(`${price}`);
    td6.textContent =formatterPeso.format(`${priceT}`)  
    btnDelete.className = "btn btn-outline-secondary";
    btnDelete.id = code
    i.className = "fas fa-trash"
    btnDelete.appendChild(i)
    td7.appendChild(btnDelete);
    trd.appendChild(td1);
    trd.appendChild(td2);
    trd.appendChild(td3);
    trd.appendChild(td4);
    trd.appendChild(td5);
    trd.appendChild(td6);
    trd.appendChild(td7);
    table.appendChild(trd);
    textTotal.textContent=`${formatterPeso.format( totalInvoiceBruto)}`
    cod_item=cod_item+1
    if (btnDelete) {
        btnDelete.addEventListener("click", (e) => {
            table.removeChild(trd)  
            for (const list of dataProducts){
                if (list.CodProducto == codProduct) {
                    // console.log(list.CodProducto)
                    // console.log(element.codProduct)
                    list.Cantidad = parseInt(list.Cantidad, 10) + parseInt(amount, 10);
                    console.log(list.Cantidad)
                }
            }
            listItemsInvoice.forEach((element, index, arr) => {
                if ([element.code] == btnDelete.id) {
                    totalInvoiceBruto = totalInvoiceBruto-element.priceT
                    arr.splice(index, 1)
                }
            })
            textTotal.textContent=`${formatterPeso.format( totalInvoiceBruto)}`
            // doc.textTotalBruto.textContent = formatterPeso.format(`${totalInvoiceBruto}`);
        })
    }
}

