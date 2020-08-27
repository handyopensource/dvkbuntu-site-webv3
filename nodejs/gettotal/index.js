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

app.use( (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", 'true');
  next();
});

app.get('/nodejs/gettotal', async function(req, res) {
  console.log(req);
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

app.listen(3002, 'localhost');
