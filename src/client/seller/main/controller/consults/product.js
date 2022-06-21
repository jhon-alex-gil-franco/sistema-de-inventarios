import { consultData, edit } from "../../helpers/functions.js";
import { validateAmount, validateAmountMin, validateDescrip, validatePrice } from "../../helpers/regularExpresions.js";
import { seachFail, mesajeNoFundData,formatterPeso } from "../../helpers/messages.js";

// consultData("")
export const consultAllProducts = (doc, docP) => {
    consultData("http://localhost:4000/api/product").then((resp) => {

        createTableConsult(doc, docP, resp)
    })
}



export const consultProductByParam = (doc, docP) => {
    consultData("http://localhost:4000/api/product").then((resp) => {
        switch (doc.selectProduct.value) {
            case "cod":
                const listCo = []
                const foundId = resp.map(data => {
                    if (data.CodProducto.includes(doc.inputSeach.value.toUpperCase())) { listCo.push(data) }
                })
                listCo.length > 0 ? createTableConsult(doc, docP, listCo) : mesajeNoFundData(doc.containerTableconsults);
                break
            case "name":
                const listName = []
                const foundName = resp.map(data => { if (data.NombreProducto.includes(doc.inputSeach.value.toUpperCase())) { listName.push(data) } })
                listName.length > 0 ? createTableConsult(doc, docP, listName) : mesajeNoFundData(doc.containerTableconsults);
                break

            case "ref":
                 const listRef = []
                 const foundRef = resp.map(data => { if (data.Referencia.includes(doc.inputSeach.value.toUpperCase())) { listRef.push(data) } })
                 listRef.length > 0 ? createTableConsult(doc, docP, listRef) : mesajeNoFundData(doc.containerTableconsults);
                 break 

            case "mark":
                const listMark = []
                const foundMark = resp.map(data => { if (data.Marca.includes(doc.inputSeach.value.toUpperCase())) { listMark.push(data) } })
                listMark.length > 0 ? createTableConsult(doc, docP, listMark) : mesajeNoFundData(doc.containerTableconsults);
                break
        }
    });
};




const createTableConsult = (doc, docP, res) => {
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
    th1.textContent = "Codigo"
    th2.textContent = "Nombre"
    th3.textContent = "Referencia"
    th4.textContent = "Marca"
    th5.textContent = "Descripcion"
    th6.textContent = "Cantidad"
    th7.textContent = "Precio"
    th8.textContent = "Actualizar"
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    tr.appendChild(th5);
    tr.appendChild(th6);
    tr.appendChild(th7);
    tr.appendChild(th8);
    thead.appendChild(tr)
    table.appendChild(thead)
    table.appendChild(tbody)
    div.appendChild(table)
    doc.containerTableconsults.appendChild(h5)
    doc.containerTableconsults.appendChild(div)
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
        const btnEdit = document.createElement("button");
        td1.textContent = `${list.CodProducto}`;
        td2.textContent = `${list.NombreProducto}`;
        td3.textContent = `${list.Referencia}`;
        td4.textContent = `${list.Marca}`;
        td5.textContent = `${list.Descripcion}`;
        td6.textContent = `${list.Cantidad}`;
        td7.textContent = formatterPeso.format(`${list.Precio}`);
        btnEdit.className = "btn btn-info";
        const i=document.createElement("i");
        i.className="fas fa-edit"
        btnEdit.className = "btn btn-info";
        btnEdit.appendChild(i)
        btnEdit.id = `${list.nombre}`;
        td8.appendChild(btnEdit);
        trd.appendChild(td1);
        trd.appendChild(td2);
        trd.appendChild(td3);
        trd.appendChild(td4);
        trd.appendChild(td5);
        trd.appendChild(td6);
        trd.appendChild(td7);
        trd.appendChild(td8);
        tbody.appendChild(trd);
        if (btnEdit) {
            btnEdit.addEventListener("click", (e) => {
                fetch("http://localhost:4000/api/product/" + list.CodProducto)
                    .then((respuesta) => respuesta.json())
                    .then((respuesta) => {
                        console.log(respuesta)
                        doc.modalEditProduct.style.display = "block";
                        docP.cod.value = respuesta.CodProducto;
                        docP.cod.disabled = true
                        docP.name.value = respuesta.NombreProducto;
                        docP.name.disabled = true
                        docP.ref.value = respuesta.Referencia;
                        docP.ref.disabled = true
                        docP.mark.value = respuesta.Marca;
                        docP.mark.disabled = true
                        docP.description.value = respuesta.Descripcion;
                        docP.amountMin.value=respuesta.Min;
                        docP.labelAmountP.textContent="Stock"
                        docP.amount.value=respuesta.Cantidad;
                        docP.amount.disabled=true
                        docP.price.value = respuesta.Precio;
                        doc.titleModalProduct.textContent = respuesta.NombreProducto;
                        if (doc.btnEditProduct) {
                            doc.btnEditProduct.addEventListener("click", (e) => {
                                try {
                                    if (
                                        validateAmountMin(docP.amountMin.value.trim())&&
                                        validateDescrip(docP.description.value.trim()) &&
                                        validatePrice(docP.price.value.trim())
                                    ) {
                                        let num1=parseInt(respuesta.Cantidad,10)
                                        let num2=parseInt(docP.amount.value,10)
                                        let newAmount=num1+=num2
                                        console.log(newAmount)
                                        const data = {
                                            Min:docP.amountMin.value.trim(),
                                            Descripcion: docP.description.value.trim(),
                                            Cantidad:respuesta.Cantidad,
                                            Precio: docP.price.value.trim(),
                                        };

                                        swal({
                                            title: "Esta seguro?",
                                            text: "Desea actualizar el producto " + `${list.NombreProducto}`,
                                            icon: "info",
                                            buttons: true,
                                        }).then((willEdit) => {
                                            if (willEdit) {
                                                edit(data, "http://localhost:4000/api/product/" + list.CodProducto).then((response) => {
                                                    if (response.status == "Updated") {
                                                        doc.modalEditProduct.style.display = "none";
                                                        td5.textContent = `${data.Descripcion}`;                                                     
                                                        td7.textContent = `${data.Precio}`;
                                                        swal("Producto actualizado!", { icon: "success", });
                                                    } else { swal("Ocurrio un error inesperado!", { icon: "error", }); }
                                                });
                                            }
                                        });
                                    } else { seachFail(docP, "Verifique los datos ingresados"); }
                                } catch (error) { console.log(error); }
                            });
                        }
                    });
                if (doc.btnCancelService) {
                    doc.btnCancelProduct.addEventListener("click", (e) => {
                        doc.modalEditProduct.style.display = "none";
                        console.log("cerrar");
                    });
                }
            });
        }
    }
}