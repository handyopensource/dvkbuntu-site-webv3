const express = require('express');
const app = express();

const path = require('path');
const fs = require('fs');
const dirTree = require("directory-tree");

app.use( (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", 'true');
  next();
});

app.get('/nodejs/listFile', function (req, res) {
  const directoryPath = path.join(__dirname, '../../downloads');
  const filteredTree = dirTree(directoryPath, { exclude: /.ftpquota|.htaccess|index.html|listefichiers.json|index.js|style-dark.css|style.css|font-awesome.min.css|fontawesome-webfont.eot|fontawesome-webfont.svg|fontawesome-webfont.ttf|fontawesome-webfont.woff|fontawesome-webfont.woff2|FontAwesome.otf|IcoMoon-Free.ttf|css|fonts/ });

  fs.writeFile('../../listefichiers.json', JSON.stringify(filteredTree), function(err) {
    if(err) return res.send(err);
    res.send('ok');
  });
});

app.listen(3003, 'localhost');
