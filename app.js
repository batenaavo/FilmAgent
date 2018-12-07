 var express = require('express');
 const path = require('path');
 var bodyParser = require('body-parser');
 var logger = require('morgan');
 var cors = require('cors');
 var bodyParser = require('body-parser');
 const expressValidator = require('express-validator');




var app = express();
app.use(cors());
app.use(expressValidator());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/public')));
app.use(logger('dev'));

app.use(require('./routes'));

app.listen(5000);
console.log("Running on port 5000");