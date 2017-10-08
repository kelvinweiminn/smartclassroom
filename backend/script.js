var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

//middle
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

const route = require('./routes/route.js');
app.use('/api', route);
const facedata = require('./routes/facedata.js');
app.use('/api/facedata', facedata);
// const mockdata = require('./routes/mockdata.js');
// app.use('/api/mockdata', mockdata);


app.get('/', function(req, res){
  res.send("Invalid endpoint");
})

app.listen(3000);
