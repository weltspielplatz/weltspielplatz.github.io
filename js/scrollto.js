define(['jquery'], function($) {
	(function() {
		var navigation = $('#navigation');
    $('a[href^="#"]').on('click', function(elem) {

	    elem.preventDefault();
	    var target = this.hash,
	    $target = $(target);
			var p = window.location.hash;
			var plusHeight = navigation.css('height');
        plusHeight = 60;
			var offset = $target.offset().top;
        //console.log(plusHeight);
        //console.log(offset + ' ' + plusHeight + ' ' + (offset-plusHeight-165));
				offset = navigation.hasClass('sticky') == true ? offset-plusHeight : offset-plusHeight-80;
        shout = navigation.hasClass('sticky') == true ? true : false;
        $('html, body').stop().animate({
	        'scrollTop': offset },900,'easeInOutCubic'
        );
			})
})();
})
