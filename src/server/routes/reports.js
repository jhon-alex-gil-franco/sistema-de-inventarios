const mysqlConnection  = require('../db/conection');
const express = require('express');
const router = express.Router();

 
  router.get('/:date1/:date2', (req, res) => {
    const {date1,date2} = req.params;  
    mysqlConnection.query(
        `
        SELECT items_factura.descripcion, items_factura.marca, items_factura.referencia, items_factura.cod_item,items_factura.t_item,
        SUM(items_factura.cantidad) AS TotalCantidad,
        SUM(items_factura.valor_total) AS TotalVentas
        FROM items_factura JOIN factura on  factura_codFactura =cod_factura
        WHERE fecha BETWEEN ? AND ?
        GROUP BY items_factura.cod_item
        ORDER BY SUM(items_factura.cantidad) DESC
        LIMIT 0 , 50
        `,[date1,date2], (err, rows, fields) => {
        
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

  module.exports = router; 


