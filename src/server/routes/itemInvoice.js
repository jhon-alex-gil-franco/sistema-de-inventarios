const mysqlConnection  = require('../db/conection');
const express = require('express');
const router = express.Router();

  router.post('/', (req, res) => {
    const { code, codProduct, description,ref,mark, amount,priceBuy, price, priceT, idInvoice, category,seller} = req.body;
    const query = `
    INSERT INTO items_factura(cod_item, producto_CodProducto , descripcion, referencia ,marca, cantidad, valor_unitario, valor_compra, valor_total, vendedor, factura_codFactura, categoria  ) 
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
    `; 
      mysqlConnection.query(query, [code,codProduct, description,ref,mark,amount,price,priceBuy,priceT, seller,idInvoice,category], (err, rows, fields) => {
        if(!err) {
        res.json({status: 'Create'});
      } else {
        res.json({status: 'Error'});
        console.log(err)
      }
      });       
  });

  router.get('/', (req, res) => {  
    mysqlConnection.query('SELECT idItems,cod_item, producto_CodProducto ,descripcion, referencia, marca, cantidad, valor_unitario, valor_compra, valor_total, vendedor, factura_codFactura,categoria FROM items_factura', (err, rows, fields) => {
      try {
        if (rows.length===0) {
          res.json(status="Void")
        } else {
          res.json(rows);          
        }
      } catch (error) {
        res.json({status:"err"})
        console.log(error)
      }  
    });
  });
  // SELECT cod_factura,t_pago, valor,abono,fecha, estado ,username,
  // idClientes, nombre,Direccion,telefono,celular, email, T_cliente
  // FROM factura INNER JOIN clientes ON Clientes_idClientes=idClientes 
  // WHERE fecha BETWEEN ? AND ? ORDER BY cod_factura DESC

  router.get('/:date1/:date2/:id', (req, res) => {  
    const {date1,date2, id} = req.params;  
    mysqlConnection.query(
                            ` SELECT 
                              producto_CodProducto , descripcion, referencia, marca, valor_unitario,
                              valor_compra, valor_total, cantidad FROM items_factura 
                              INNER JOIN  factura ON factura_codFactura=cod_factura 
                              WHERE fecha BETWEEN ? AND ? 
                              AND estado= 'activa'
                              AND vendedor=?
                            `
                            ,[date1,date2, id], (err, rows, fields) => {
                                    try {
                                      if (rows.length===0)res.json(status="Void")
                                      res.json(rows);          
                                    
                                    } catch (error) {res.json({status:"err"})
                                                     console.log(error)
                                    
                                    }  
                              }
                          );
  });


  router.delete('/:cod', (req, res) => {
    const { cod} = req.params;
    mysqlConnection.query('DELETE FROM items_factura WHERE factura_codFactura= ?', [cod], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'item deleted'});
      } else {
        res.json({status: 'error'});
        console.log(err)
      }
    });
  });

//   router.get('/:id', (req, res) => {
//     const { id } = req.params; 
//     mysqlConnection.query('SELECT * FROM productos WHERE CodProducto= ?', [id], (err, rows, fields) => {
//       try {
//         if (rows.length===0) {
//           res.json(status="Void")
//         } else {
//           res.json(rows[0]);          
//         }
//       } catch (error) {
//         res.json({status:"err"})
//         console.log(error)
//       }  
//     });
//   });

  

//   router.put('/:id', (req, res) => {
//     const { Min, Descripcion,Cantidad,Precio} = req.body;
//     const {id} = req.params;
    
//     const query = ` 
//       UPDATE productos SET 
//       Min=?,
//       Descripcion=?,
//       Cantidad=?,
//       Precio=?     
//       WHERE CodProducto=?
//       `;
//     mysqlConnection.query(query, [ Min, Descripcion,Cantidad, Precio, id], (err, rows, fields) => {
//       if(!err) {
//         res.json({status:'Updated'});
       
//       } else {
//         console.log(err)
//         res.json({status:'error'});
//       }
//     });
//   });
  

  module.exports = router; 


