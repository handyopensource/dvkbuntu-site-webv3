if (typeof(PhusionPassenger) !== 'undefined') {
    PhusionPassenger.configure({ autoInstall: false });
}

const express = require('express');
const app = express();

const mysql = require('mysql');
const path = require('path');

const fs = require('fs');
const dirTree = require("directory-tree");

function makeConnection(){
  return mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
  });
}

app.get('/nodejs/listFile', function (req, res) {
  const directoryPath = path.join(__dirname, '../../downloads');
  const filteredTree = dirTree(directoryPath, { exclude: /.ftpquota|.htaccess|index.html|listefichiers.json|index.js|style-dark.css|style.css|font-awesome.min.css|fontawesome-webfont.eot|fontawesome-webfont.svg|fontawesome-webfont.ttf|fontawesome-webfont.woff|fontawesome-webfont.woff2|FontAwesome.otf|IcoMoon-Free.ttf|css|fonts/ });

  fs.writeFile('listefichiers.json', JSON.stringify(filteredTree), function(err) {
    if(err) return res.send(err);
    res.send('ok');
  });
});

app.get('/nodejs/addone', async function(req, res) {
  addOne(req, res);
});

app.get('/nodejs/getdetails', async function(req, res) {
  getDetails(req, res);
});

app.get('/nodejs/gettotal', async function(req, res) {
  getTotal(req, res);
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

if (typeof(PhusionPassenger) !== 'undefined') {
    app.listen('passenger');
} else {
    app.listen(3000);
}
