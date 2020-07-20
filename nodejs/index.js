const express = require('express');
const path = require('path');
const fs = require('fs');
const dirTree = require("directory-tree");
const app = express();

app.get('/', function (req, res) {
  const directoryPath = path.join(__dirname, '../downloads');
  const filteredTree = dirTree(directoryPath, { exclude: /.ftpquota|index.html|listefichiers.json|index.js/ });

  fs.writeFile('listefichiers.json', JSON.stringify(filteredTree), function(err) {
    if(err) return res.send(err)
    res.send('ok')
  });
})

app.listen(3000)
