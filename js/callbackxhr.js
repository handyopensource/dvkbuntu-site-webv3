/**
* Cette Fonction permet de recuperer le contenu d'une page avec l'aide d'une requête XHR (XmlHttpRequest)
* XHR : https://developer.mozilla.org/fr/docs/Web/API/XMLHttpRequest
*
* Attention cette requête est asynchrone c'est pourquoi elle utilise des callback
* CallBack : https://developer.mozilla.org/en-US/docs/Glossary/Callback_function
*/
function callURL(url,callback){
    // on crée l'objet xhr
    var xhr = new XMLHttpRequest();
    //On définie une évenement sur le changement d'état de la requête.
    xhr.onreadystatechange = function() {
        //on vérifie si le code renvoyé par la page est le code 4 c'est a dire DONE, donc que la requête est terminé.
        if (xhr.readyState === 4) {
            //on enregistre le résultat de la requête (le code de la page demandé).
            var result = xhr.response;
            //on regarde si le résultat est vide ?
            if(result){
                //si il y a un résultat on renvoie le resulat.
                callback(null,result);
            }else{
                //si il n'y a pas de résultat on renvoie une information d'erreur
                callback("error",null);
            }
        }
    }
    //on ouvre le requête en méthode GET.
    xhr.open('GET', url, true);
    //on envoie la requête.
    xhr.send('');
}
function updateBannerTop(myinit) {
  if (myinit === 1) {
    $('body').css('overflow', 'hidden');
    $('.loader_bg').fadeIn(0);
  }
  if (document.getElementById('Titre DVKVersion') !== null) {
    if (document.getElementById('Titre DVKVersion').innerText == 'DVKBuntu'){
      var currentBannerTop = './bannertop1.html';
      var currentCompteurs='./header1.html';
      var currentPictures='./banner_main1.html';
      var currentBasdePage='./BasdePage1.html';
    }else{
      var currentBannerTop = './bannertop0.html';
      var currentCompteurs='./header0.html';
      var currentPictures='./banner_main0.html';
      var currentBasdePage='./BasdePage0.html';
    }
    callURL(currentBannerTop,function(err,result){
      //si la fonction renvoie une erreur alors on annule.
      if (err){
        return;
      }
      // si la fonction ne renvoie pas d'erreur on écrit dans le html le tableau de la requête.
      document.getElementById("bannertop").innerHTML = result;
    })
    callURL(currentCompteurs,function(err,result){
      //si la fonction renvoie une erreur alors on annule.
      if (err){
        return;
        return;
      }
      // si la fonction ne renvoie pas d'erreur on écrit dans le html le tableau de la requête.
      document.getElementById("mesHeaders").innerHTML = result;
    })
    callURL(currentPictures,function(err,result){
      //si la fonction renvoie une erreur alors on annule.
      if (err){
        return;
      }
      // si la fonction ne renvoie pas d'erreur on écrit dans le html le tableau de la requête.
      document.getElementById("banner_main").innerHTML = result;
    })
    callURL(currentBasdePage,function(err,result){
      //si la fonction renvoie une erreur alors on annule.
      if (err){
        return;
      }
      // si la fonction ne renvoie pas d'erreur on écrit dans le html le tableau de la requête.
      document.getElementById("BasdePage").innerHTML = result;
    })
  }
  if (myinit === 1) {
    $('.loader_bg').fadeOut(5000);
    $('body').css('overflow', 'auto');
  }
}
