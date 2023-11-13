const express = require('express');
const bodyParser = require('body-parser');
const backend = require("./backend/db");
const mysql = require('mysql');

//connections for express
const port = 3000;
const host = '0.0.0.0';
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//Connection for mysql
var dbName = "webdb";
var tableName = "posts";
var isConnected = false;
const connection = mysql.createConnection({
    host: "mysql1",
    user: "root",
    password: "secret"
})


app.get('/init', (request, response) => {
    if(isConnected){
        console.log(`[SERVER] : Already established a connection to mysql.`);
        return;
    }

    connection.connect((err) => {
        if(err){throw err;}
        console.log(`[SERVER] : Initialize connection to mysql.`)
        isConnected = true;
    })

    var queryCreateDatabase = `CREATE DATABASE IF NOT EXISTS ${dbName}`;
    connection.query(queryCreateDatabase, (err) => {
        if(err){throw err;}
        console.log(`[SERVER] : database \'${dbName}\' created.`);
    });

    var getDatabase = `USE ${dbName}`;
    var checkTable = `DROP TABLE IF EXISTS ${tableName}`;
    var addTable = `CREATE TABLE IF NOT EXISTS ${tableName} (
        id          int unsigned NOT NULL auto_increment,
        topic       varchar(100) NOT NULL,
        data        varchar(100) NOT NULL,
        PRIMARY KEY (id))`;

    connection.query(getDatabase, (err) => {
        if(err){throw err;}
        console.log(`[SERVER] : Working with ${dbName} database.`);
        connection.query(checkTable, (err) => {
            if(err){throw err;}
            console.log(`[SERVER] : Deleting contents of ${tableName}.`);
        });
        connection.query(addTable, (err) => { //Create the table
            if(err){throw err;}
            console.log(`[SERVER] : Creating table ${tableName}.`);
        });
    }); 
});

app.get('/get', (req, res) => {
    var getTable = `SELECT * FROM ${tableName}`;
    connection.query(getTable, (err, result) => {
        if(err){throw err;}
        if(result.length == 0){console.log("Empty Table")};
        res.send(result);
    });
});

app.listen(port, host);