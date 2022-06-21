const mysqlConnection  = require('../db/conection');
const express = require('express');
const router = express.Router();

router.get('/:id/:pass', (req, res) => {
    const {id, pass} = req.params;  
    mysqlConnection.query('SELECT id, password, rol, username,estado From usuarios WHERE id=? AND password=?',[id,pass], (err, rows, fields) => {
      try {
        if (rows.length===0) {
          res.json({status:"Void"})
        } else { 
          res.json(rows[0]);         
        }
      } catch (error) {
        res.json({status:"Error"})
        console.log(error)
      }  
    });
});

  module.exports = router; 
