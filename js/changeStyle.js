function changementdestyle() {

  //var ghLink = document.getElementsById("Github2Dark");
  //var lpLink = document.getElementsById("Launchpad2Dark");
  $('body').css('overflow', 'hidden');

  $('.loader_bg').fadeIn(0);
  var baliseLink = document.getElementById("linkcss");
  var etat = baliseLink.href.endsWith("css/style.css");
  var imageExist = document.getElementById("Github2Dark");
  if (etat) {
    baliseLink.setAttribute("href", "css/style-dark.css");
    if (typeof imageExist != "undefined") {
      document.getElementById("Github2Dark").src = "images/OpenSource/Github-dark.png";
      document.getElementById("Launchpad2Dark").src = "images/OpenSource/Launchpad-dark.png";
    }
  } else {
    baliseLink.setAttribute("href", "css/style.css");
    if (typeof imageExist != "undefined") {
      document.getElementById("Github2Dark").src = "images/OpenSource/Github.png";
      document.getElementById("Launchpad2Dark").src = "images/OpenSource/Launchpad.png";
    }
  }
  $('.loader_bg').fadeOut(5000);

  $('body').css('overflow', 'auto');
}
