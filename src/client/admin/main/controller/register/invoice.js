import { consultData, edit, insert } from "../../helpers/functions.js";
import {  validateAmount, validateDescrip, validateId, validatePrice } from "../../helpers/regularExpresions.js";
import { formatterPeso, seachFail } from "../../helpers/messages.js";
import { componetSelectOptions } from "../../component/componentSelect.js";
import { dateNow} from "../../helpers/helpers.js";
import{url}from "../../helpers/global.js";

  let idInvoice = ""
  let dataClient=[]
  let dataProducts=[]
  let listItemInvoice = []
  let codProduct = "", amount = 0,  price = 0, description = "", priceT = 0, stock = false,  tPago = "",
      ref="",  codItem = 0, totalInvoiceBruto = 0, totalInvoiceNeto = 0,
      mark="",date=dateNow(), valuePrice, category, priceBuy=0, seller=sessionStorage.getItem("id");
  let code = 1




  export const createNewInvoice= (doc, docC) => {

    consultData (`${url}product/`)
    .then(res => { 
                   dataProducts =  res;                                            
                   componetSelectOptions(doc.concep, dataProducts, 'NombreProducto','CodProducto',3)
    })
    
    
    // dataForSelect (doc.concep, `${url}product/`, doc) 
    consultData(`${url}invoice/`).then(res => {
         idInvoice = res.AUTO_INCREMENT
         try {doc.titleCodInvoice.textContent = "Factura: " + idInvoice} catch (error) {}
    })   
    

    if (doc.idClient) {
      doc.idClient.addEventListener("keyup", (e) => {
        if (e.keyCode === 13 && !e.shiftKey){
          consultData(`${url}client/${doc.idClient.value}`)
          .then((resp) => {  
            dataClient = resp
            doc.client.value ="";
            if (validateId(doc.idClient.value)) {
              doc.idClient.classList.remove("is-invalid")
              if (resp != "Void") {
                doc.client.value = resp.nombre;
                doc.containerdataItems.style.display="block"
                doc.idClient.disabled=true
              } else {
                swal({
                  title: "Desea registrar nuevo cliente? ",
                  text: `Id ${doc.idClient.value} no existe en la base de datos`,
                  icon: "info",
                  buttons: true,
                }).then((willCreate) => {
                  if (willCreate) {
                    doc.regNewClient.style.display = "block";
                    docC.id.value=doc.idClient.value
                  }
                });
              }
            } else {
                    doc.idClient.classList.add("is-invalid")
                    doc.containerdataItems.style.display="none"
            }
          });
        }
      
      })
    }
    
    if(doc.btnCancelRegisterNewClient){
        doc.btnCancelRegisterNewClient.addEventListener('click',()=>{
          doc.regNewClient.style.display = "none";
          docC.form.reset();
        })
    }


    
    let  forInvoice, item = {}
    
    if (doc.btnAddItemInvoice) {
        doc.btnAddItemInvoice.addEventListener("click", () => {  
            let amount=doc.amount.value
            let price=doc.price.value
            codProduct=doc.concep.value
            amount==""||amount==0?amount=1:amount=doc.amount.value 
            let priceT=price*amount
            for (const list of dataProducts) {
                 if(list.CodProducto == codProduct){
                    description = list.NombreProducto
                    ref=list.Referencia
                    mark=list.Marca
                    category=list.Categoria
                    priceBuy=list.Precio
                    if(doc.price.value>list.Precio){
                       price = doc.price.value
                       valuePrice=true
                    }else{valuePrice=false}
                    if (amount <= list.Cantidad) {
                        stock = true
                        priceT = amount * price
                        if(list.Min>=list.Cantidad)swal(`Quedan ${list.Cantidad-amount} unidades de ${list.NombreProducto} - ${list.Referencia}!`, { icon: "info" });
                     }else{stock = false }        
                 }
            }
             //validation of item
            if (codProduct != "null" && amount > 0 && stock == true &&  valuePrice==true ) 
            {
                for (const list of dataProducts){ if (list.CodProducto == codProduct) {list.Cantidad = list.Cantidad - amount}; }
                //--------------//
                doc.btnRegInvoice.disabled = false
                doc.containerTable.style.display="block"
                item = { codProduct, code, description ,ref ,mark , amount, price, priceT }
                forInvoice = { code, codProduct, description,ref ,mark, amount, priceBuy, price, priceT, idInvoice, category, seller}
                listItemInvoice.push(forInvoice)
                totalInvoiceBruto = totalInvoiceBruto + priceT
                createTableItemsInvoice(doc, item)
                code = code + 1
                doc.concep.value="null"
                doc.amount.value=""
                doc.price.value=""
            }else {if(stock==false)seachFail(doc, "No hay cantidad suficientes en stock")
                   if(codProduct == "null" || price=="")seachFail(doc, "Verifique la informacion ingresada")
                   if(valuePrice==false)seachFail(doc, "El valor del producto debe ser mayor al precio de compra")
                  }
      })
    }
          
    if (doc.btnCancelInvoice) { doc.btnCancelInvoice.addEventListener("click", (e) => { location.reload(); });}
      
    
    //buton for creation a new invoice
    if (doc.btnRegInvoice){
        doc.btnRegInvoice.addEventListener("click", () => {
            let abono = 0;
            if (doc.selectTPayment.value == "contado") 
            {
                abono = totalInvoiceBruto;
            }else {
                   abono = 0;
            }
            if ((dataClient.idClientes) && listItemInvoice.length > 0 &&doc.selectTPayment.value!="null")
             {
                  const data =
                             {
                                Clientes_idClientes: dataClient.idClientes,
                                t_pago: doc.selectTPayment.value,
                                valor: totalInvoiceBruto,
                                abono: abono,
                                fecha: date, 
                                user:sessionStorage.getItem("id"),
                                username:sessionStorage.getItem("username"),
                                estado:"activa"               
                              };
                  swal({
                        title: "FACTURA # " + idInvoice,
                        text: "Desea generar factura "+doc.selectTPayment.value+" para el cliente " + dataClient.nombre ,
                        icon: "info",
                        buttons: true,
                  }).then((willCreate) => {
                           if (willCreate) {
                               insert(data, `${url}invoice/`).then((resp) => {
                                      if (resp.status == "Create") {
                                          listItemInvoice.forEach((element) => { insert(element, `${url}itemInvoice`)})
                                           dataProducts.forEach((element) => 
                                           {
                                             for (const list of listItemInvoice)
                                             {
                                                  if (element.CodProducto == list.codProduct) {edit(element,`${url}product/${element.CodProducto}`);} 
                                             }
                                           });
                                          swal("Se genero la nueva factura con exito!", { icon: "success" })
                                          .then((willCreate) => {
                                                 if (willCreate) {
                                                  CreateInvoice(doc)
                                                  doc.containerMain.style.display = "none"
                                                  doc.containerInfoClientPrintInvoice.style.display="block"
                                                 }
                                          })
                                     
                                      } else { swal("Ocurrio un error inesperado!", { icon: "error" }); }
                                })
                            }
                      });
             } else 
                  {
                     if (listItemInvoice.length <= 0) seachFail(doc, "Debe insertar almenos un item a la factura");
                     if (doc.selectTPayment.value=="null") seachFail(doc, "Debe escoger un tipo de pago");
                  }
        });
     }
    if (doc.concep){doc.concep.addEventListener("keyup", () => {validateDescrip(doc.concep.value) ? doc.concep.classList.remove("is-invalid") : doc.concep.classList.add("is-invalid")});}
    if (doc.price) {doc.price.addEventListener("keyup", () => {validatePrice(doc.price.value) ? doc.price.classList.remove("is-invalid") : doc.price.classList.add("is-invalid")});}
    if (doc.amount) {doc.amount.addEventListener("keyup", () => {validateAmount(doc.amount.value) ? doc.amount.classList.remove("is-invalid") : doc.amount.classList.add("is-invalid")});}
  }

 export const createTableItemsInvoice = (doc, data) => 
  {
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
        td1.textContent = `${data.description} `
        td2.textContent = data.mark
        td3.textContent = data.ref
        td4.textContent = data.amount
        td5.textContent = formatterPeso.format(`${data.price}`);
        td6.textContent = formatterPeso.format(`${data.priceT}`);
        btnDelete.className = "btn btn-outline-secondary";
        btnDelete.id = data.code
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
        doc.tableForItemsInvoice.appendChild(trd);
        doc.textTotalBruto.textContent = formatterPeso.format(`${totalInvoiceBruto}`);
        if (btnDelete){
            btnDelete.addEventListener("click", (e) =>
            {
              doc.tableForItemsInvoice.removeChild(trd)
              for (const list of dataProducts) 
              {
                  if (list.CodProducto == data.codProduct) {list.Cantidad = parseInt(list.Cantidad, 10) + parseInt(data.amount, 10);}
              }
              listItemInvoice.forEach((element, index, arr) =>
              {
                  if ([element.code] == btnDelete.id) {totalInvoiceBruto = totalInvoiceBruto - element.priceT;arr.splice(index, 1);}
              })
              doc.textTotalBruto.textContent = formatterPeso.format(`${totalInvoiceBruto}`);     
            })
          }
  }
  
  const CreateInvoice = (doc) => {
    let InfoClient = `
    <div class="col-md-12">
    <div class="tile">
    <section class="invoice">
    <div class="row mb-4">
    <div class="col-6">
    </div>
    <div class="col-6">
    <h5 class="text-right">Fecha: ${date} </h5>
    </div>
    </div>
    <div class="row invoice-info" >
    <div class="col-4">
    <address><strong>SISTEMA DE VENTAS</strong><br>
    </div>
    <div class="col-5" >
    <address><strong>Cliente</strong><br>Id: ${dataClient.idClientes}<br>Nombre: ${dataClient.nombre}<br>Dir: ${dataClient.Direccion}<br>Tel: ${dataClient.celular}</address>
    </div>
    <div class="col-3" ><b>Factura: ${idInvoice}</b><br>Vendedor: ${sessionStorage.getItem("username")}<br>Factura ${doc.selectTPayment.value}<br> </div>
    </div>
    <div class="row">
    <div class="col-12 table-responsive">
    <table class="table table-striped">
    <thead >
    <tr>
    <th>Descripcion</th>
    <th>Referencia</th>
    <th>Marca</th>
    <th>Cantidad</th>
    <th>V. Unitario</th>
    <th>Subtotal</th>
    </tr>
    </thead>
    <tbody id="items__print-invoice">
    </tbody>
    </table>
    <div class="col-3" ><b>TOTAL. ${ formatterPeso.format(totalInvoiceBruto)}</b> </div>
    </div>
    </div>
    <div class="row d-print-none mt-2" style="display:flex">
    <div class="col-12 text-right"><a class="btn btn-primary" href="javascript:window.print();"><i class="fa fa-print"></i> </a>
    <a class="btn btn-secondary" href="javascript:location.reload();"><i class="fas fa-undo-alt"></i> </a>
    </div>
    </div>
    </section>
    </div>
    </div>`;
    doc.containerInfoClientPrintInvoice.innerHTML = InfoClient
    const table=document.getElementById("items__print-invoice")
    for (let list of listItemInvoice) {
      {       
        let item= `
        <tr>
        <td>${list.description}</td>
        <td>${list.ref}</td>
        <td>${list.mark}</td>
        <td>${list.amount}</td>
        <td>${formatterPeso.format(list.price)}</td>
        <td>${formatterPeso.format(list.priceT)}</td>
        </tr> `
        table.innerHTML +=item
      }
    }
  }
     // ` ${NombreProducto} - ${Info.Referencia} -  ${formatterPeso.format(Info.Precio)} CodProducto`;
  
 