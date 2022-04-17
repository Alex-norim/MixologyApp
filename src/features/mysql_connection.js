
const mysql = require('mysql');


let connection = mysql.createConnection({
    port: "3333",
    host: "127.0.0.1",
    user: "root",
    password: "root"
});

module.exports = connection;