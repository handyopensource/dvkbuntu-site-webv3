function alertDiag(texte, myhref) {
    if (confirm(texte)) {
      var n = myhref.startsWith('https');
      if (n) {
          var n1 = myhref.startsWith('https://www.dvkbuntu.org');
          var n2 = myhref.startsWith('https://dvkbuntu.org');
          if (n1 || n2) {
            location.href = myhref;
          } else {
            window.open(myhref);
          }
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
