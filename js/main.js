require.config({
  paths: {
    // specify a path to jquery, the second declaration is the local fallback
    jquery: ["https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min", "jquery.min"],
    jqueryUI: ['https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min'],
    lazyload: ['https://cdnjs.cloudflare.com/ajax/libs/jquery_lazyload/1.9.5/jquery.lazyload.min'],
    fitVids: ['https://cdnjs.cloudflare.com/ajax/libs/fitvids/1.1.0/jquery.fitvids.min'],
    magnificPopup: ['https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.0.0/jquery.magnific-popup.min'],
    multicolumn: ["multicolumn"],
    flip: ["flip"],
    owl: ["./owl/owl.carousel.min"],
    vuejs: ['https://unpkg.com/vue@2.4.2/dist/vue.min'],
  },
  shim: {
    jqueryUI: ['jquery'],
    fitVids: ['jquery'],
    magnificPopup: ['jquery'],
    cyclotron: ['jquery'],
    flip: ['jquery'],
    owl: ['jquery'],
    multicolumn: ['jquery'],
    lazyload: ['jquery']
  }
});

require(['jquery', 'multicolumn'], function($, Multicolumn) {
  if (Modernizr.csscolumns == false) {
    var css3MC = new Multicolumn.CSS3MultiColumn();
  }
});

require(['jquery', 'flip'], function($, Flip) {
  $('.front').append('<p class="anweisung">Dreh mich</p>');
  $('.back').append('<p class="anweisung">Kinderidee</p>');
  $('.flipper').flip({
    'trigger': 'hover',
  });
});

require(['jquery', 'fitVids'], function($, Fitvids) {
  $('.videos').fitVids();
});

require(['jquery', 'jqueryUI', 'scrollto'], function($, Scrolltop) {

});

var popup = function() {
  require(['jquery', 'magnificPopup'], function($, MagnificPopup) {
    $('.popBig').magnificPopup({
      type: 'image',
      gallery: {
        enabled: true,
        preload: [0, 2],
        navigateByImgClick: true,
      },
    });
  });
};
popup();

require(['jquery', 'sticky'], function($, Sticky) {
  Sticky.makeSticky();
  $(window).scroll(function() {
    Sticky.makeSticky()
  })
});



