const mysqlConnection  = require('../db/conection');
const express = require('express');
const router = express.Router();


  
  router.post('/', (req, res) => {
    const {id, nombre, direccion, telefono,celular, email, tipo,description} = req.body;

    const query = `
    INSERT INTO proveedor(idProveedor, nombre, direccion, telefono, celular, email, T_proveedor,descripcion) 
    VALUES (?,?,?,?,?,?,?,?)
    `;
    mysqlConnection.query(query, [id, nombre, direccion, telefono,celular, email, tipo,description], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Create'});
      } else {
        res.json({status: 'Error'});
        console.log(err)
      }
    });
  
  });

  router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM proveedor', (err, rows, fields) => {
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

 
  router.get('/:id', (req, res) => {
    const { id } = req.params; 
    mysqlConnection.query('SELECT * FROM proveedor WHERE idProveedor= ?', [id], (err, rows, fields) => {
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

 //UPDATE An 
 router.put('/:id', (req, res) => {
  const {nombre, direccion, telefono,celular, email,descripcion} = req.body;
  const {id} = req.params;
  
  const query = ` 
    UPDATE proveedor SET 
    nombre=?,
    direccion=?,
    telefono=?,
    celular=?,
    email=?,
    descripcion=?
    WHERE idProveedor=?
    `;
  mysqlConnection.query(query, [nombre, direccion, telefono,celular, email,descripcion, id], (err, rows, fields) => {
    if(!err) {
      res.json({status:'Updated'});
     
    } else {
      console.log(err)
      res.json({status:'error'});
    }
  });
});

  
  module.exports = router; 
