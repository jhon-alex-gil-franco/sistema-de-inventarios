import { consultData,edit } from "../helpers/functions.js"
import { dateNow, dropChildOfTable } from "../helpers/helpers.js";
import {failInputText, seachFail,formatterPeso, mesajeNoFundData } from "../helpers/messages.js";
import {validateAmountMin } from "../helpers/regularExpresions.js";


export const inventory=(doc)=>{
    
    
    if(doc. inputSeach){
        doc.inputSeach.addEventListener('keyup',(e)=>{
            dropChildOfTable (doc.containerTableInventory) 
            consultData("http://localhost:4000/api/product").then((resp) => {
                console.log(resp)
                switch (doc.selectProduct.value) {
                    case "cod":
                        const listCo = []
                        const foundId = resp.map(data => {
                            if (data.CodProducto.includes(doc.inputSeach.value.toUpperCase())) { listCo.push(createDataForTable(data)) }
                        })
                        listCo.length > 0 ? createTableConsult(doc,  listCo) : mesajeNoFundData(doc.containerTableInventory);
                        break
                        case "name":
                            const listName = [] 
                            const foundName = resp.map(data => { if (data.NombreProducto.includes(doc.inputSeach.value.toUpperCase())) { listName.push(createDataForTable(data)) } })
                            listName.length > 0 ? createTableConsult(doc,  listName) : mesajeNoFundData(doc.containerTableInventory);
                            break
                            
                            case "ref":
                                const listRef = []
                                const foundRef = resp.map(data => { if (data.Referencia.includes(doc.inputSeach.value.toUpperCase())) { listRef.push(createDataForTable(data)) } })
                                listRef.length > 0 ? createTableConsult(doc, listRef) : mesajeNoFundData(doc.containerTableInventory);
                                break 
                                
                                case "mark":
                                    const listMark = []
                                    const foundMark = resp.map(data => { if (data.Marca.includes(doc.inputSeach.value.toUpperCase())) { listMark.push(createDataForTable(data)) } })
                                    listMark.length > 0 ? createTableConsult(doc, listMark) : mesajeNoFundData(doc.containerTableInventory);
                                    break
                                }
                            });
                            
                        })
                    }
                    
                    
                    
                    
                    if(doc. btnListAll){
                        doc.btnListAll.addEventListener('click', (e)=>{
                            consultData("http://localhost:4000/api/product").then((resp) => {
                                dropChildOfTable (doc.containerTableInventory) 
                                createTableConsult(doc, resp)
                            })
                        })
}

if(doc. btnListOut){
    doc.btnListOut.addEventListener('click', (e)=>{
        consultData("http://localhost:4000/api/product").then((resp) => {
            dropChildOfTable (doc.containerTableInventory) 
            const listOut = []
            const foundOut = resp.map(data => { if (data.Cantidad==0) { listOut.push(createDataForTable(data)) } })
            listOut.length > 0 ? createTableConsult(doc, listOut) : mesajeNoFundData(doc.containerTableInventory);           
        })
    })
}

if(doc. btnListByOut){
    doc.btnListByOut.addEventListener('click', (e)=>{
        consultData("http://localhost:4000/api/product").then((resp) => {
            dropChildOfTable (doc.containerTableInventory) 
            const listOut = []
            const foundOut = resp.map(data => { if (data.Cantidad<=data.Min&&data.Cantidad>=1) { listOut.push(createDataForTable(data)) } })
            listOut.length > 0 ? createTableConsult(doc, listOut) : mesajeNoFundData(doc.containerTableInventory);           
        })
    })
}

const createDataForTable = (data) => {
    const date = {
        CodProducto: data.CodProducto,
        NombreProducto: data.NombreProducto,
        Referencia: data.Referencia,
        Marca: data.Marca,
        Descripcion: data.Descripcion,
        Min:data.Min,
        Cantidad: data.Cantidad,
        Precio: data.Precio
    }
    return date
}

const createTableConsult = (doc,  res) => {
    const div = document.createElement("div")
    const h5 = document.createElement("h5");
    const table = document.createElement("table");
    const thead = document.createElement("thead")
    div.className = "table-responsive"
    h5.textContent = "Productos"
    table.className = "table table-striped ";
    thead.style = "background:rgb(182, 184, 183);"
    const tbody = document.createElement("tbody")
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
    const btnPrint = document.createElement("button");
    const i=document.createElement("i");
    i.className="fas fa-print"
    btnPrint.className="btn btn-primary"
    btnPrint.appendChild(i)
    th1.textContent = "Cod"
    th2.textContent = "Nombre"
    th3.textContent = "Referencia"
    th4.textContent = "Marca"
    th5.textContent = "Descripcion"
    th6.textContent = "Stock"
    th7.textContent = "C.Min"
    th8.textContent = "Precio"
    th9.textContent = "Entradas"
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    tr.appendChild(th5);
    tr.appendChild(th6);
    tr.appendChild(th7);
    tr.appendChild(th8);
    tr.appendChild(th9);
    thead.appendChild(tr)
    table.appendChild(thead)
    table.appendChild(tbody)
    div.appendChild(table)
    doc.containerTableInventory.appendChild(h5)
    doc.containerTableInventory.appendChild(div)
   
    let suma=0
    for (const list of res) {
        let total=parseFloat(list.Cantidad)*parseFloat(list.Precio)
        suma=suma+total      
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
        const btnIn = document.createElement("button");
        td1.textContent = `${list.CodProducto}`;
        td2.textContent = `${list.NombreProducto}`;
        td3.textContent = `${list.Referencia}`;
        td4.textContent = `${list.Marca}`;
        td5.textContent = `${list.Descripcion}`;
        td6.textContent = `${list.Cantidad}`;
        td7.textContent = `${list.Min}`;
        td8.textContent = formatterPeso.format(`${list.Precio}`);
        btnIn.className="btn btn-info"
        const i=document.createElement("i");
        i.className="fas fa-sign-in-alt"
        btnIn.className = "btn btn-info";
        btnIn.appendChild(i)
        td9.appendChild(btnIn);
        trd.appendChild(td1);
        trd.appendChild(td2);
        trd.appendChild(td3);
        trd.appendChild(td4);
        trd.appendChild(td5);
        trd.appendChild(td6);
        trd.appendChild(td7);
        trd.appendChild(td8);
        trd.appendChild(td9)
        if(list.Cantidad==0){
            trd.classList.add("danger")
        }if(list.Cantidad<=list.Min&& list.Cantidad>=1){
            trd.classList.add("warning")
        }
        tbody.appendChild(trd);
        if(btnIn){
            btnIn.addEventListener('click',(e)=>{
                fetch("http://localhost:4000/api/product/" + list.CodProducto)
                .then(respuesta=> respuesta.json())
                .then((respuesta)=>{
                    console.log(respuesta)
                    doc.modalEditInventory.style.display = "block";
                    doc.titleModalInventory.textContent = respuesta.NombreProducto;
                    doc.add.value=""
                    if(doc.btnAddStock){
                        doc.btnAddStock.addEventListener('click',()=>{
                            if(  validateAmountMin(doc.add.value.trim())&& doc.add.value!=""){
                                let num1=parseInt(respuesta.Cantidad,10)
                                let num2=parseInt(doc.add.value,10)
                                let newAmount=num1+=num2
                                const data = {
                                    Min:list.Min,
                                    Descripcion: list.Descripcion,
                                    Cantidad:newAmount,
                                    Precio: list.Precio
                                }
                                swal({
                                    title: "Esta seguro?",
                                    text: "Desea adicionar "+ " " +`${doc.add.value}`+" "+ `${list.NombreProducto}`+" al stock",
                                    icon: "info",
                                    buttons: true,
                                }).then((willEdit) => {
                                    if (willEdit) {
                                        edit(data, "http://localhost:4000/api/product/" + list.CodProducto).then((response) => {
                                            if (response.status == "Updated") {
                                                doc.modalEditInventory.style.display = "none";
                                                consultData
                                                if(data.Cantidad==0){
                                                    // trd.classList.remove("warning")
                                                    trd.classList.add("danger")
                                                }if(data.Cantidad>=1 &&data.Cantidad<=respuesta.Min){
                                                  //  trd.classList.remove("danger")
                                                    trd.classList.add("warning")
                                                }if(data.Cantidad>respuesta.Min){
                                                    trd.classList.remove("danger")
                                                    trd.classList.remove("warning")
                                                }
                                                td6.textContent=data.Cantidad
                                                let totalt=num2*list.Precio
                                                suma=suma+totalt
                                                stSum.textContent=suma
                                                swal("Stock Actulizado!", { icon: "success", });
                                            } else { swal("Ocurrio un error inesperado!", { icon: "error", }); }
                                        });
                                    }
                                });
                            }else{seachFail(doc, "El campo no debe esta vacio")}
                        })
                    }
                })
            })
        }
    } 
    const p1 =document.createElement("p")
    const p2 =document.createElement("p")
    const strong=document.createElement("strong")
    strong.textContent="Lubriservicios San Jose - sistema para inventario"
    p2.textContent=`Valor total de stock: ${formatterPeso.format(suma)}; Fecha de la consulta: ${dateNow()}  `
    p1.appendChild(strong)
    doc.containerTableInventory.appendChild(p1)
    doc.containerTableInventory.appendChild(p2)
    doc.containerTableInventory.appendChild(btnPrint)
  
    if(btnPrint){
        btnPrint.addEventListener("click",()=>{
            location.href="javascript:window.print()"
        })
    }
}

if (doc.add) {
    doc.add.addEventListener("keyup", () => {
        failInputText(validateAmountMin(doc.add.value.trim()),doc.add,doc.alertErrorAdd);
    });
}
if (doc.btnCancelAddStock) {
    doc.btnCancelAddStock.addEventListener("click", (e) => {
        doc. modalEditInventory.style.display = "none";
        
    });
}
}