require(['jquery','vuejs'], function($, Vue) {

  var news = {
    toggleNews: function() {
      var button = $(document.getElementsByClassName('news-toggle')),
        p = button.prev();
      button.on('click', function() {
        p.toggleClass('show-overflow');
        console.log('clicked');
      })
    }
  }
  news.toggleNews();

  var accordion = {

    init: function() {
      var frage = $('.aktuelles');
      frage.a = frage.find('.news-titel');
      frage.i = frage.a.find('i');
      frage.a.on("click", function(e) {
        e.preventDefault();
        var button = $(this);
        accordion.action(button, frage);
        popup();
      });
      this.close(frage)
      //frage.eq(0).children('a').trigger('click');
    },
    action: function(e, frage) {
      var dies = $(e);
      console.log(dies);
      if (dies.hasClass('active')) {
        dies.removeClass("active");
        dies.siblings('.news-inhalt').slideUp(200);
        frage.i.removeClass("fa-minus").addClass("fa-plus");
      } else {
        frage.i.removeClass("fa-minus").addClass("fa-plus");
        dies.find('i').removeClass("fa-plus").addClass("fa-minus");
        frage.a.removeClass("active");
        dies.addClass("active");
        $('.news-inhalt').slideUp(200);
        var sibling = dies.siblings('.news-inhalt');
        sibling.slideDown(200);
        console.log(sibling.children('.bild-wrapper'));
        sibling.children('.bild-wrapper').animate({scrollLeft: '20px'}, 2200)
      }
    },
    close: function(frage) {
      frage.each(function(index){
        $(this).find('.news-inhalt').css('display','none')
      })
    }
  }

  Vue.component('newscomp', {
    props: ['news'],
    template: '#news'
  })

  $.getJSON('js/news.json?v=190212_1', function(data){
  	app = new Vue({
    	el: '#app',
			data: data,
			mounted: function(){
        accordion.init();
        require(['jquery', 'lazyload'], function($, Lazyload) {
          $('.lazy').lazyload({
            placeholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP4/x8AAwAB/2+Bq7YAAAAASUVORK5CYII=',
            effect: "fadeIn",
            load: function() {
              console.log('lazy load .lazy');
              require(['jquery', 'imageSize'], function($, ImageSize) {
                var images = $('img.lazy');
                $('img.lazy').css('height', function(index, value) {
                  var image = this;
                  return ImageSize.imagesize(image, 'height', false);
                });
                $('img.lazy').css('width', function(index, value) {
                  var image = this;
                  return ImageSize.imagesize(image, 'width', false);
                });
              });
            }
          });
        });
        require(['jquery','owl','lazyload'], function($, Owl, Lazy) {
          var carousel = $(".owl-carousel");
          carousel.owlCarousel({
            items: 1,
            loop: true,
            // rewind: false,
            // nav: true,
            // dots: true,
            threshold : 200,
            lazyLoad: true,
            autoplay: true,
            autoplayTimeout: 3500,
            autoplaySpeed: 600,
            // autoplayHoverPause: true
            onInitialized: function(){
              $('.lazyowl').lazyload({
                placeholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAjUAAAHaCAQAAABS5nDZAAAEeElEQVR42u3UMQ0AAAzDsJU/6aGo+tgQciQHUBcJAKsBrAbAagCrAawGwGoAqwGwGsBqAKsBsBrAagCrAbAawGoArAawGsBqAKwGsBoAqwGsBrAaAKsBrAawGgCrAawGwGoAqwGsBsBqAKsBsBrAagCrAbAawGoAqwGwGsBqAKwGsBrAagCsBrAaAKsBrAawGgCrAawGsBoAqwGsBsBqAKsBrAbAagCrAbAawGoAqwGwGsBqAKsBsBrAagCsBrAawGoArAawGgCrAawGsBoAqwGsBrAaAKsBrAbAagCrAawGwGoAqwGsRgLAagCrAbAawGoAqwGwGsBqAKwGsBrAagCsBrAawGoArAawGgCrAawGsBoAqwGsBsBqAKsBrAbAagCrAawGwGoAqwGwGsBqAKsBsBrAagCsBrAawGoArAawGsBqAKwGsBoAqwGsBrAaAKsBrAbAagCrAawGwGoAqwGsBsBqAKsBsBrAagCrAbAawGoArAawGsBqAKwGsBrAagCsBrAaAKsBrAawGgCrAawGwGoAqwGsBsBqAKsBrAbAagCrAbAawGoAqwGwGsBqAKuRALAawGoArAawGsBqAKwGsBoAqwGsBrAaAKsBrAawGgCrAawGwGoAqwGsBsBqAKsBsBrAagCrAbAawGoAqwGwGsBqAKwGsBrAagCsBrAaAKsBrAawGgCrAawGsBoAqwGsBsBqAKsBrAbAagCrAbAawGoAqwGwGsBqAKsBsBrAagCsBrAawGoArAawGgCrAawGsBoAqwGsBrAaAKsBrAbAagCrAawGwGoAqwGwGsBqAKsBsBrAagCrAbAawGoArAawGsBqAKwGsBrAaiQArAawGgCrAawGsBoAqwGsBsBqAKsBrAbAagCrAawGwGoAqwGwGsBqAKsBsBrAagCsBrAawGoArAawGsBqAKwGsBoAqwGsBrAaAKsBrAbAagCrAawGwGoAqwGsBsBqAKsBsBrAagCrAbAawGoArAawGsBqAKwGsBrAagCsBrAaAKsBrAawGgCrAawGwGoAqwGsBsBqAKsBrAbAagCrAbAawGoAqwGwGsBqAKwGsBrAagCsBrAawGoArAawGgCrAawGsBoAqwGsBrAaCQCrAawGwGoAqwGsBsBqAKsBsBrAagCrAbAawGoAqwGwGsBqAKwGsBrAagCsBrAaAKsBrAawGgCrAawGsBoAqwGsBsBqAKsBrAbAagCrAbAawGoAqwGwGsBqAKsBsBrAagCsBrAawGoArAawGgCrAawGsBoAqwGsBrAaAKsBrAbAagCrAawGwGoAqwGwGsBqAKsBsBrAagCrAbAawGoArAawGsBqAKwGsBoAqwGsBrAaAKsBrAawGgCrAawGwGoAqwGsBsBqAKsBrEYCwGoAqwGwGsBqAKsBsBrAagCsBrAawGoArAawGsBqAKwGsBoAqwGsBrAaAKsBrAbAagCrAawGwGoAqwGsBsBqAKsBsBrAagCrAbAawGoArAawGsBqAKwGsBrAagCsBrAaAKsB1h5pRAHbQsMrfwAAAABJRU5ErkJggg==',
                effect: "fadeIn",
                load: function() {
                  console.log('lazy load .lazyowl');
                  require(['jquery', 'imageSize'], function($, ImageSize) {
                    var images = $('img.lazyowl');
                    $('img.lazyowl').css('height', function(index, value) {
                      var image = this;
                      return ImageSize.imagesize(image, 'height', false);
                    });
                    $('img.lazyowl').css('width', function(index, value) {
                      var image = this;
                      return ImageSize.imagesize(image, 'width', false);
                    });
                  });
                }
              });
            }
          });

        });
        require(['jquery', 'cyclotron'], function($, Cyclotron) {
          console.log('cyclotron initiert');
          $('.pano').cyclotron({
            dampingFactor: 0.6
          });
          $('.pano').css('background-repeat', 'no-repeat');
        });
 	    },
  	})
  })



})
