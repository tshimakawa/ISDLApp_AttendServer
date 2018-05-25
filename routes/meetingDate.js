var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  connection.query(`SELECT DISTINCT date FROM attendance_data `,function(error,result,fields){
    if(error) throw error;
    else{
      console.log(result.date);
      const response = {"status":200,
                        "data":result.date,
                        };
      res.send(JSON.stringify(response));
    }
  });
}

module.exports = router;
