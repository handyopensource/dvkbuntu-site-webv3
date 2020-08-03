function changementdestyle() {

  //var ghLink = document.getElementsById("Github2Dark");
  //var lpLink = document.getElementsById("Launchpad2Dark");

  $('body').css('overflow', 'hidden');
  $('.loader_bg').fadeIn(0);

  var baliseLink = document.getElementById("linkcss");
  var etat = baliseLink.href.endsWith("css/style.css");
  if (etat) {
    baliseLink.setAttribute("href", "css/style-dark.css");
  } else {
    baliseLink.setAttribute("href", "css/style.css");
  }
  $('.loader_bg').fadeOut(8000);
  $('body').css('overflow', 'auto');
}
