const express = require('express');
const router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'sensittp.cks7vws2tzgh.us-east-2.rds.amazonaws.com',
    user     : 'tpstudent',
    password : 'temasek2017',
    database : 'SenseitTP',
});
connection.connect();
//test data
    router.get('/testdata', function(req,res){
        connection.query('SELECT * FROM SenseitTP.TempHumi LIMIT 24', function (err, result) {
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
//temphumidity data      
    router.get('/temphumiddata/all', function(req,res){
        connection.query('SELECT * FROM SenseitTP.TempHumi', function (err, result) {
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

    router.get('/temphumiddata/device/:id', function(req,res){

        var id = req.params.id;

        connection.query('SELECT * FROM SenseitTP.TempHumi WHERE Device_ID = "' +id+ '"', function (err, result) {
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

    router.get('/temphumiddata/device/:id/:date', function(req,res){

        var id = req.params.id;
        var date = req.params.date;

        connection.query('SELECT * FROM SenseitTP.TempHumi WHERE Device_ID = "' +id+ '" and  Date LIKE "' +date+ '%"', function (err, result) {
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

    router.get('/temphumiddata/device/:id/:date/:hour', function(req,res){

        var id = req.params.id;
        var date = req.params.date;
        var hour = req.params.hour;
        var time = date + ' ' + hour;

        connection.query('SELECT * FROM SenseitTP.TempHumi WHERE Device_ID = "' +id+ '" and  Date LIKE "' +time+ '%"', function (err, result) {
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
    router.get('/temphumiddata/test/device/:id/:startDate/:endDate', function(req,res){

        var id = req.params.id;
        var startDate = req.params.startDate;
        var endDate = req.params.endDate;

        connection.query('SELECT * FROM SenseitTP.TempHumi where Device_ID = "' + id + '" AND (Date BETWEEN "' + startDate + '" AND  "' + endDate + '" OR Date like "' + endDate + '%");' , function (err, result) {
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

    router.get('/temphumiddata/date/:date', function(req,res){

        var date = req.params.date;
        console.log(date);

        connection.query('SELECT * FROM SenseitTP.TempHumi WHERE Date LIKE "' +date+ '%"', function (err, result) {
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
//co2 data
    router.get('/co2data/all', function(req,res){
        connection.query('SELECT * FROM SenseitTP.CO2', function (err, result) {
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

    router.get('/co2data/device/:id', function(req,res){

        var id = req.params.id;

        connection.query('SELECT * FROM SenseitTP.CO2 WHERE DeviceID = "' +id+ '"', function (err, result) {
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

    router.get('/co2data/device/:id/:date', function(req,res){

        var id = req.params.id;
        var date = req.params.date;

        connection.query('SELECT * FROM SenseitTP.CO2 WHERE DeviceID = "' +id+ '" and  Date LIKE "' +date+ '%"', function (err, result) {
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
    router.get('/co2data/device/:id/:startDate/:endDate', function(req,res){

        var id = req.params.id;
        var startDate = req.params.startDate;
        var endDate = req.params.endDate;

        connection.query('SELECT * FROM SenseitTP.CO2 where DeviceID = "' + id + '" AND (Date BETWEEN "' + startDate + '" AND  "' + endDate + '" OR Date like "' + endDate + '%");' , function (err, result) {
            
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

    router.get('/co2data/date/:date', function(req,res){

        var date = req.params.date;
        console.log(date);

        connection.query('SELECT * FROM SenseitTP.CO2 WHERE Date LIKE "' +date+ '%"', function (err, result) {
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
// light data
    router.get('/lightdata/all', function(req,res){
        connection.query('SELECT * FROM SenseitTP.Light', function (err, result) {
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
    router.get('/lightdata/device/:id', function(req,res){

        var id = req.params.id;

        connection.query('SELECT * FROM SenseitTP.Light WHERE Device_ID = "' +id+ '"', function (err, result) {
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
    router.get('/lightdata/device/:id/:date', function(req,res){

        var id = req.params.id;
        var date = req.params.date;

        connection.query('SELECT * FROM SenseitTP.Light WHERE Device_ID = "' +id+ '" and  Date LIKE "' +date+ '%"', function (err, result) {
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
    router.get('/lightdata/date/:date', function(req,res){

        var date = req.params.date;
        console.log(date);

        connection.query('SELECT * FROM SenseitTP.Light WHERE Date LIKE "' +date+ '%"', function (err, result) {
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
    router.get('/lightdata/test/device/:id/:startDate/:endDate', function(req,res){

        var id = req.params.id;
        var startDate = req.params.startDate;
        var endDate = req.params.endDate;

        connection.query('SELECT * FROM SenseitTP.Light where Device_ID = "' + id + '" AND (Date BETWEEN "' + startDate + '" AND  "' + endDate + '" OR Date like "' + endDate + '%");' , function (err, result) {
            
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
    

//average data
    router.get('/lightdata/average/device/:id/:startDate/:endDate/all', function(req,res){
        var id = req.params.id;  
        var startDate = req.params.startDate;
        var endDate = req.params.endDate;  
        connection.query('SELECT round(avg(value),2) as average, Date FROM SenseitTP.Light where (Device_ID = "' + id + '" ) and (Date BETWEEN "' + startDate + '" AND  "' + endDate + '" OR Date like "' + endDate + '%")' , 
        function (err, result) {
            
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
    router.get('/lightdata/average/device/:id/:startDate/:endDate', function(req,res){
        var startDate = req.params.startDate;
        var endDate = req.params.endDate;
        var id = req.params.id;
        connection.query('SELECT round(avg(value) ,2) as average, Date from SenseitTP.Light WHERE (Device_ID = "' + id + '") and (Date BETWEEN "' + startDate + '" AND  "' + endDate + '" OR Date like "' + endDate + '%") group by(date_format(Date, "%y-%m-%d")) order by Date' , function (err, result) {
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
    router.get('/tempdata/average/device/:id/:startDate/:endDate/all', function(req,res){
        var id = req.params.id;
        var startDate = req.params.startDate;
        var endDate = req.params.endDate;
        connection.query('SELECT round(avg(Temperature),2) as average FROM SenseitTP.TempHumi WHERE (Device_ID = "' + id + '") and (Date BETWEEN "' + startDate + '" AND  "' + endDate + '" OR Date like "' + endDate + '%") ' , 
        function (err, result) {
            
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
    router.get('/tempdata/average/device/:id/:startDate/:endDate', function(req,res){
        var startDate = req.params.startDate;
        var endDate = req.params.endDate;
        var id = req.params.id;
        connection.query('SELECT round(avg(Temperature) ,2) as average,Date from SenseitTP.TempHumi WHERE (Device_ID = "' + id + '") and (Date BETWEEN "' + startDate + '" AND  "' + endDate + '" OR Date like "' + endDate + '%") group by(date_format(Date, "%y-%m-%d")) order by Date' , function (err, result) {
            
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
    router.get('/humidata/average/device/:id/:startDate/:endDate/all', function(req,res){
        var id = req.params.id;
        var startDate = req.params.startDate;
        var endDate = req.params.endDate;
        connection.query('SELECT round(avg(Humidity),2) as average FROM SenseitTP.TempHumi WHERE (Device_ID = "' + id + '") and (Date BETWEEN "' + startDate + '" AND  "' + endDate + '" OR Date like "' + endDate + '%") ' , 
        function (err, result) {
            
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
    router.get('/humidata/average/device/:id/:startDate/:endDate', function(req,res){
        var startDate = req.params.startDate;
        var endDate = req.params.endDate;
        var id = req.params.id;
        connection.query('SELECT round(avg(Humidity) ,2) as average,Date from SenseitTP.TempHumi WHERE (Device_ID = "' + id + '") and (Date BETWEEN "' + startDate + '" AND  "' + endDate + '" OR Date like "' + endDate + '%") group by(date_format(Date, "%y-%m-%d")) order by Date' , function (err, result) {
            
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
    router.get('/co2data/average/device/:id/:startDate/:endDate/all', function(req,res){
        var id = req.params.id;
        var startDate = req.params.startDate;
        var endDate = req.params.endDate;
        connection.query('SELECT round(avg(Data),2) as average FROM SenseitTP.CO2 WHERE (DeviceID = "' + id + '") and (Date BETWEEN "' + startDate + '" AND  "' + endDate + '" OR Date like "' + endDate + '%")' , 
        function (err, result) {
            
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
    router.get('/co2data/average/device/:id/:startDate/:endDate', function(req,res){
        var startDate = req.params.startDate;
        var endDate = req.params.endDate;
        var id = req.params.id;
        connection.query('SELECT round(avg(Data) ,2) as average,Date from SenseitTP.CO2 WHERE (DeviceID = "' + id + '") and (Date BETWEEN "' + startDate + '" AND  "' + endDate + '" OR Date like "' + endDate + '%") group by(date_format(Date, "%y-%m-%d")) order by Date' , function (err, result) {
            
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
    
//highest data 
    router.get('/lightdata/max/device/:id', function(req,res){
        var id = req.params.id;
        connection.query('SELECT round(max(value),2) as max FROM SenseitTP.Light WHERE (Device_ID = "' + id + '") ' , 
        function (err, result) {
            
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
    router.get('/lightdata/max/device/:id/:startDate/:endDate', function(req,res){
        var startDate = req.params.startDate;
        var endDate = req.params.endDate;
        var id = req.params.id;
        connection.query('SELECT round(max(value) ,2) as max,Date from SenseitTP.Light WHERE (Device_ID = "' + id + '") and (Date BETWEEN "' + startDate + '" AND  "' + endDate + '" OR Date like "' + endDate + '%") group by(date_format(Date, "%y-%m-%d")) order by Date' , function (err, result) {
            
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
    router.get('/tempdata/max/device/:id', function(req,res){
        var id = req.params.id;
        connection.query('SELECT round(max(Temperature),2) as max FROM SenseitTP.TempHumi WHERE (Device_ID = "' + id + '") ' , 
        function (err, result) {
            
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
    router.get('/tempdata/max/device/:id/:startDate/:endDate', function(req,res){
        var startDate = req.params.startDate;
        var endDate = req.params.endDate;
        var id = req.params.id;
        connection.query('SELECT round(max(Temperature) ,2) as max,Date from SenseitTP.TempHumi WHERE (Device_ID = "' + id + '") and (Date BETWEEN "' + startDate + '" AND  "' + endDate + '" OR Date like "' + endDate + '%") group by(date_format(Date, "%y-%m-%d")) order by Date' , function (err, result) {
            
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
    
    router.get('/humidata/max/device/:id', function(req,res){
        var id = req.params.id;
        connection.query('SELECT round( max(Humidity),2) as  max FROM SenseitTP.TempHumi WHERE (Device_ID = "' + id + '") ' , 
        function (err, result) {
            
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
    router.get('/humidata/max/device/:id/:startDate/:endDate', function(req,res){
        var startDate = req.params.startDate;
        var endDate = req.params.endDate;
        var id = req.params.id;
        connection.query('SELECT round(max(Humidity) ,2) as max,Date from SenseitTP.TempHumi WHERE (Device_ID = "' + id + '") and (Date BETWEEN "' + startDate + '" AND  "' + endDate + '" OR Date like "' + endDate + '%") group by(date_format(Date, "%y-%m-%d")) order by Date' , function (err, result) {
            
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
    router.get('/co2data/max/device/:id', function(req,res){
        var id = req.params.id;   
        connection.query('SELECT round( max(Data),2) as  max FROM SenseitTP.CO2 WHERE (DeviceID = "' + id + '") ' , 
        function (err, result) {
            
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
    router.get('/co2data/max/device/:id/:startDate/:endDate', function(req,res){
        var startDate = req.params.startDate;
        var endDate = req.params.endDate;
        var id = req.params.id;
        connection.query('SELECT round(max(Data) ,2) as max,Date from SenseitTP.CO2 WHERE (DeviceID = "' + id + '") and (Date BETWEEN "' + startDate + '" AND  "' + endDate + '" OR Date like "' + endDate + '%") group by(date_format(Date, "%y-%m-%d")) order by Date' , function (err, result) {
            
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
//lowest data 
    router.get('/lightdata/min/device/:id', function(req,res){
        var id = req.params.id;
        connection.query('SELECT round(min(value),2) as min FROM SenseitTP.Light WHERE (Device_ID = "' + id + '") ' , 
        function (err, result) {
            
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
    router.get('/lightdata/min/device/:id/:startDate/:endDate', function(req,res){
        var startDate = req.params.startDate;
        var endDate = req.params.endDate;
        var id = req.params.id;
        connection.query('SELECT round(min(value) ,2) as min,Date from SenseitTP.Light WHERE (Device_ID = "' + id + '") and (Date BETWEEN "' + startDate + '" AND  "' + endDate + '" OR Date like "' + endDate + '%") group by(date_format(Date, "%y-%m-%d")) order by Date' , function (err, result) {
            
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
    router.get('/tempdata/min/device/:id', function(req,res){
        var id = req.params.id;    
        connection.query('SELECT round(min(Temperature),2) as  min FROM SenseitTP.TempHumi WHERE (Device_ID = "' + id + '") ' , 
        function (err, result) {
            
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
    router.get('/tempdata/min/device/:id/:startDate/:endDate', function(req,res){
        var startDate = req.params.startDate;
        var endDate = req.params.endDate;
        var id = req.params.id;
        connection.query('SELECT round(min(Temperature) ,2) as min,Date from SenseitTP.TempHumi WHERE (Device_ID = "' + id + '") and (Date BETWEEN "' + startDate + '" AND  "' + endDate + '" OR Date like "' + endDate + '%") group by(date_format(Date, "%y-%m-%d")) order by Date' , function (err, result) {
            
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
    router.get('/humidata/min/device/:id', function(req,res){
        var id = req.params.id;    
        connection.query('SELECT round( min(Humidity),2) as  min FROM SenseitTP.TempHumi WHERE (Device_ID = "' + id + '") ' , 
        function (err, result) {
            
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
    router.get('/humidata/min/device/:id/:startDate/:endDate', function(req,res){
        var startDate = req.params.startDate;
        var endDate = req.params.endDate;
        var id = req.params.id;
        connection.query('SELECT round(min(Humidity) ,2) as min,Date from SenseitTP.TempHumi WHERE (Device_ID = "' + id + '") and (Date BETWEEN "' + startDate + '" AND  "' + endDate + '" OR Date like "' + endDate + '%") group by(date_format(Date, "%y-%m-%d")) order by Date' , function (err, result) {
            
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
    router.get('/co2data/min/device/:id', function(req,res){
        var id = req.params.id;    
        connection.query('SELECT round( min(Data),2) as  min FROM SenseitTP.CO2 WHERE (DeviceID = "' + id + '") ' , 
        function (err, result) {
            
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
    router.get('/co2data/min/device/:id/:startDate/:endDate', function(req,res){
        var startDate = req.params.startDate;
        var endDate = req.params.endDate;
        var id = req.params.id;
        connection.query('SELECT round(min(Data) ,2) as min,Date from SenseitTP.CO2 WHERE (DeviceID = "' + id + '") and (Date BETWEEN "' + startDate + '" AND  "' + endDate + '" OR Date like "' + endDate + '%") group by(date_format(Date, "%y-%m-%d")) order by Date' , function (err, result) {
            
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

router.get('/battery/all', function(req,res){

    connection.query('SELECT * FROM SenseitTP.Battery limit 10;' , function (err, result ){
        if (err) {
            console.error(err);
            return;
        }
        else{
            console.log("Queried Successfully!");
            res.send(result);
        }
    })
});

router.get('/battery/:id', function(req,res){
    var id = req.params.id;
    connection.query('select Value, Date from SenseitTP.Battery where Device_ID = "'+ id +'" and date = (select max(Date) from SenseitTP.Battery where Device_ID = "'+id+'")' , function (err, result ){
        if (err) {
            console.error(err);
            return;
        }
        else{
            console.log("Queried Successfully!");
            res.send(result);
        }
        })
});



router.get('/notifications/all', function(req,res){
    
    connection.query('SELECT * FROM SenseitTP.Notification order by Date DESC' , function (err, result) {
        
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
//range data
    router.get('/temp/maxdata/:id/:startDate/:endDate', function(req,res){
            var startDate = req.params.startDate;
            var endDate = req.params.endDate;
            var id = req.params.id;
            connection.query('select Temperature as max,Date from SenseitTP.TempHumi where (Temperature= (select max(Temperature) from SenseitTP.TempHumi where (Date between "' + startDate + '" and "' + endDate + '" or Date like "' + endDate + '%") and Device_ID="' + id + '" )) and (Date between "' + startDate + '" and "' + endDate + '" or Date like "' + endDate + '%") and Device_ID="' + id + '"  limit 1;' , function (err, result) {
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
    router.get('/temp/mindata/:id/:startDate/:endDate', function(req,res){
        var startDate = req.params.startDate;
        var endDate = req.params.endDate;
        var id = req.params.id;
        connection.query('select Temperature as min,Date from SenseitTP.TempHumi where (Temperature= (select min(Temperature) from SenseitTP.TempHumi where (Date between "' + startDate + '" and "' + endDate + '" or Date like "' + endDate + '%") and Device_ID="' + id + '" )) and (Date between "' + startDate + '" and "' + endDate + '" or Date like "' + endDate + '%") and Device_ID="' + id + '"  limit 1;' , function (err, result) {
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
    router.get('/humi/maxdata/:id/:startDate/:endDate', function(req,res){
            var startDate = req.params.startDate;
            var endDate = req.params.endDate;
            var id = req.params.id;
            connection.query('select Humidity as max,Date from SenseitTP.TempHumi where (Humidity= (select max(Humidity) from SenseitTP.TempHumi where (Date between "' + startDate + '" and "' + endDate + '" or Date like "' + endDate + '%") and Device_ID="' + id + '" )) and (Date between "' + startDate + '" and "' + endDate + '" or Date like "' + endDate + '%") and Device_ID="' + id + '"  limit 1;' , function (err, result) {
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
    router.get('/humi/mindata/:id/:startDate/:endDate', function(req,res){
        var startDate = req.params.startDate;
        var endDate = req.params.endDate;
        var id = req.params.id;
        connection.query('select Humidity as min,Date from SenseitTP.TempHumi where (Humidity= (select min(Humidity) from SenseitTP.TempHumi where (Date between "' + startDate + '" and "' + endDate + '" or Date like "' + endDate + '%") and Device_ID="' + id + '" )) and (Date between "' + startDate + '" and "' + endDate + '" or Date like "' + endDate + '%") and Device_ID="' + id + '"  limit 1;' , function (err, result) {
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
     router.get('/co2/maxdata/:id/:startDate/:endDate', function(req,res){
            var startDate = req.params.startDate;
            var endDate = req.params.endDate;
            var id = req.params.id;
            connection.query('select Data as max,Date from SenseitTP.CO2 where (Data= (select max(Data) from SenseitTP.CO2 where (Date between "' + startDate + '" and "' + endDate + '" or Date like "' + endDate + '%") and DeviceID="' + id + '" )) and (Date between "' + startDate + '" and "' + endDate + '" or Date like "' + endDate + '%") and DeviceID="' + id + '"  limit 1;' , function (err, result) {
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
    router.get('/co2/mindata/:id/:startDate/:endDate', function(req,res){
        var startDate = req.params.startDate;
        var endDate = req.params.endDate;
        var id = req.params.id;
        connection.query('select Data as min,Date from SenseitTP.CO2 where (Data= (select min(Data) from SenseitTP.CO2 where (Date between "' + startDate + '" and "' + endDate + '" or Date like "' + endDate + '%") and DeviceID="' + id + '" )) and (Date between "' + startDate + '" and "' + endDate + '" or Date like "' + endDate + '%") and DeviceID="' + id + '"  limit 1;' , function (err, result) {
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
     router.get('/light/maxdata/:id/:startDate/:endDate', function(req,res){
            var startDate = req.params.startDate;
            var endDate = req.params.endDate;
            var id = req.params.id;
            connection.query('select Value as max,Date from SenseitTP.Light where (Value= (select max(Value) from SenseitTP.Light where (Date between "' + startDate + '" and "' + endDate + '" or Date like "' + endDate + '%") and Device_ID="' + id + '" )) and (Date between "' + startDate + '" and "' + endDate + '" or Date like "' + endDate + '%") and Device_ID="' + id + '"  limit 1;' , function (err, result) {
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
    router.get('/light/mindata/:id/:startDate/:endDate', function(req,res){
        var startDate = req.params.startDate;
        var endDate = req.params.endDate;
        var id = req.params.id;
        connection.query('select Value as min,Date from SenseitTP.Light where (Value= (select min(Value) from SenseitTP.Light where (Date between "' + startDate + '" and "' + endDate + '" or Date like "' + endDate + '%") and Device_ID="' + id + '" )) and (Date between "' + startDate + '" and "' + endDate + '" or Date like "' + endDate + '%") and Device_ID="' + id + '"  limit 1;' , function (err, result) {
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
    router.get('/timetable/:location/:date', function(req,res){
        var location = req.params.location;
        var date = req.params.date;
        connection.query('select * from SenseitTP.TimeTable where Time like "'+date+'%" and Location = "'+location+'"' , function (err, result) {
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



//post mock data
// router.get('/facedata/all', function(req,res){
    
//     connection.query('SELECT * FROM SenseitTP.Emotions' , function (err, result) {
        
//         if (err) {
//             console.error(err);
//             return;
//         }
//         else{
//             console.log("Queried Face data Successfully!");
//             res.send(result);
//         }
//     });

// });

module.exports = router;