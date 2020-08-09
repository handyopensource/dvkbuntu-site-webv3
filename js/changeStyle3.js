function changementdestyle() {

  //var ghLink = document.getElementsById("Github2Dark");
  //var lpLink = document.getElementsById("Launchpad2Dark");

  var baliseLink = document.getElementById("linkcss");
  var etat = baliseLink.href.endsWith("css/style.css");
  if (etat) {
    baliseLink.setAttribute("href", "css/style-dark.css");
  } else {
    baliseLink.setAttribute("href", "css/style.css");
  }
}
