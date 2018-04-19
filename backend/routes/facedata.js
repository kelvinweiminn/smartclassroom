var mysql = require('mysql');
const express = require('express');
const router = express.Router();

var connection = mysql.createConnection({
    host     : 'sensittp.cks7vws2tzgh.us-east-2.rds.amazonaws.com',
    user     : 'username',
    password : 'password',
    database : 'SenseitTP',
});

connection.connect();

router.get('/all', function(req,res){
    
    connection.query('Select listofPercentHappy as percentage, DateTime as time from SenseitTP.Emotions;' , function (err, result) {
        
        if (err) {
            console.error(err);
            return;
        }
        else{
            console.log("Queried Successfully!");
            res.send(result);
        }
    });

});
router.get('/:date/:startHour/:endHour', function(req,res){

        var date = req.params.date;
        var startHour = req.params.startHour;
        var endHour = req.params.endHour;
        
        connection.query('SELECT listofPercentHappy as percentage, DateTime as time, Location, Group_Name FROM SenseitTP.Emotions WHERE  DateTime between "' +date+ ' ' +startHour+ '%" and "' +date+ ' ' +endHour+ '%"', function (err, result) {
            if (err) {
                console.error(err);
                return;
            }
            else{
                console.log("Queried Successfully!");
                res.send(result);
            }
        });

    });
router.get('/:date', function(req,res){

        var date = req.params.date;
        
        connection.query('SELECT listofPercentHappy as percentage, DateTime as time, Location, Group_Name FROM SenseitTP.Emotions WHERE  DateTime like "' +date+ '%"', function (err, result) {
            if (err) {
                console.error(err);
                return;
            }
            else{
                console.log("Queried Successfully!");
                res.send(result);
            }
        });

    });   

router.get('/tempdata/:id/:date/:startHour/:endHour', function(req,res){

        var id = req.params.id;
        var date = req.params.date;
        var startHour = req.params.startHour;
        var endHour = req.params.endHour;
        

        connection.query('SELECT * FROM SenseitTP.TempHumi WHERE Device_ID = "' +id+ '" and  Date between "' +date+ ' ' +startHour+ '%" and "' +date+ ' ' +endHour+ '%"', function (err, result) {
            if (err) {
                console.error(err);
                return;
            }
            else{
                console.log("Queried Successfully!");
                res.send(result);
            }
        });

    });
    

module.exports = router;
