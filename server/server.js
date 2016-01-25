/**
 * Created by robbynewman on 1/21/16.
 */
var express = require('express');
var app = express();
var orders = require('./routes/orders');
var addresses = require('./routes/addresses');
var users = require('./routes/users');

var index = require('./routes/index');
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static('server/public'));
app.use('/addresses', addresses);
app.use('/orders', orders);
app.use('/users', users);

app.use('/', index);



var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log('listening on port', port);
});
