function alertDiag(texte, myhref) {
    if (confirm(texte)) {
      var n = myhref.startsWith('https');
      if (n) {
          window.open(myhref);
      }
      var target = $(myhref);
      if(target.length) {
          event.preventDefault();
          $('html, body').stop().animate({
              scrollTop: target.offset().top - 80
          }, 750);
      }
    } else {
      document.getElementById("linkToFollow").removeAttribute('href');
    }
  }
