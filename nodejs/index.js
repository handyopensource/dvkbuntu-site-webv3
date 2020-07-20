if (typeof(PhusionPassenger) !== 'undefined') {
    PhusionPassenger.configure({ autoInstall: false });
}

const express = require('express');
const app = express();

const path = require('path');
const fs = require('fs');
const dirTree = require("directory-tree");


app.get('/nodejs', function (req, res) {
  const directoryPath = path.join(__dirname, '../downloads');
  const filteredTree = dirTree(directoryPath, { exclude: /.ftpquota|index.html|listefichiers.json|index.js/ });

  fs.writeFile('listefichiers.json', JSON.stringify(filteredTree), function(err) {
    if(err) return res.send(err);
    res.send('ok');
    res.end(history.back(););
  });
});

if (typeof(PhusionPassenger) !== 'undefined') {
    app.listen('passenger');
} else {
    app.listen(3000);
}
