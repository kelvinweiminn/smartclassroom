var express = require('express');
var app = express();
var mysql = require('mysql');
var moment = require('moment-timezone');
var request = require("request");

//middle
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    database : 'test',
});

connection.connect();

app.post('/postmock', function(request, response){

    //Global variables
    var tablename;
    var columnname;
    
    var type = request.body.Type;
    var data = request.body.Data;

    data = parseInt(data);
    var date = moment().format("YYYY-MM-DD HH:mm:ss");
    
    if ( type == 'Light'){
        
        tablename = 'MockLight';
        columnname = 'Light';
        
    }else{
        
        tablename = 'MockTemp';
        columnname = 'Temperature';
    }

    var postData = {
        'tablename': tablename,
        'columnname': columnname,
        'data': data,
        'date': date
    }

    response.send(postData);
    queryDB(postData);
    actuate(postData);
});

function queryDB(postData){
    connection.query("INSERT INTO " + postData.tablename + " (Date, "+postData.columnname+") VALUES ('"+postData.date+"', '"+postData.data+"')", function (err, results, fields) {
        if(err) {
            console.log("DB Query error:: "+err);
        } else {
            console.log("Insert successfully");
        }
    });
}

function actuate(postData){
    if(postData.columnname === 'Light'){
        console.log("Actuating Light");

        if( postData.data > 0){

            var options = { method: 'GET',
            url: 'http://192.168.2.81:8181/device.cgi',
            qs: { dev: '1', cmd: '134' },
            headers: { 
                'postman-token': 'f441bf5a-9834-c2ce-4271-25d99b8fcfdb',
                'cache-control': 'no-cache' } 
            };
          
            request(options, function (error, response, body) {
                if (error) throw new Error(error);
            
                console.log("Response: " + body);
            });
            console.log("Light have been turned OFF!");

        }else{
            console.log("Light is OK!");
        }
    }

    else if (postData.columnname === 'Temperature'){
        console.log("Actuating Temperature");

        if( postData.data >=25 ){

            var options = { method: 'GET',
            url: 'http://192.168.2.81:8181/device.cgi',
            qs: { dev: '0', cmd: '135' },
            headers: { 
                'postman-token': 'f441bf5a-9834-c2ce-4271-25d99b8fcfdb',
                'cache-control': 'no-cache' } 
            };
          
            request(options, function (error, response, body) {
                if (error) throw new Error(error);
            
                console.log("Response: " + body);
            });

            console.log("A/C have been turned ON!");

        }else if( postData.data <25 ){

            var options = { method: 'GET',
            url: 'http://192.168.2.81:8181/device.cgi',
            qs: { dev: '0', cmd: '134' },
            headers: { 
                'postman-token': 'f441bf5a-9834-c2ce-4271-25d99b8fcfdb',
                'cache-control': 'no-cache' } 
            };
          
            request(options, function (error, response, body) {
                if (error) throw new Error(error);
            
                console.log("Response: " + body);
            });

            console.log("A/C have been turned OFF!");

        }else{

            console.log("A/C is correct!");
        }
    }
}

app.get('/getmode', function(req,res){
    
    connection.query("SELECT mode FROM test.mode where type = 'actuation';" , function (err, result) {
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

app.get('/changemode/:mode', function(req,res){

    var mode = req.params.mode;

    connection.query("UPDATE `test`.`mode` SET `mode`='" + mode + "' WHERE `type`='actuation'" , function (err, result) {
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

app.get('/getTemp', function(req,res){

    connection.query("SELECT * FROM test.mocktemp ORDER BY Date DESC LIMIT 3" , function (err, result) {
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

app.get('/getLight', function(req,res){

    connection.query("SELECT * FROM test.mocklight ORDER BY Date DESC LIMIT 5" , function (err, result) {
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

app.listen(4000);
console.log("Server running on port 4000");