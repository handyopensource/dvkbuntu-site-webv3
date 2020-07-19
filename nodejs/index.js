const path = require('path');
const fs = require('fs');
const dirTree = require("directory-tree");

const directoryPath = path.join(__dirname, '../downloads');
const filteredTree = dirTree(directoryPath, { exclude: /index.html|listefichiers.json|index.js/ });

fs.writeFile('listefichiers.json', JSON.stringify(filteredTree), function(err) {
    if(err) return console.log(err)
    console.log('ok')
});
