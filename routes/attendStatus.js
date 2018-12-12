var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'isdl-admin',
  password : 'Isdl443@',
  database : 'db_isdl'
});

router.get('/', function(req, res, next) {
  const headers = req.headers;
  const uid = headers.uid;
  connection.query(`SELECT name FROM users where uid ="${uid}"`,function(error,result,fields){
    if (error) throw error;
    else{
      const name = result[0].name;
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth()+1;
      const day = date.getDate();
      connection.query(`SELECT id FROM attendance_data WHERE date = "${year}-${month}-${day}" AND uid ="${uid}"`,function(error,result,fields){
        if (error){throw error;
          res.status(800);
          res.send();
        }else{
          let response;
          if(result.length == 0){
            res.status(200);
            response = {
              "name":name,
              "status":"未出席"
            };
          }else if (result.length == 1) {
            res.status(200);
            response = {
              "name":name,
              "status":"出席済"
            };
          }else{
            res.status(600);
            response = null;
          }
          res.send(JSON.stringify(response));
        }
      });
    }
  });
});

module.exports = router;
