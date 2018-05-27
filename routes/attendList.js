var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'isdl-admin',
  password : 'Isdl443@',
  database : 'db_isdl'
});

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  const headers = req.headers;
  let date = headers.date;
  console.log(headers);
  console.log(date);


  connection.query(`select users.name, date from users left outer join (select name,date from attendance_data where date = "${date}") as attendance on users.name = attendance.name`,function(error,result,fields){
    if(error) throw error;
    else{

      console.log(result);

      let attendList = new Array();
      let absentList = new Array();

      for(let i=0;i<result.length;i++){
        if(result[i].date == null){
          absentList.push(result[i].name);
        }else{
          attendList.push(result[i].name);
        }
      }
      const response = {"status":200,
                        "data":{
                          "attendList":attendList,
                          "absentList":absentList
                        },
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
