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

app.get('/apiDL/getdetails', async function(req, res) {
  getDetails(req, res);
});

async function getDetails(req, res){
  var connection = makeConnection();

  var startDate = req.query.startdate
  var endDate = req.query.enddate

  if(Date.parse(startDate) && Date.parse(endDate) && (Date.parse(startDate) <= Date.parse(endDate))){
    connection.query(`select * from downloads where dateTime BETWEEN '${startDate}' AND  '${endDate}'`, function (error, results, fields) {
      if (error)
        send = {status: 'error'}
      else{
        send = {status: 'ok', result: results}
      }
      res.send(send)
    });
  }else{
    connection.query('select * from downloads', function (error, results, fields) {
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

if (typeof(PhusionPassenger) !== 'undefined') {
    app.listen('passenger');
} else {
    app.listen(3000);
}
