const express = require('express');
const bodyParser = require('body-parser');
const backend = require("./backend/db");

const dbName = "webdb";
const tableName = "posts";

const port = 3000;
const host = '0.0.0.0';
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//var tableCreated = 0;
app.get('/init', (req, res) => {
    backend.initializeConnection("postDB", "posts")
    .then((data) => {
        console.log("COMPLETE");
        res.send("");
    })
    .catch((err) => {
        console.log(err);
    });

});

app.listen(port, host);