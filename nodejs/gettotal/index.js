const express = require('express');
const app = express();

require('dotenv').config();

const mysql = require('mysql');

function makeConnection(){
  return mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
  });
}

app.get('/nodejs/gettotal', async function(req, res) {
  getTotal(req, res);
});

async function getTotal(req, res){
  var connection = makeConnection();

  var startDate = req.query.startdate
  var endDate = req.query.enddate
  var send = {}

  if(Date.parse(startDate) && Date.parse(endDate) && (Date.parse(startDate) <= Date.parse(endDate))){
    connection.query(`select COUNT(*) as total from downloads where dateTime BETWEEN '${startDate}' AND  '${endDate}'`, function (error, results, fields) {
      if (error)
        send = {status: 'error'}
      else{
        send = {status: 'ok', result: results}
      }
      res.send(send)
    });
  }else{
    connection.query('select COUNT(*) as total from downloads', function (error, results, fields) {
      if (error)
        send = {status: 'error'}
      else{
        send = {status: 'ok', result: results}
      }
      res.send(send)
    });
  }
  connection.end();
}

app.listen(3002);
