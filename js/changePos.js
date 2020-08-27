function changePosition(myhref) {
    var target = $(myhref);
    if(target.length) {
      event.preventDefault();
      $('html, body').stop().animate({
          scrollTop: target.offset().top - 80
      }, 750);
    }
  }
