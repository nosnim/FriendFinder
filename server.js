var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 3000;


app.use(express.static('./app/public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.text())

require('./app/routing/apiRoutes.js')(app)

require('./app/routing/htmlRoutes.js')(app)

app.listen(PORT, function() {
  console.log("this app is up and running on port ", PORT);
  console.log('Node Version: ' + process.version);
})