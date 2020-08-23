const express = require('express');
const app = express();

const mysql = require('mysql');

function makeConnection(){
  return mysql.createConnection({
    host     : 'localhost',
    user     : 'paulluxwaffl_downloads',
    password : 'elPolo37.db',
    database : 'paulluxwaffl_downloads',
  });
}

app.get('/nodejs/addone', async function(req, res) {
    addOne(req, res);
});

async function addOne(req, res){
  var connection = makeConnection();
  var send = {}
  connection.query('insert into downloads (dateTime) values (NOW());', function (error, results, fields) {
    if (error){
      send = {status: error};
    }else{
      send = {status: 'ok'}
    }
    res.send(send)
  });
  connection.end();
}

app.listen(3000);
