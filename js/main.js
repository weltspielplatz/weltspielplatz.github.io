require.config({
  paths: {
    // specify a path to jquery, the second declaration is the local fallback
    jquery: ["http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min"],
    jqueryUI: ['http://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min'],
    lazyload: ['http://cdnjs.cloudflare.com/ajax/libs/jquery_lazyload/1.9.5/jquery.lazyload.min'],
    fitVids: ['http://cdnjs.cloudflare.com/ajax/libs/fitvids/1.1.0/jquery.fitvids.min'],
    magnificPopup: ['http://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.0.0/jquery.magnific-popup.min'],
    multicolumn: ["multicolumn"],
    flip: ["flip"],
    vuejs: ['https://unpkg.com/vue@2.4.2/dist/vue.min']
  },
  shim: {
    jqueryUI: ['jquery'],
    fitVids: ['jquery'],
    magnificPopup: ['jquery'],
    cyclotron: ['jquery'],
    flip: ['jquery'],
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

require(['jquery', 'lazyload'], function($, Lazyload) {
  $('.lazy').lazyload({
    placeholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP4/x8AAwAB/2+Bq7YAAAAASUVORK5CYII=',
    effect: "fadeIn",
    load: function() {
      //$(this).addClass('animated slideInUp');
    }
  });
});

require(['jquery', 'fitVids'], function($, Fitvids) {
  $('.videos').fitVids();
});

require(['jquery', 'jqueryUI', 'scrollto'], function($, Scrolltop) {

});

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

require(['jquery', 'cyclotron'], function($, Cyclotron) {
  $('.pano').cyclotron({
    dampingFactor: 0.6
  });
  $('.pano').css('background-repeat', 'no-repeat');
});

require(['jquery', 'sticky'], function($, Sticky) {
  Sticky.makeSticky();
  $(window).scroll(function() {
    Sticky.makeSticky()
  })
});

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
      console.log(frage);
      frage.a.on("click", function(e) {
        e.preventDefault();
        var button = $(this);
        accordion.action(button, frage);
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
        sibling.children('.bild-wrapper').animate({scrollLeft: '20px'}, 3000)

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

  app = new Vue({
    el: '#app',

    data: {
      news: [{
        datum: '18.10.2017',
        titel: 'Weltspielplatz – es wird weitergebaut',
        inhalt: 'Dem Straßen- und Grünflächenamt ist es gelungen, weitere Fördermittel für den Weltspielplatz zu akquirieren. Aus dem „Berliner Programm für Nachhaltige Entwicklung“ (BENE), welches u.a. aus Mitteln des Europäischen Fonds für Regionale Entwicklung(EFRE) gespeist wird, stehen Gelder für den Bau von Spielgeräten und für weitere Pflanzungen zur Verfügung.<br /><br />\
    			Bis Sommer 2018 werden aus diesen Mitteln auf dem Spielplatz die Rocky Mountains und ein Teil der Anden entstehen, es werden die Wolkenkratzer in Nordamerika gebaut und der Grundbereich vom Nordpol errichtet. <br />\
  			Die Kinder dürfen sich ebenso auf 3 Transportmittel freuen, mit denen sie dann schon einen Teil der Welt bereisen können: Einbaum, Eisbrecher und Flugzeug. Im Außenbereich umrahmt eine neue Pflanzung den Spielplatz. <br /><br />\
  			Mit bezirklichen Mitteln kann ein weiteres Highlight finanziert werden. Der dicke große gelbe Käse, der nach der Idee der Kinder für Europa steht, findet seinen Platz gleich neben dem künftigen Bauernhof. <br /><br />\
  			Im September 2017 beginnen die Arbeiten zunächst mit dem Aufbruch der Flächen und der Herstellung der Fundamente. Bis die ersten Teile vor Ort sichtbar werden, wird es noch etwas dauern, da die beauftragten Firmen zunächst die Konstruktionszeichnungen erstellen müssen und den Bau der Elemente in Ihren Werkstätten vorbereiten. <br /><br />\
  			Der Baubeginn hat sich zur letzten Information etwas verzögert. Grund hierfür ist, dass Vergabeverfahren teilweise wiederholt werden mussten, da keine annehmbaren Angebote vorlagen.',
        bilder: [{
          src: 'images/news/01baubeginn-04.jpg',
          alt: 'Baubeginn 2017',
          width: 'voll'
        }, {
          src: 'images/news/03baustelle-01.jpg',
          alt: 'hier der Käse',
          width: 'halb'
        }, {
          src: 'images/news/04-amerika.jpg',
          alt: 'hier Rocky Mountains, Anden, Wolkenkratzer',
          width: 'halb'
        }
      ],

      },
      {
        datum: '21.11.16',
        titel: 'Neues Geld für den Weltspielplatz',
        inhalt: 'Das Straßen- und Grünflächenamt Treptow-Köpenick hat u.a. Fördermittel beim Berliner Programm für Nachhaltige Entwicklung für den Ausbau des Weltspielplatzes akquiriert. Das ermöglicht die Fortsetzung des Einbaus weiterer Spielgeräte.</br>\
  			Schon im Spätsommer 2017 könnte der Bau diverser Spielgeräte beginnen.</br></br>\
  			Ganz oben auf der Liste stehen die Wolkenkratzer auf dem nordamerikanischen Kontinent. Auch die Rocky Mountains und die Anden, die beiden großen Klettergebirge, die sich vom nord- zum südamerikanischen Kontinent spannen werden, können mit den neuen Geldern errichtet werden. Mit der Fertigstellung der Anden und den dazugehörigen Fallschutzbelägen kann die Bebauung des südamerikanischen Kontinents abgeschlossen werden.</br></br>\
  			In Europa können wir uns auf das lang ersehnte, übergroße Käsestück zum Klettern und Durchrutschen freuen. Außerdem wird auf dem Nordpol ein überdachter Treffpunkt für Eltern und Kinder entstehen. Er wird auf einer kleinen Anhöhe mit einem Durchmesser von ca. 10m errichtet. Dieses übergroße Sitzmöbel soll sich zum Ort der Begegnung und zum Mittelpunkt für Kommunikation innerhalb des Weltspielplatzes entwickeln.</br>\
  			Um symbolisch von einem Kontinent zum nächsten zu reisen, werden auch die Transportmittel Schiff, Einbaum und Flugzeug im nächsten Jahr hinzukommen.</br></br>\
  			Die Vorbereitungen für diesen neuen Bauabschnitt haben bereits begonnen, so dass wir mit der Fertigstellung der neuen Spielgeräte im Jahr 2017 rechnen können. Wir halten euch weiterhin auf dem Laufenden!',
        bilder: [{
          src: 'images/news/baubeginn2017-c.jpg',
          alt: 'Baubeginn 2017'
        }]
      }]
    },
    mounted: function(){
      accordion.init();
      console.log(this.news);
    },
  })

})
