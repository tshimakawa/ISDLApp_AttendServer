var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'isdl-admin',
  password : 'Isdl443@',
  database : 'db_isdl'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  connection.query(`SELECT DISTINCT date FROM attendance_data `,function(error,result,fields){
    if(error) throw error;
    else{
      console.log(result);
      const response = {"status":200,
                        "data":result.date,
                        };
      res.send(JSON.stringify(response));
    }
  });
});

module.exports = router;
