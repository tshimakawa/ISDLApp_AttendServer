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
        if (error) throw error;
        else if (result.length == 0){
          const response = {"status":200,
                            "data":{
                              "name":`"${name}"`,
                              "status":"未出席"
                            }
                          };
        	res.send(JSON.stringify(response));
        }else if (result.length == 1){
          const response = {"status":200,
                            "data":{
                              "name":`"${name}"`,
                              "status":"出席済"
                            }
                          };
        	res.send(JSON.stringify(response));
        }else{
          const response = {"status":600};
        }
      });
    }
  });

});

router.post('/',function(req,res){
	// const body=req.body.events[0];


  console.log(req.headers);


  connection.query(`SELECT id FROM attendance_data WHERE date = "${year}-${month}-${day}" AND uid ="${uid}"`,function(error,result,fields){
    if (error) throw error;
    else if (result.length == 0){

        if(error) throw error;
        else{

        }
      });
    }else if (result.length == 1) {

    }else{

    }
  });
});

module.exports = router;
