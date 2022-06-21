const mysqlConnection  = require('../db/conection');
const express = require('express');
const router = express.Router();

  router.post('/', (req, res) => {
    const {CodProducto, NombreProducto, Referencia, Marca,Descripcion,Min,Cantidad,Precio,Categoria} = req.body;
    const query = `
    INSERT INTO productos(CodProducto, NombreProducto, Referencia, Marca,Descripcion,Min,Cantidad,Precio, Categoria) 
    VALUES (?,?,?,?,?,?,?,?,?)
    `; 
      mysqlConnection.query(query, [CodProducto, NombreProducto, Referencia, Marca,Descripcion,Min,Cantidad,Precio, Categoria], (err, rows, fields) => {
        if(!err) {
        res.json({status: 'Create'});
      } else {
        res.json({status: 'Error'});
        console.log(err)
      }
      });    
  });


  router.get('/:id', (req, res) => {
    const { id } = req.params; 
    mysqlConnection.query('SELECT * FROM productos WHERE CodProducto= ?', [id], (err, rows, fields) => {
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

  router.get('/', (req, res) => {  
    mysqlConnection.query('SELECT * FROM productos', (err, rows, fields) => {
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


  router.put('/:id', (req, res) => {
    const { Min, Descripcion,Cantidad,Precio,Categoria} = req.body;
    const {id} = req.params;
    
    const query = ` 
      UPDATE productos SET 
      Min=?,
      Descripcion=?,
      Cantidad=?,
      Precio=?,
      Categoria=?      
      WHERE CodProducto=?
      `;
    mysqlConnection.query(query, [ Min, Descripcion,Cantidad, Precio,Categoria, id], (err, rows, fields) => {
      if(!err) {
        res.json({status:'Updated'});
       
      } else {
        console.log(err)
        res.json({status:'error'});
      }
    });
  });
  

  module.exports = router; 


