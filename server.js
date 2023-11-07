const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const port = 3000;
const host = '0.0.0.0';
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const connParam = {
    host: "mysql1",
    user: "root",
    password: "secret"
}
var connection = mysql.createConnection(connParam);

app.get('/init', (req, res) => {
    connection.connect((err) => {
    if(err){
        console.log(err);
    } console.log("Connection established");
    });
})

app.listen(port, host);