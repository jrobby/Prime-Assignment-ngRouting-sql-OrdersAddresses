/**
 * Created by robbynewman on 1/22/16.
 */
var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = process.env.DATABASE_URL ||
    'postgres://localhost:5432/sql_angular_routing_weekend';

//get all orders
router.get('/', function(req, res) {
   // var id = {id: request.query.id};
    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle Errors
        if(err) {
            console.log(err);
        }

        // SQL Query > Select Data
        var query = client.query('SELECT * FROM orders;');

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            client.end();
            return res.json(results);
        });

    });

});
////
//
//router.get('/:id/:dateStart/:dateEnd', function(request, response){
//    var results = [];

////grab parameters of GET request in url
//var id = request.params.id;
//var dateStart = request.params.dateStart;
//var dateEnd = request.params.dateEnd;
//
////convert to ISODate for SQL query
//dateStart = new Date(dateStart).toISOString();
//dateEnd = new Date(dateEnd).toISOString();
////get all orders
router.get('/:id/:start/:end', function(req, res) {


    var results = [];
    var dateStart = req.params.start;
    var dateEnd = req.params.end;
    var id = req.params.id;

    dateStart= new Date (dateStart).toISOString().slice(0,10);
    console.log('dateStart', dateStart);
    dateEnd = new Date (dateEnd).toISOString().slice(0,10);
    console.log('dateEnd', dateEnd);
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle Errors
        if(err) {
            console.log(err);
        }

        // SQL Query > Select Data
        var query = client.query('SELECT * FROM orders WHERE orders.user_ID=$1' +
            'AND order_date > $2 AND order_date < $3 ' +
            'ORDER BY order_date', [id, dateStart, dateEnd]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            client.end();
            return res.json(results);
        });

    });

});


module.exports = router;