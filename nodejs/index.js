if (typeof(PhusionPassenger) !== 'undefined') {
    PhusionPassenger.configure({ autoInstall: false });
}

const express = require('express');
const app = express();

const path = require('path');
const fs = require('fs');
const dirTree = require("directory-tree");

const mysql = require('mysql');


app.get('/nodejs', function (req, res) {
  const directoryPath = path.join(__dirname, '../downloads');
  const filteredTree = dirTree(directoryPath, { exclude: /.ftpquota|index.html|listefichiers.json|index.js|style-dark.css|style.css|font-awesome.min.css|fontawesome-webfont.eot|fontawesome-webfont.svg|fontawesome-webfont.ttf|fontawesome-webfont.woff|fontawesome-webfont.woff2|FontAwesome.otf|IcoMoon-Free.ttf|css|fonts/ });

  fs.writeFile('listefichiers.json', JSON.stringify(filteredTree), function(err) {
    if(err) return res.send(err);
    res.send('ok');
  });
});

function makeConnection(){
  return mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
  });
}

app.post('/downloads/:method', async function(req, res) {
  var method = req.params.method
  switch(method.toLowerCase()){
    case 'addone':{
      addOne(req, res);
      break;
    }
    case 'gettotal':{
      getTotal(req, res);
      break;
    }
    case 'getdetails':{
      getDetails(req, res);
      break;
    }
    default:{
      res.send('Wrong method')
      break;
    }
  }
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
