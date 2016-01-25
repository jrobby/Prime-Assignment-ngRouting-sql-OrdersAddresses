/**
 * Created by robbynewman on 1/23/16.
 */
/**
 * Created by robbynewman on 1/22/16.
 */
/**
 * Created by robbynewman on 1/22/16.
 */
var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = process.env.DATABASE_URL ||
    'postgres://localhost:5432/sql_angular_routing_weekend';

//Get all addresses
router.get('/', function(req, res) {
    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle Errors
        if(err) {
            console.log(err);
        }

        // SQL Query > Select Data
        var query = client.query('SELECT * FROM users;');

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