import { consultData, edit, insert } from "../../helpers/functions.js";
import { validateKm, validatePlaca, validatePrice } from "../../helpers/regularExpresions.js";
import { formatterPeso, seachFail } from "../../helpers/messages.js";
import { dateNow} from "../../helpers/helpers.js";


  let dataService = ""
  let idInvoice = ""
  let dataVehicle = ""
  let dataProducts = ""
  let dataEmployee = ""
  let listItemInvoice = []
  let listServiceEmpoyee = []
  let cod = "", amount = 0, dto = 0, comm = 0, price = 0, description = "", priceT = 0, stock = false, tItem = "", tPago = "",
      ref="", idEmploye = "", nameEmployee = "", vehicle = "", codItem = 0, totalInvoiceBruto = 0, totalInvoiceNeto = 0,
      totalCommision = 0, mark="",date=dateNow();


  
    export const createNewInvoice= (doc, docV) => {
   
    dataForSelect(doc.selectEmployee, 1, "http://localhost:4000/api/employee/", dataEmployee)
    dataForSelect(doc.selectProduct, 2, "http://localhost:4000/api/product/", dataProducts,doc.priceProduct)
    dataForSelect(doc.selectService, 3, "http://localhost:4000/api/services/", dataService)
    listenerInputsPrice(doc.commission)
    listenerInputsPrice(doc.priceService)
    listenerInputsPrice(doc.priceProduct)
    if(doc.km){doc.km.addEventListener("keyup",()=>{validateKm(doc.km.value)?doc.km.classList.remove("is-invalid") : doc.km.classList.add("is-invalid")})}

      consultData("http://localhost:4000/api/invoice/").then(res => {
        console.log(res)
        idInvoice = res.AUTO_INCREMENT
       
        try {doc.titleCodInvoice.textContent = "Factura: " + idInvoice} catch (error) {}
      })

    if (doc.checkCom) {
      doc.checkCom.addEventListener("change", () => {
        if (doc.checkCom.checked == true) {
          doc.commission.disabled = true
          doc.commission.value = ""
        }
        else { doc.commission.disabled = false }
      })
    }

    if(doc.priceProduct){
      doc.priceProduct.addEventListener("click",()=>{
        doc.priceProduct.dataset.title+"dsd"
        doc.priceProduct.getAttribute("data-title")
      })
    }
  
    if (doc.vehicle) {
      doc.vehicle.addEventListener("keyup", () => {
        consultData("http://localhost:4000/api/vehicle/" + doc.vehicle.value
        ).then((resp) => {
          dataVehicle = resp
          doc.client.value = "";
          if (validatePlaca(doc.vehicle.value)) {
            doc.vehicle.classList.remove("is-invalid")
            if (resp != "Void") {
              doc.client.value = resp.nombre;
              doc.containerFormItems.style.display = "block"
              doc.km.disabled = false
              doc.km.value = dataVehicle.kilometraje
              doc.containerTable.style.display = "block"
            } else {
              swal({
                title: `La placa ${doc.vehicle.value} no existe`,
                text: "Desea registrar nuevo vehiculo? ",
                icon: "info",
                buttons: true,
              }).then((willCreate) => {
                if (willCreate) {
                  doc.regNewVehicle.style.display = "block";
                  docV.placa.value = doc.vehicle.value;
                }
              });
            }
          } else {
            doc.containerFormItems.style.display = "none"
            doc.containerTable.style.display = "none"
            doc.km.disabled = true
            doc.km.value = ""
            doc.vehicle.classList.add("is-invalid")
          }
        });
      })
    }
  
    if (doc.selectOption) {
      doc.selectOption.addEventListener('change', () => {
        doc.vehicle.disabled = true
        if (doc.selectOption.value === "p") {
          doc.containerProduct.style.display = "block"
          doc.containerCant.style.display = "block"
          doc.containerService.style.display = "none"
          doc.selectService.value = "null"
          doc.priceService.value=""
          doc.selectEmployee.disabled = true
          doc.selectEmployee.value = "null"
          doc.checkCom.checked = true
          doc.checkCom.disabled = true
          doc.commission.disabled = true
          doc.commission.value = ""
          doc.priceProduct.value = ""
          doc.containerDto.style.display = "block"
          doc.containerDto.style.display = "flex"
          doc.containerPriceService.style.display = "none"
        }
        if (doc.selectOption.value === "s") {
          doc.containerService.style.display = "block"
          doc.containerProduct.style.display = "none"
          doc.containerCant.style.display = "none"
          doc.selectProduct.value = "null"
          doc.cantProducts.value = ""
          doc.selectEmployee.disabled = false
          doc.checkCom.checked = true
          doc.checkCom.disabled = false
          doc.priceProduct.value = ""
          doc.containerDto.style.display = "none"
          doc.containerPriceService.style.display = "block"
        }
      })
    }

    let forEmployee, forInvoice, item = {}

    if (doc.btnAddItemInvoice) {
      doc.btnAddItemInvoice.addEventListener("click", () => {
        let valuePrice=false
        vehicle = doc.vehicle.value
        let validateIfSelectEmployee = false
        if (doc.selectOption.value == "s") {
          ref="Na"
          mark="Na"
          valuePrice=true
          stock = true
          amount = 1
          tItem = "service"
          idEmploye = doc.selectEmployee.value
          cod = doc.selectService.value
          try { const finDNameEmploye = dataEmployee.map(data => { if (data.idEmpleados == idEmploye) nameEmployee = data.nombre }) } catch { }
          validatePrice(doc.priceService.value) ? price = parseFloat(doc.priceService.value) : price = 0
          priceT = price
          for (const list of dataService) {
            if (list.idServicios == cod) {
              description = list.nombreServicio
              if (doc.checkCom.checked == true) {
                comm = doc.priceService.value * 0.40
              } else { validatePrice(doc.commission.value) ? comm = parseFloat(doc.commission.value) : comm = 0 }
            }
          }
          if (doc.selectEmployee.value != "null") validateIfSelectEmployee = true
        } 
        if (doc.selectOption.value == "p") {
              validateIfSelectEmployee = true
              cod = doc.selectProduct.value
              comm = 0
              tItem = "product"
              idEmploye = "Na"
              nameEmployee = "Na"
              doc.cantProducts.value !== "" ? amount = doc.cantProducts.value : amount = 1
              for (const list of dataProducts) {
                if (list.CodProducto == cod) {
                  description = list.NombreProducto
                  ref=list.Referencia
                  mark=list.Marca
                  if(doc.priceProduct.value>list.Precio){
                    price = doc.priceProduct.value
                    valuePrice=true
                  }else{valuePrice=false}
                  if (amount <= list.Cantidad) {
                    stock = true
                    priceT = amount * price
                    if(list.Min>=list.Cantidad)swal(`Quedan ${list.Cantidad-amount} unidades del producto ${list.NombreProducto} - ${list.Referencia}!`, { icon: "info" });
                  }else{stock = false }        
                }
              }
         }
     
         
         //validation of item
        if (cod != "null" && amount > 0 && validateIfSelectEmployee == true && stock == true && price >= 0 && valuePrice==true && comm >= 0 && listItemInvoice.length<=19) {
          for (const list of dataProducts) {
            if (list.CodProducto == cod) {list.Cantidad = list.Cantidad - amount}
          }
          doc.btnRegInvoice.disabled = false
          const code = 1
          item = { codItem, cod, description, amount, price, priceT, tItem, comm, idEmploye, nameEmployee,  ref, mark }
          forEmployee = { codItem, idEmploye, nameEmployee, comm, description, idInvoice }
          forInvoice = { codItem, cod, tItem, description, amount, price, priceT, idInvoice,ref, mark}
          listItemInvoice.push(forInvoice)
          if (doc.selectOption.value == "s") listServiceEmpoyee.push(forEmployee)
          totalCommision = totalCommision + comm
          totalInvoiceBruto = totalInvoiceBruto + priceT
          totalInvoiceNeto = totalInvoiceBruto - totalCommision
          createTableItemsInvoice(doc, item)
          codItem = codItem + 1
          reseFielsItem(doc)
        } else {if(stock==false)seachFail(doc, "No hay cantidad suficientes en stock")
                if(cod == "null" || amount <= 0 || validateIfSelectEmployee == false ||price==0)seachFail(doc, "Verifique la informacion ingresada")
                if(valuePrice==false)seachFail(doc, "El valor del producto debe ser mayor al precio de compra")
                if(listItemInvoice.length>=19)seachFail(doc, "No puede agregar mas items a esta factura")
              }
            })
          }
          
          if (doc.btnCancelInvoice) { doc.btnCancelInvoice.addEventListener("click", (e) => { location.reload(); }); }
          if (doc.btnCancelRegNewVehicle) { doc.btnCancelRegNewVehicle.addEventListener("click", (e) => { doc.regNewVehicle.style.display = "none"; }); }
          
          if (doc.btnRegInvoice) {
            doc.btnRegInvoice.addEventListener("click", () => {
              let abono = 0;
              if (doc.selectTPayment.value == "contado") {
                tPago = "contado";
                abono = totalInvoiceBruto;
              } else {
                tPago = "credito";
                abono = 0;
              }
              if (validatePlaca(dataVehicle.placa) && listItemInvoice.length > 0 && doc.km.value >= dataVehicle.kilometraje&&doc.selectTPayment.value!="null"&& validateKm(doc.km.value)) {
                dataVehicle.kilometraje = doc.km.value;
                const data = {
                  Clientes_idClientes: dataVehicle.Clientes_idClientes,
                  Placa_placa: dataVehicle.placa,
                  km: dataVehicle.kilometraje,
                  t_pago: tPago,
                  valor_bruto: totalInvoiceBruto,
                  valor_neto: totalInvoiceNeto,
                  comision_empleados: totalCommision,
                  abono: abono,
                  fecha: date,
                  comentario:""
               
                };
                swal({
                  title: "FACTURA # " + idInvoice,
                  text: "Desea generar factura "+tPago+" para el vehiculo " + dataVehicle.placa ,
                  icon: "info",
                  buttons: true,
                }).then((willCreate) => {
                  if (willCreate) {
              insert(data, "http://localhost:4000/api/invoice/").then((resp) => {
                console.log(resp)
                if (resp.status == "Create") {
                  listItemInvoice.forEach((element) => { insert(element, "http://localhost:4000/api/itemInvoice/").then(res => console.log(res)); });
                  listServiceEmpoyee.forEach((element) => { insert(element, "http://localhost:4000/api/servicesByEmploye/").then(res => console.log(res)) });
                  edit(dataVehicle, "http:localhost:4000/api/vehicle/" + dataVehicle.placa).then(res => console.log(res));
                  try {
                    dataProducts.forEach((element) => {
                      for (const list of listItemInvoice) {
                        if (list.tItem == "product") {
                          if (element.CodProducto == list.cod) {
                            edit(element, "http:localhost:4000/api/product/" + element.CodProducto).then(res => console.log(res));
                          }
                        }
                      }
                    });
                  } catch (error) { }
                  swal("Se genero la nueva factura con exito!", { icon: "success" });
                  setTimeout(() => {
                    CreateInvoice(doc)
                    doc.containerMain.style.display = "none"
                    doc.containerInfoClientPrintInvoice.style.display="block"
                  }, 500);
                } else { swal("Ocurrio un error inesperado!", { icon: "error" }); }
              }
              );
            }
          });
        } else {
          if (doc.km.value < dataVehicle.kilometraje) seachFail(doc, "El kilometraje no puede ser inferior al anterior");
          if (listItemInvoice.length <= 0) seachFail(doc, "Debe insertar almenos un item a la factura");
          if (doc.selectTPayment.value=="null") seachFail(doc, "Debe escoger un tipo de pago");
        }
      });
    }
  };
  
  const createTableItemsInvoice = (doc, data) => {
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
    const i = document.createElement("i")
    const btnDelete = document.createElement("button");
    td1.textContent = `${data.description}  `
    td2.textContent = `${data.mark}  `
    td3.textContent=`${data.ref}  `
    td4.textContent = data.amount
    td5.textContent = formatterPeso.format(`${data.price}`);
    td6.textContent = formatterPeso.format(`${data.priceT}`);
    td7.textContent = data.nameEmployee
    td8.textContent = formatterPeso.format(`${data.comm}`);
    btnDelete.className = "btn btn-outline-secondary";
    btnDelete.id = data.codItem
    i.className = "fas fa-trash"
    btnDelete.appendChild(i)
    td9.appendChild(btnDelete);
    trd.appendChild(td1);
    trd.appendChild(td2);
    trd.appendChild(td3);
    trd.appendChild(td4);
    trd.appendChild(td5);
    trd.appendChild(td6);
    trd.appendChild(td7);
    trd.appendChild(td8);
    trd.appendChild(td9);
    doc.tableForItemsInvoice.appendChild(trd);
    // doc.textCommEmploye.textContent=
    doc.textTotalBruto.textContent = formatterPeso.format(`${totalInvoiceBruto}`);
    doc.textCommEmploye.textContent = formatterPeso.format(`${totalCommision}`);
    doc.textTotalNeto.textContent = formatterPeso.format(`${totalInvoiceNeto}`);
    // doc.textTotalNeto.textContent=
    if (btnDelete) {
      btnDelete.addEventListener("click", (e) => {
        doc.tableForItemsInvoice.removeChild(trd)
        for (const list of dataProducts) {
          if (list.CodProducto == data.cod) {
            list.Cantidad = parseInt(list.Cantidad, 10) + parseInt(data.amount, 10)
          }
        }
        listItemInvoice.forEach((element, index, arr) => {
          if ([element.codItem] == btnDelete.id) {
            totalInvoiceBruto = totalInvoiceBruto - element.priceT
            arr.splice(index, 1)
          }
        })
        doc.textTotalBruto.textContent = formatterPeso.format(`${totalInvoiceBruto}`);
        if (data.tItem == "service") {
          listServiceEmpoyee.forEach((element, index, arr) => {
            if ([element.codItem] == btnDelete.id) {
              arr.splice(index, 1)
              totalCommision = totalCommision - element.comm
              totalInvoiceNeto = totalInvoiceBruto - totalCommision
            }
          })
          
          doc.textCommEmploye.textContent = formatterPeso.format(`${totalCommision}`);
          doc.textTotalNeto.textContent = formatterPeso.format(`${totalInvoiceNeto}`);
        }
      })
    }
  }
  
  const dataForSelect = (select, param, url, doc) => {
    if (select) {
      select.addEventListener("click", () => {
        if (select.childNodes.length == 3) {
          consultData(url)
          .then((res) => {
            for (const Info of res) {
              const listItem = document.createElement("OPTION");
              switch (param) {
                case 1:
                  //select employee
                  if (Info.vinculado == "vinculado") {
                    dataEmployee = res;
                    listItem.textContent = `${Info.nombre}`;
                    listItem.value = Info.idEmpleados;
                    listItem.className = "form-control";
                    select.appendChild(listItem);
                  }
                  break;
                  case 2:
                    //select product
                    dataProducts = res;
                    listItem.textContent = ` ${Info.NombreProducto} - ${Info.Referencia} - ${Info.Marca}-  ${formatterPeso.format(Info.Precio)} `;
                    listItem.value = Info.CodProducto
                    listItem.className = "form-control";
                    select.appendChild(listItem);
                    break;
                    case 3:
                      //select services
                      dataService = res;
                      listItem.textContent = `${Info.idServicios} - ${Info.nombreServicio} `;
                      listItem.value = Info.idServicios;
                      listItem.className = "form-control";
                      select.appendChild(listItem);
                    break;
                  }
              }
            });
          }
      });
    }
  };
  
  const reseFielsItem = (doc) => {
    doc.selectService.value = "null"
    doc.selectProduct.value = "null"
    doc.selectEmployee.value = "null"
    doc.priceProduct.value = ""
    doc.cantProducts.value = ""
    doc.commission.disabled = true
    doc.commission.value = ""
    doc.checkCom.checked = true
    doc.priceService.value = ""
  }
  
  const listenerInputsPrice = (input) => {
    if (input) {
      input.addEventListener("keyup", () => {
        validatePrice(input.value) ? input.classList.remove("is-invalid") : input.classList.add("is-invalid")
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
    <h2 class="page-header"> <img src="../source/images/logo.png" alt="" style="height:110px; width:250px;"></h2>
    </div>
    <div class="col-6">
    <h5 class="text-right">Fecha: ${date} </h5>
    </div>
    </div>
    <div class="row invoice-info" >
    <div class="col-4">
    <address><strong>Lubriservicios San Jose</strong><br>Nit: 73.571.231-1 <br>Regimen Simplificado<br>Dir: San jose de los campanos Cra100 No 33A-60<br>Tel: 6664384<br>Cel: 3008801069<br>Email: lubriserviciosanjose@gmail.com</address>
    </div>
    <div class="col-5" >
    <address><strong>Cliente</strong><br>Id: ${dataVehicle.idClientes}<br>Nombre: ${dataVehicle.nombre}<br>Dir: ${dataVehicle.Direccion}<br>Tel: ${dataVehicle.celular}</address>
    </div>
    <div class="col-3" ><b>Factura # ${idInvoice}</b><br>Orden ID: 00${idInvoice}<br>Factura ${tPago}<br>Placa: ${dataVehicle.placa} <br>Km: ${dataVehicle.kilometraje} </div>
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
    <div class="col-3 mb-3 line-head" ><b>SUBTOTAL. ${ formatterPeso.format(totalInvoiceBruto)}</b> </div>
    <div class="col-3 mb-3 line-head" ><b>IVA. ${ formatterPeso.format(0)}</b> </div>
    <div class="col-3 " ><b>TOTAL. ${ formatterPeso.format(totalInvoiceBruto)}</b> </div>
    <div class="mb-3 line-head"> </div>
    </div>
    </div>
    <div class="row d-print-none mt-2" style="display:flex">
    <div class="col-12 text-right"><a class="btn btn-primary" href="javascript:window.print();"><i class="fa fa-print"></i></a>
    <a class="btn btn-secondary" href="javascript:location.reload();"><i class="fas fa-undo-alt"></i></a>
    </div>
    </div>
    </section>
    </div>
    </div>`;
    doc.containerInfoClientPrintInvoice.innerHTML = InfoClient
    const table=document.getElementById("items__print-invoice")
    let rows=0
    
    for (let list of listItemInvoice) {
      {       
        rows=rows+1
        let item= `
        <tr>
        <td>${list.cod}</td>
        <td>${list.description}</td>
        <td>${list.mark}</td>
        <td>${list.ref}</td>
        <td>${list.amount}</td>
        <td>${formatterPeso.format(list.price)}</td>
        <td>${formatterPeso.format(list.priceT)}</td>
        </tr> `
        table.innerHTML +=item
      }
    }
    let totalRows=20-rows
    for(let i=1; i<=totalRows; i++ ){
        let item= `<br> `
        table.innerHTML +=item
        
    }
  }
  
  
  
  
