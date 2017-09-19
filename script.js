var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

const route = require('./routes/route.js');
app.use('/api', route);
const facedata = require('./routes/facedata.js');
app.use('/api/facedata', facedata);
const mockdata = require('./routes/mockdata.js');
app.use('/api/mockdata', mockdata);

//middle
app.use(cors);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/', function(req, res){
  res.send("Invalid endpoint");
})

app.listen(3000);
