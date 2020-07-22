console.log("Test");

function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  }
  rawFile.send(null);
}

function formatSizeUnits(bytes){
  if      (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + " Go"; }
  else if (bytes >= 1048576)    { bytes = (bytes / 1048576).toFixed(2) + " Mo"; }
  else if (bytes >= 1024)       { bytes = (bytes / 1024).toFixed(2) + " Ko"; }
  else if (bytes >= 1)          { bytes = bytes + " o"; }
  else                          { bytes = "0 o"; }
  return bytes;
}

readTextFile("../nodejs/listefichiers.json", function(text) {
  var data = JSON.parse(text);
  console.log(data);
  var obj, objResult, sizeUnits, dbParam, xmlhttp, myObj, x, txt = "";
  obj = data;
  console.log(obj);
  objResult = obj.children;
  console.log(objResult);
  dbParam = JSON.stringify(objResult);
  console.log(dbParam);
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myObj = JSON.parse(dbParam);

      txt += "<table border='2'>"
      txt += "<tr style='background-color: #555; color: white;'><td>Nom du fichier</td><td>Taille en octet</td><td>Liens de téléchargement</td></tr>";
      color = '#b6ced4';
      for (x in myObj) {
        linkDL = 'https://www.dvkbuntu.org/downloads/' + myObj[x].name;
        strLinkDL = linkDL.toString();
        sizeUnits = formatSizeUnits(myObj[x].size).replace(".", ",");
        txt += "<tr style='background-color:" + color +"; color: black;'><td>" + myObj[x].name + "</td><td>" + sizeUnits + '</td><td><a href="' + linkDL + '" target="page">' + myObj[x].name + "</a></td></tr>";
        if (color === '#b6ced4') {
          color = '#c3d4b6'
        } else {
          color = '#b6ced4';
        }
      }
      txt += "</table>"
      console.log(txt);
      document.getElementById("demo").innerHTML = txt;
    }
  };
  xmlhttp.open("POST", "index.html", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("x=" + dbParam);
  document.getElementById('myiFrame').style.display='none';
});
