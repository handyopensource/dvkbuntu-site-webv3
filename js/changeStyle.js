function changementdestyle() {

  //var ghLink = document.getElementsById("Github2Dark");
  //var lpLink = document.getElementsById("Launchpad2Dark");

  var baliseLink = document.getElementById("linkcss");
  var etat = baliseLink.href.endsWith("css/style.css");

  if (etat) {
      baliseLink.setAttribute("href", "css/style-dark.css");
      document.getElementById("Github2Dark").src = "images/OpenSource/Github-dark.png";
      document.getElementById("Launchpad2Dark").src = "images/OpenSource/Launchpad-dark.png";
  } else {
      baliseLink.setAttribute("href", "css/style.css");
      document.getElementById("Github2Dark").src = "images/OpenSource/Github.png";
      document.getElementById("Launchpad2Dark").src = "images/OpenSource/Launchpad.png";
  }
}
