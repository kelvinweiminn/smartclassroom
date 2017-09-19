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

router.get('/getmode', function(req,res){
        
        connection.query("SELECT mode FROM SenseitTP.Mode where type = 'actuation';" , function (err, result) {
            if (err) {
                console.error(err);
                return;
            }
            else{
                console.log("Retrieved mode Successfully!");
                res.send(result);
            }
        });
        
    });

router.get('/changemode/:mode', function(req,res){

    var mode = req.params.mode;
    
    connection.query("UPDATE `SenseitTP`.`Mode` SET `mode`='" + mode + "' WHERE `type`='actuation'" , function (err, result) {
        if (err) {
            console.error(err);
            return;
        }
        else{
            console.log("Changed mode Successfully!");
            res.send(result);
        }
    });
});

router.get('/getTemp', function(req,res){
    
    connection.query("SELECT * FROM SenseitTP.MockTemp ORDER BY Date DESC LIMIT 5" , function (err, result) {
        if (err) {
            console.error(err);
            return;
        }
        else{
            console.log("Retrieved Mock Temp Successfully!");
            res.send(result);
        }
    });
});

router.get('/getLight', function(req,res){
    
    connection.query("SELECT * FROM SenseitTP.MockLight ORDER BY Date DESC LIMIT 5" , function (err, result) {
        if (err) {
            console.error(err);
            return;
        }
        else{
            console.log("Retrieved Mock Light Successfully!");
            res.send(result);
        }
    });
});

module.exports = router;