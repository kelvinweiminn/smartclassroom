var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

const route = require('./routes/route.js');
app.use('/api', route);

//middle
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/', function(req, res){
  res.send("Invalid endpoint");
})

app.listen(3000);

//some change

//some more change
