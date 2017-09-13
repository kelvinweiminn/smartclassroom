var mysql = require('mysql');
const express = require('express');
const router = express.Router();

var connection = mysql.createConnection({
    host     : 'sensittp.cks7vws2tzgh.us-east-2.rds.amazonaws.com',
    user     : 'tpstudent',
    password : 'temasek2017',
    database : 'SenseitTP',
});

connection.connect();

router.get('/', function(req,res){
    
    connection.query('SELECT * FROM SenseitTP.Emotions' , function (err, result) {
        if (err) {
            console.error(err);
            return;
        }
        else{
            console.log("Queried Face data Successfully!");
            res.send(result);
        }
    });
    
});


module.exports = router;