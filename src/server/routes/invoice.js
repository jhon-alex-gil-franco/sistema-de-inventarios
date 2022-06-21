const mysqlConnection  = require('../db/conection');
const express = require('express');
const router = express.Router();

  router.post('/', (req, res) => {
    const {Clientes_idClientes, t_pago, valor,abono, fecha, user, username,estado, } = req.body;
    const query = `
    INSERT INTO factura(Clientes_idClientes, t_pago, valor,abono, fecha , user, username, estado) 
    VALUES (?,?,?,?,?,?,?,?)
    `; 
      mysqlConnection.query(query, [Clientes_idClientes, t_pago, valor,abono, fecha,user,username, estado], (err, rows, fields) => {
        if(!err) {
        res.json({status: 'Create'});
      } else {
        res.json({status: 'Error'});
        console.log(err)
      }
      });       
  });


  router.get('/', (req, res) => {
        query=`SELECT AUTO_INCREMENT FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA =?  AND TABLE_NAME =?`
         mysqlConnection.query(query, [`sistema_inventarios`,`factura`],(err, rows, fields) => {
      try {
        if (rows.length===0) {
          res.json(status="Void")
        } else {
          res.json(rows[0]);          
        }
      } catch (error) {
        res.json({status:"err"})
        console.log(error)
      }  
    });
  });


  

  router.get('/:param', (req, res) => {
    mysqlConnection.query(`
                           SELECT cod_factura,t_pago, valor,abono,fecha,estado, username,
                           idClientes, nombre,Direccion,telefono,celular, email, T_cliente
                           FROM factura INNER JOIN clientes ON Clientes_idClientes=idClientes 
                           ORDER BY cod_factura DESC;` , (err, rows, fields) => {
                           try {
                                if (rows.length===0) {
                                    res.json(status="Void")
                                } else {res.json(rows); }            
                            } catch (error) {
                                             res.json({status:"err"})
                                             console.log(error)
                              }  
    });
  });
  
  router.get('/:date1/:date2', (req, res) => {
      const {date1,date2} = req.params;  
      mysqlConnection.query(`
                             SELECT cod_factura,t_pago, valor,abono,fecha, estado ,username,
                             idClientes, nombre,Direccion,telefono,celular, email, T_cliente
                             FROM factura INNER JOIN clientes ON Clientes_idClientes=idClientes 
                             WHERE fecha BETWEEN ? AND ? ORDER BY cod_factura DESC;` ,[date1,date2], (err, rows, fields) => {
                             try {
                                  if (rows.length===0) {res.json(status="Void")
                                  } else {res.json(rows);}                                       
                              } catch (error) {
                                               res.json({status:"err"})
                                               console.log(error)
                                }  
      });
  });

  // delete An Invoice
router.delete('/:cod', (req, res) => {
  const { cod} = req.params;
  mysqlConnection.query('DELETE FROM factura WHERE cod_factura= ?', [cod], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'invoice moved'});
    } else {
      res.json({status: 'error'});
      console.log(err)
    }
  });
});

  router.put('/:cod', (req, res) => {
    const {t_pago,valor,abono, fecha} = req.body;
    const {cod} = req.params;
    
    const query = ` 
      UPDATE factura SET 
      t_pago=?,
      valor=?,
      abono=?,
      fecha=?
      WHERE cod_factura=?
      `;
    mysqlConnection.query(query, [t_pago,valor,abono, fecha,cod], (err, rows, fields) => {
      if(!err) {
        res.json({status:'Updated'});
       
      } else {
        console.log(err)
        res.json({status:'error'});
      }
    });
  });

  router.put('/:cod/:param', (req, res) => {
    const {cod,param} = req.params;
    const query = ` 
      UPDATE factura SET 
      estado=?
      WHERE cod_factura=?
      `;
    mysqlConnection.query(query, [param,cod], (err, rows, fields) => {
      if(!err) {
        res.json({status:'Updated'});
       
      } else {
        console.log(err)
        res.json({status:'error'});
      }
    });
  });
  

  module.exports = router; 


