var buttonChangeStyle = document.getElementById("replaceonclicktest");
buttonChangeStyle.onclick = function changementdestyle() {

    var baliseLink = document.getElementById("linkcss");
    var etat = baliseLink.href.endsWith("css/style.css");

    if (etat == true) {
        baliseLink.setAttribute("href", "css/style-dark.css");
    } else {
        baliseLink.setAttribute("href", "css/style.css");
    }
}
