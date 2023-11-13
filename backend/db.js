const mysql = require('mysql');
const connection = mysql.createConnection({
    host: "mysql1",
    user: "root",
    password: "secret"
});
var serverConnected = false;

exports.initializeAll = (dbName, tableName) => {
    connection.connect()
}



exports.initializeAll = async (dbName, tableName) => {
    connection.connect((err) => {
        if(err){ throw err;}
    });
    var queryCreateDatabase = `CREATE DATABASE IF NOT EXISTS ${dbName}`;
    connection.query(queryCreateDatabase, (err) => {
        if(err){throw err;}
        else{
            console.log(`[db]: database \'${dbName}\' created.`);
        }
    });
    var getDatabase = `USE ${dbName}`;
    var checkTable = `DROP TABLE IF EXISTS ${tableName}`;
    var addTable = `CREATE TABLE IF NOT EXISTS ${tableName} (
        id          int unsigned NOT NULL auto_increment,
        topic       varchar(100) NOT NULL,
        data        varchar(100) NOT NULL,
        PRIMARY KEY (id))`;
    connection.query(getDatabase, (err) => {
        if(err){throw err}
        else{
            console.log(`[db]: Working with ${dbName} database.`);
            connection.query(checkTable, (err) => { //Delete if it exist first
                if(err){throw err;}
                console.log(`[db]: Deleting contents of ${tableName}.`);
            });
            connection.query(addTable, (err) => { //Create the table
                if(err){throw err;}
                console.log(`[db]: Creating table ${tableName}.`);
            });
        }
    });
}

exports.setTableConents = (dbName, tableName) => {
    var connection = mysql.createConnection(connParam);
    connection.connect((err) => {
        if(err){ throw err;}
    });
    var getDatabase = `USE ${dbName}`;
    var getTable = `SELECT * FROM ${tableName}`;
    connection.query(getDatabase, (err) => {
        if(err){throw err;}
        else{
            connection.query(getTable, (err, res) => {
                if(err){throw err}
                else{
                    var insertTable = `INSERT INTO ${tableName} (topic, data) VALUES ('Hello', 'World')`;
                    connection.query(insertTable, (err) => {
                        if(err){throw err;}
                        else{
                            console.log("Insertion Complete");
                        }
                    });
                }
                
            });
        }
    });
}

// exports.getTableContents = (dbName, tableName) => {
//     var connection = mysql.createConnection(connParam);
//     connection.connect((err) => {
//         if(err){ throw err;}
//     });
//     var getDatabase = `USE ${dbName}`;
//     var getTable = `SELECT * FROM ${tableName}`;
//     connection.query(getDatabase, (err) => {
//         if(err){throw err;}
//         else{
//             connection.query(getTable, (err, res) => {
//                 if(err){throw err;}
//                 else{
//                     return JSON.parse(JSON.stringify(res));
//                 }
//             });
//         }
//     })


// }
