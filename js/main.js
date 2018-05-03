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

  app = new Vue({
    el: '#app',

    data: {
      news: [
      {
        datum: '02.05.2018',
        titel: 'Der Polarstern ist gelandet',
        inhalt: 'Der Eisbrecher mit dem Namen „Polarstern“ ist seit letzter Woche öffentlich zum Spielen freigegeben. Die Schiffswände sind mit Bänken zum Ausruhen bestückt. Die beiden Schornsteine sind begehbare Türmchen, von denen man jetzt einen guten Blick über den Spielplatz hat. Mit dem Sprachrohr kann der diensthabende Kapitän den neuen Kurs an die Kinder-Crew durchgeben.'+
				'<br><br><br>Projektinformation: <br>Das Vorhaben &bdquo;Treptower Park &ndash; Teilneugestaltung im s&uuml;dlichen Parkteil sowie Weltspielplatz&ldquo; (Projektlaufzeit: 09/2016 bis 08/2020) wird im Berliner Programm f&uuml;r Nachhaltige Entwicklung (BENE) gef&ouml;rdert aus Mitteln des Europ&auml;ischen Fonds f&uuml;r Regionale Entwicklung und des Landes Berlin (F&ouml;rderkennzeichen 1096-B6-A)<img src="images/forderung/eu_efre_zusatz_rechts_rgb.jpg" class="forderung" alt="efre"/><img src="images/forderung/SenUVK_flach_rgb.jpg" class="forderung" alt="berliner senat"/>',
        bilder: [{
          src: 'images/news/eisbrecher/01-600.jpg',
          href: 'images/news/eisbrecher/01-1400.jpg',
          alt: 'Eisbrecher von der Seite'
        }, {
          src: 'images/news/eisbrecher/02-600.jpg',
          href: 'images/news/eisbrecher/02-1400.jpg',
          alt: 'Polarstern auf dem Namensschild'
        }, {
          src: 'images/news/eisbrecher/03-600.jpg',
          href: 'images/news/eisbrecher/03-1400.jpg',
          alt: 'Bänke an den Schiffswänden'
        }, {
          src: 'images/news/eisbrecher/04-600.jpg',
          href: 'images/news/eisbrecher/04-1400.jpg',
          alt: 'Das Sprachrohr'
        }, {
          src: 'images/news/eisbrecher/05-600.jpg',
          href: 'images/news/eisbrecher/05-1400.jpg',
          alt: 'Der Turm von innen'
        }, {
          src: 'images/news/eisbrecher/06-600.jpg',
          href: 'images/news/eisbrecher/06-1400.jpg',
          alt: 'Schiff von vorne'
        }
      ]
    },{
        datum: '05.01.2018',
        titel: 'Die Rockies und die Anden erheben sich langsam',
        inhalt: 'Langsam erheben sich aus den Produktionshallen die m&auml;chtigen Klettergebirge. Sie reichen von den Rocky Mountains im Norden Amerikas, bis zu den Anden in S&uuml;d-Amerika. An dieser immer etwas schwingenden Seilkonstruktion k&ouml;nnen die Kinder ihre K&ouml;rperbeherrschung und ihren Mut unter Beweis stellen. Hier werden Grundlagen f&uuml;r die Koordination der H&auml;nde, Arme und Beine, sowie ihr Geschick im Gleichgewichthalten entwickelt. <br>Das Netz ist relativ grobmaschig, die Kinder m&uuml;ssen wie bei einer echten Bergbesteigung eine gute Kletterstrategie entwickeln. Es wird kleine Trittsteine im Netz geben, auf denen man ausruhen, h&uuml;pfen und schwingen kann. Das schneewei&szlig;e Gipfelkreuz und der Mastkorb sind schon von weitem zu sehen. Auf den h&auml;ngenden Pendelsitzen k&ouml;nnen die Kinder die Seele baumeln lassen und sich wie ein Adler in den L&uuml;ften f&uuml;hlen. &Uuml;ber eine schwingende Seilbr&uuml;cke geht es zu den verwundenen Seilnetzfl&auml;chen, den Anden. Hier wartet die nächste Herausforderung für unsere Gipfelstürmer. <br>Wenn die Witterung es zul&auml;sst und die Fundamente&#x2029;gebaut werden k&ouml;nnen, kann der Aufbau vor Ort beginnen. Im Anschluss wird ein Fallschautz unter den Rocky Mountains gebaut werden, der f&uuml;r die Sicherheit der Kinder sorgen wird. Die Bauarbeiten werden noch bis ins Fr&uuml;hjahr andauern, aber seid gespannt – wir halten euch auf dem Laufenden!'+
				'<br><br>Projektinformation: <br>Das Vorhaben &bdquo;Treptower Park &ndash; Teilneugestaltung im s&uuml;dlichen Parkteil sowie Weltspielplatz&ldquo; (Projektlaufzeit: 09/2016 bis 08/2020) wird im Berliner Programm f&uuml;r Nachhaltige Entwicklung (BENE) gef&ouml;rdert aus Mitteln des Europ&auml;ischen Fonds f&uuml;r Regionale Entwicklung und des Landes Berlin (F&ouml;rderkennzeichen 1096-B6-A)<img src="images/forderung/eu_efre_zusatz_rechts_rgb.jpg" class="forderung" alt="efre"/><img src="images/forderung/SenUVK_flach_rgb.jpg" class="forderung" alt="berliner senat"/>',
        bilder: [{
          src: 'images/news/rockies/rockymountains-3-450.jpg',
          href: 'images/news/rockies/rockymountains-3-1200.jpg',
          alt: 'Rockies in der Planung'
        }, {
          src: 'images/news/rockies/rockymountains-5-450.jpg',
          href: 'images/news/rockies/rockymountains-5-1200.jpg',
          alt: 'Rocky Mountains entstehen am Comuter'
        }, {
          src: 'images/news/rockies/rockymountains-1-450.jpg',
          href: 'images/news/rockies/rockymountains-1-1200.jpg',
          alt: 'Rocky Mountains werden aufgebaut'
        }, {
          src: 'images/news/rockies/rockymountains-6-450.jpg',
          href: 'images/news/rockies/rockymountains-6-1200.jpg',
          alt: 'Der Mastkorb vom Gipfelkreuz'
        }, {
          src: 'images/news/rockies/rockymountains-2-450.jpg',
          href: 'images/news/rockies/rockymountains-2-1200.jpg',
          alt: 'Das lose verpackte Klettergerüst'
        }, {
          src: 'images/news/rockies/anden-1-450.jpg',
          href: 'images/news/rockies/anden-1-1200.jpg',
          alt: 'Die Anden in Einzelteilen'
        }
      ]
    }, {
        datum: '28.11.2017',
        titel: 'Der Eisbrecher hat seine Fahrt aufgenommen',
        inhalt: 'Jetzt hat der Eisbrecher auf dem Landweg Fahrt aufgenommen und hat bereits den Weltspielplatz erreicht. Seine Einzelteile sind abgeladen und werden gerade aufgebaut. An Bord des Eisbrechers kann man ganz entspannt dem Winter entgegen sehen. Er bricht jetzt schon eine Schneise und macht den Weg für die kommenden Spielgeräte frei. Freut euch drauf!'+
				'<br><br>Projektinformation: Das Vorhaben &bdquo;Treptower Park &ndash; Teilneugestaltung im s&uuml;dlichen Parkteil sowie Weltspielplatz&ldquo; (Projektlaufzeit: 09/2016 bis 08/2020) wird im Berliner Programm f&uuml;r Nachhaltige Entwicklung (BENE) gef&ouml;rdert aus Mitteln des Europ&auml;ischen Fonds f&uuml;r Regionale Entwicklung und des Landes Berlin (F&ouml;rderkennzeichen 1096-B6-A)<img src="images/forderung/eu_efre_zusatz_rechts_rgb.jpg" class="forderung" alt="efre"/><img src="images/forderung/SenUVK_flach_rgb.jpg" class="forderung" alt="berliner senat"/>',
        bilder: [{
          src: 'images/news/eisbrecher-00_600.jpg',
          href: 'images/news/eisbrecher-00_1200.jpg',
          alt: 'Lieferung des Eisbrechers',
        }, {
          src: 'images/news/eisbrecher-01_600.jpg',
          href: 'images/news/eisbrecher-01_1200.jpg',
          alt: 'Planungsskizze des Eisbrechers und Lage',
        }, {
          src: 'images/news/eisbrecher-02_600.jpg',
          href: 'images/news/eisbrecher-02_1200.jpg',
          alt: 'Aufbau des Eisbrechers',
         }
      ],
      },
      {
        datum: '18.10.2017',
        titel: 'Weltspielplatz – es wird weitergebaut',
        inhalt: 'Dem Straßen- und Grünflächenamt ist es gelungen, weitere Fördermittel für den Weltspielplatz zu akquirieren. Aus dem „Berliner Programm für Nachhaltige Entwicklung“ (BENE), welches u.a. aus Mitteln des Europäischen Fonds für Regionale Entwicklung (EFRE) gespeist wird, stehen Gelder für den Bau von Spielgeräten und für weitere Pflanzungen zur Verfügung.<br /><br />\
  			Bis Sommer 2018 werden aus diesen Mitteln auf dem Spielplatz die Rocky Mountains und ein Teil der Anden entstehen, es werden die Wolkenkratzer in Nordamerika gebaut und der Grundbereich vom Nordpol errichtet. <br />\
  			Die Kinder dürfen sich ebenso auf 3 Transportmittel freuen, mit denen sie dann schon einen Teil der Welt bereisen können: Einbaum, Eisbrecher und Flugzeug. Im Außenbereich umrahmt eine neue Pflanzung den Spielplatz. <br /><br />\
  			Mit bezirklichen Mitteln kann ein weiteres Highlight finanziert werden. Der dicke große gelbe Käse, der nach der Idee der Kinder für Europa steht, findet seinen Platz gleich neben dem künftigen Bauernhof. <br /><br />\
  			Im September 2017 beginnen die Arbeiten zunächst mit dem Aufbruch der Flächen und der Herstellung der Fundamente. Bis die ersten Teile vor Ort sichtbar werden, wird es noch etwas dauern, da die beauftragten Firmen zunächst die Konstruktionszeichnungen erstellen müssen und den Bau der Elemente in Ihren Werkstätten vorbereiten. <br /><br />\
  			Der Baubeginn hat sich zur letzten Information etwas verzögert. Grund hierfür ist, dass Vergabeverfahren teilweise wiederholt werden mussten, da keine annehmbaren Angebote vorlagen.</br></br>\
        Projektinformation: Das Vorhaben „Treptower Park – Teilneugestaltung im südlichen Parkteil sowie Weltspielplatz“ (Projektlaufzeit: 09/2016 bis 08/2020) wird im Berliner Programm für Nachhaltige Entwicklung (BENE) gefördert aus Mitteln des Europäischen Fonds für Regionale Entwicklung und des Landes Berlin (Förderkennzeichen 1096-B6-A)<img src="images/forderung/eu_efre_zusatz_rechts_rgb.jpg" class="forderung" alt="efre"/><img src="images/forderung/SenUVK_flach_rgb.jpg" class="forderung" alt="berliner senat"/>',
        bilder: [{
          src: 'images/news/01baubeginn-05-600.jpg',
          href: 'images/news/01baubeginn-05-1200.jpg',
          alt: 'Baubeginn 2017',
          width: 'voll'
        }, {
          src: 'images/news/04-amerika03_600.jpg',
          href: 'images/news/04-amerika03_1200.jpg',
          alt: 'hier Rocky Mountains, Anden, Wolkenkratzer',
          width: 'halb'
        }, {
          src: 'images/news/04-eisbrecher02_600.jpg',
          href: 'images/news/04-eisbrecher02_1200.jpg',
          alt: 'hier der Eisbrecher',
          width: 'halb'
        },  {
          src: 'images/news/05-einbaum01_600.jpg',
          href: 'images/news/05-einbaum01_1200.jpg',
          alt: 'hier der Einbaum',
          width: 'halb'
        },
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
    },
  })

})
