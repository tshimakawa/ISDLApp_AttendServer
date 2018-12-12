var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'isdl-admin',
  password : 'Isdl443@',
  database : 'db_isdl'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

});

router.post('/',function(req,res){
	// const body=req.body.events[0];
  console.log(req.headers);
  const headers = req.headers;
  const uid = headers.uid;
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth()+1;
  const day = date.getDate();
  connection.query(`SELECT id FROM attendance_data WHERE date = "${year}-${month}-${day}" AND uid ="${uid}"`,function(error,result,fields){
    if (error) {
      throw error;
      res.status(800);
    }else if (result.length == 0){
      connection.query(`SELECT name FROM users where uid ="${uid}"`,function(error,result,fields){
        if(error){
          throw error;
          res.status(801);
        }else{
          const name = result[0].name;
          connection.query(`INSERT INTO attendance_data(date,uid,name) VALUES("${year}-${month}-${day}","${uid}","${name}")`,function(error,result,fields){
            if (error) {
              throw error;
              res.status(802)
            }
            else{
              res.status(200);
            }
          });
        }
      });
    }else if (result.length == 1) {
      res.status(300);
    }else{
      res.status(600);
    }
    res.send();
  });
});

module.exports = router;
