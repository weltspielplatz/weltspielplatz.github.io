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

require(['jquery','multicolumn'], function($,Multicolumn) {
	if(Modernizr.csscolumns == false) {
		var css3MC = new Multicolumn.CSS3MultiColumn();
	}
});

require(['jquery', 'lazyload'], function($, Lazyload) {
	$('.lazy').lazyload({
		placeholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP4/x8AAwAB/2+Bq7YAAAAASUVORK5CYII=',
		effect : "fadeIn",
		load: function() {
			//$(this).addClass('animated slideInUp');
		}
	});
});

require(['jquery','fitVids'], function($, Fitvids) {
	$('.videos').fitVids();
});

require(['jquery', 'jqueryUI', 'scrollto'], function($, Scrolltop) {
	
});

require(['jquery', 'magnificPopup'], function($, MagnificPopup) {
	$('.popBig').magnificPopup({
		type: 'image',
		gallery: {
	    enabled: true,
	    preload: [0,2],
	    navigateByImgClick: true,
	  },
	});
});

require(['jquery','cyclotron'], function($, Cyclotron) {
	$('.pano').cyclotron({
		dampingFactor: 0.6
	});
	$('.pano').css('background-repeat','no-repeat');
});

require(['jquery','sticky'], function($, Sticky) {
	Sticky.makeSticky();
	$(window).scroll(function() {
		Sticky.makeSticky()
	})
});

require(['jquery','imageSize'], function($, ImageSize) {
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
