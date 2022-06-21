const mysqlConnection  = require('../db/conection');
const express = require('express');
const router = express.Router();

  router.post('/', (req, res) => {
    const {payment,date,cod,user} = req.body;
    const query = `
    INSERT INTO abonos (abonado,fecha,factura_codFactura,user )
    VALUES (?,?,?,?)
    `; 
      mysqlConnection.query(query, [payment,date,cod, user], (err, rows, fields) => {
        if(!err) {
        res.json({status: 'Create'});
      } else {
        res.json({status: 'Error'});
        console.log(err)
      }
      });    
  });

  router.get('/:cod', (req, res) => {
    const {cod} = req.params;  
    mysqlConnection.query('SELECT abonado,fecha,factura_codFactura, username FROM abonos  INNER JOIN usuarios ON user=id  WHERE factura_codFactura=?',[cod], (err, rows, fields) => {
      try {
        if (rows.length===0) {
          res.json({status:"Void"})
        } else {
          res.json(rows);        
        }
      } catch (error) {
        res.json({status:"err"})
        console.log(error)
      }  
    });
  });

//   router.get('/', (req, res) => {  
//     mysqlConnection.query('SELECT * FROM egresos join proveedor on Proveedor_idProveedor= idProveedor;', (err, rows, fields) => {
//       try {
//         if (rows.length===0) {
//           res.json(status="Void")
//         } else {
//           res.json(rows); 
//           console.log("")         
//         }
//       } catch (error) {
//         res.json({status:"err"})
//         console.log(error)
//       }  
//     });
//   });


  

  module.exports = router; 


