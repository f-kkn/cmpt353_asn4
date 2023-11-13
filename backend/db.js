const mysql = require('mysql');
const connParam = {
    host: "mysql1",
    user: "root",
    password: "secret"
};
exports.initializeConnection = async (dbName, tableName) => {
    var connection = mysql.createConnection(connParam);
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
    connection.query(getDatabase, (err) => {
        if(err){throw err}
        else{
            console.log(`Working with ${dbName} database`);
            
        }
    });

}
