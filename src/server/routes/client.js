const mysqlConnection  = require('../db/conection');
const express = require('express');
const router = express.Router();


  
  router.post('/', (req, res) => {
    const {id, nombre, direccion, telefono,celular, email, tipo} = req.body;
    console.log(id, nombre, direccion, telefono, celular, email, tipo);
    const query = `
    INSERT INTO clientes(idClientes, nombre, Direccion, telefono, celular, email, T_cliente) 
    VALUES (?,?,?,?,?,?,?)
    `;
    mysqlConnection.query(query, [id, nombre, direccion, telefono,celular, email, tipo], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Create'});
      } else {
        res.json({status: 'Error'});
        console.log(err)
      }
    });
  
  });

  router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM clientes', (err, rows, fields) => {
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
    mysqlConnection.query('SELECT * FROM clientes WHERE idClientes= ?', [id], (err, rows, fields) => {
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

 //UPDATE An client
 router.put('/:id', (req, res) => {
  const {Nombre, Direccion, Telefono,Celular, Email} = req.body;
  const {id} = req.params;
  
  const query = ` 
    UPDATE clientes SET 
    nombre=?,
    Direccion=?,
    telefono=?,
    celular=?,
    email=?
    WHERE idClientes=?
    `;
  mysqlConnection.query(query, [Nombre, Direccion, Telefono,Celular, Email, id], (err, rows, fields) => {
    if(!err) {
      res.json({status:'Updated'});
     
    } else {
      console.log(err)
      res.json({status:'error'});
    }
  });
});

  
  module.exports = router; 
