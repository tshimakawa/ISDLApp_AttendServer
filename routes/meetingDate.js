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

      let dateList = new Array();

      console.log(result);

      for(let i=0;i<result.length;i++){
        result[i].date = formatDate(result[i].date, 'yyyy年MM月dd日');//取得した講義日のフォーマットを変更
        dateList.push(result[i].date);
      }

      const response = {"status":200,
                        "data":dateList,
                        };
      res.send(JSON.stringify(response));
    }
  });
});

function formatDate (date, format) {
  format = format.replace(/yyyy/g, date.getFullYear());
  format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
  format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
  format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2));
  format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
  format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
  format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3));
  return format;
};

module.exports = router;
