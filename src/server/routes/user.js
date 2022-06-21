const mysqlConnection  = require('../db/conection');
const express = require('express');
const router = express.Router();

  router.post('/', (req, res) => {
    const {id, username, password,email,rol,estado, category} = req.body;
    const query = `
    INSERT INTO usuarios(id, username,password,email,rol,estado,categoria) 
    VALUES (?,?,?,?,?,?,?)
    `;
    mysqlConnection.query(query, [id, username, password,email,rol,estado, category], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Create'});
      } else {
        res.json({status: 'Error'});
        console.log(err)
      }
    });
  });

  router.get('/:id/:cod', (req, res) => {
    const { id , cod } = req.params; 
    if(cod==="qwQQKYKD32336*.DSDPOIIDHSBDJSD3651asdsdsSDFDF"){
      mysqlConnection.query('SELECT * FROM usuarios WHERE id= ?', [id], (err, rows, fields) => {
        try {
          if (rows.length===0) {
            res.json(status="Void")
          } else {
            res.json(rows[0]);          
          }
        } catch (error) {
          res.json({status:"err"})
        }  
      });
    }else{
   
      res.json(status="Void")}
  });



  router.get('/:cod', (req, res) => {  
    const { cod } = req.params; 
    if(cod==="qwQQKYKD32336*.DSDPOIIDHSBDJSD3651asdsdsSDFDF"){
      mysqlConnection.query('SELECT * FROM usuarios', (err, rows, fields) => {
        try {
          if (rows.length===0) {
            res.json(status="Void")
          }else {
                 res.json(rows); 
          }
        } catch (error) {
          res.json({status:"err"})
          console.log(err)
        }  
      });    
    }else{res.json(status="Void")}
  });

  router.put('/:id', (req, res) => {
    const { username,password,email,rol,estado,categoria} = req.body;
    const {id} = req.params;
    
    const query = ` 
      UPDATE usuarios SET 
      username=?,
      password=?,
      email=?,
      rol=?,
      estado=?,
      categoria=?
      WHERE id=?
      `;
    mysqlConnection.query(query, [username,password,email,rol,estado,categoria, id], (err, rows, fields) => {
      if(!err) {
        res.json({status:'Updated'});
       
      } else {
        console.log(err)
        res.json({status:'error'});
      }
    });
  });

  module.exports = router; 
