const mysqlConnection  = require('../db/conection');
const express = require('express');
const router = express.Router();

  router.post('/', (req, res) => {
    const {fecha,concepto,valor,categoria, Proveedor_idProveedor} = req.body;
    const query = `
    INSERT INTO egresos(fecha,concepto,valor, categoria, Proveedor_idProveedor )
    VALUES (?,?,?,?,?)
    `; 
      mysqlConnection.query(query, [fecha,concepto,valor, categoria, Proveedor_idProveedor], (err, rows, fields) => {
        if(!err) {
        res.json({status: 'Create'});
      } else {
        res.json({status: 'Error'});
        console.log(err)
      }
      });    
  });

  router.get('/:date1/:date2', (req, res) => {
    const {date1,date2} = req.params;  
    mysqlConnection.query('SELECT * FROM egresos join proveedor on Proveedor_idProveedor= idProveedor WHERE fecha BETWEEN ? AND ?;',[date1,date2], (err, rows, fields) => {
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

  router.get('/', (req, res) => {  
    mysqlConnection.query('SELECT * FROM egresos join proveedor on Proveedor_idProveedor= idProveedor;', (err, rows, fields) => {
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


