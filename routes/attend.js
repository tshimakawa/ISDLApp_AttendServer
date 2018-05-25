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
  connection.query(`INSERT INTO attendance_data(date,uid) VALUES("${year}-${month}-${day}","${uid}")`,function(error,result,fields){
    if (error) throw error;
    else{
      console.log("success");
    }
  });

	const response = {};
	res.send(JSON.stringify(response));
});

module.exports = router;
