if (typeof(PhusionPassenger) !== 'undefined') {
    PhusionPassenger.configure({ autoInstall: false });
}

const express = require('express');
const app = express();

const mysql = require('mysql');

function makeConnection(){
  return mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
  });
}

app.get('/apiDL/addone', async function(req, res) {
  addOne(req, res);
});

async function addOne(req, res){
  var connection = makeConnection();
  var send = {}
  connection.query('insert into downloads (dateTime) values (NOW());', function (error, results, fields) {
    if (error){
      send = {status: 'error'};
      console.log(error);
    }else{
      send = {status: 'ok'}
    }
    res.send(send)
  });
  connection.end();
}

if (typeof(PhusionPassenger) !== 'undefined') {
    app.listen('passenger');
} else {
    app.listen(3000);
}
