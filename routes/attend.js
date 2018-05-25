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
    if (error) throw error;
    else if (result.length == 0){
      connection.query(`INSERT INTO attendance_data(date,uid) VALUES("${year}-${month}-${day}","${uid}")`,function(error,result,fields){
        if (error) throw error;
        else{
          const response = {"status":200};
        	res.send(JSON.stringify(response));
          console.log("success");
        }
      });
    }else if (result.length == 1) {
      const response = {"status":600};
    	res.send(JSON.stringify(response));
    }else{

    }
  });
});

module.exports = router;
