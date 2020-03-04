const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');

var app = express();
app.use(bodyparser.json());
var path = require("path");


var mysqlConnection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    port: '3306',
    password: '',
    database: 'database392',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

app.listen(8080, '127.0.0.1')
//app.listen(3000, () => console.log('Express server is runnig at port no : 3306'));


//Get all 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..','indexVue.html'));
});

//Get an employees
app.get('/data', (req, res) => {
    mysqlConnection.query('SELECT * FROM mycompany', (err, rows, fields) => {
        if (!err) {
            console.log(rows)
            res.send(rows);
        } else {
            console.log(err);
        }

    })
});
app.get('/datav1', (req, res) => {
    mysqlConnection.query(`SELECT * FROM mycompany where COMPA_MAIL LIKE '%5' `, (err, rows, fields) => {
        if (!err) {
            console.log(rows)
            res.send(rows);
        } else {
            console.log(err);
        }

    })
});
