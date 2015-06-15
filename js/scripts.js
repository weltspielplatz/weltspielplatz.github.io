/*! flip - v1.0.0 - 2015-04-04
* https://github.com/nnattawat/flip
* Copyright (c) 2015 Nattawat Nonsung; Licensed MIT */
!function(a){var b=function(a){a.data("fliped",!0);var b="rotate"+a.data("axis");a.find(".front").css({transform:b+(a.data("reverse")?"(-180deg)":"(180deg)")}),a.find(".back").css({transform:b+"(0deg)"})},c=function(a){a.data("fliped",!1);var b="rotate"+a.data("axis");a.find(".front").css({transform:b+"(0deg)"}),a.find(".back").css({transform:b+(a.data("reverse")?"(180deg)":"(-180deg)")})};a.fn.flip=function(d){return this.each(function(){var e=a(this);if(void 0!==d&&"boolean"==typeof d)d?b(e):c(e);else{var f=a.extend({axis:"y",reverse:!1,trigger:"click",speed:500},d);if(e.data("reverse",f.reverse),e.data("axis",f.axis),"x"==f.axis.toLowerCase())var g=2*e.outerHeight(),h="rotatex";else var g=2*e.outerWidth(),h="rotatey";e.find(".back").css({transform:h+"("+(f.reverse?"180deg":"-180deg")+")"}),e.css({perspective:g,position:"relative"});var i=f.speed/1e3||.5;if(e.find(".front, .back").outerHeight(e.height()).outerWidth(e.width()).css({"transform-style":"preserve-3d",position:"absolute",transition:"all "+i+"s ease-out","backface-visibility":"hidden"}),"click"==f.trigger.toLowerCase())e.find('button, a, input[type="submit"]').click(function(a){a.stopPropagation()}),e.click(function(){e.data("fliped")?c(e):b(e)});else if("hover"==f.trigger.toLowerCase()){var j=function(){e.unbind("mouseleave",k),b(e),setTimeout(function(){e.bind("mouseleave",k),e.is(":hover")||c(e)},f.speed+150)},k=function(){c(e)};e.mouseenter(j),e.mouseleave(k)}}}),this}}(jQuery);

(function ($) {
	$.fn.cyclotron = function (options) {

		var settings = $.extend({
			dampingFactor: 0.93,
			historySize: 5
		}, options);
		return this.each(function () {
			var container, sx, dx = 0, armed, offset = 0, tick, prev, h = [];
			container = $(this);
			
			var startEventType = 'mousedown',
			endEventType = 'mouseup',
			moveEventType = 'mousemove',
			modernTouch = Modernizr.touch;
			
			if (modernTouch) {
				startEventType += ' touchstart ';
				endEventType   += ' touchend ';
				moveEventType += ' touchmove';
			}	
			
			console.log(startEventType + endEventType + moveEventType);
			container.bind(startEventType,function (e) {
			
				if (modernTouch && e.originalEvent.touches) {
					sx = e.originalEvent.touches[0].pageX - offset;
				} else {
					sx = e.pageX - offset;
				};
				armed = true;
				e.preventDefault();
			});
			
			container.bind(moveEventType ,function (e) {
				var px;
				if (armed) {
					px = e.pageX;
					if (modernTouch && e.originalEvent.touches) {
						px = e.originalEvent.touches[0].pageX;
					} else {
						px = e.pageX;
					};
					if (prev === undefined) {
						prev = px;
					}
					offset = px - sx;
					if (h.length > settings.historySize) {
						h.shift();
					}
					h.push(prev - px);

					container.css('background-position', offset);

					prev = px;
				}
			});
			container.bind('mouseleave mouseup touchend touchleave', function () {
				if (armed) {
					var i, len = h.length, v = h[len - 1];
					for (i = 0; i < len; i++) {
						v = (v * len + (h[i])) / (len + 1);
					}
					dx = v;
				}
				armed = false;
			});
			tick = function () {
				if (!armed && dx) {
					dx *= settings.dampingFactor;
					offset -= dx;
					container.css('background-position', offset);
					if (Math.abs(dx) < 0.001) {
						dx = 0;
					}
				}
			};
			setInterval(tick, 16);
		});
	};
}(jQuery));


$(document).ready(function ($) {
	
	$(window).resize(function () {
		$('img.lazy').css('height', function(index, value) {
			image = this; 
			return blockLazyImage(image, 'height', false); 
		});
		$('img.lazy').css('width', function(index, value) {
			image = this; 
			return blockLazyImage(image, 'width', false); 
		});
	});
	
	function blockLazyImage(elem, prop, auto) {
		var heightBlock, widthBlock;
		elem = $(elem);
		heightBlock =	elem.closest('.block').height();
		widthBlock = elem.closest('.block').width();
		landscape = heightBlock <= widthBlock ? true : false;
		heightBlock += 'px';
		widthBlock += 'px';
		//auto = landscape === true ? true : false;
		heightBlock = auto === true ? 'auto' : heightBlock;
		auto = $(window).width() < 768 ? true : false;
		widthBlock = auto === true ? 'auto' : widthBlock;
		propName = prop;
		prop = prop === 'height' ? heightBlock : widthBlock;
		//console.log(propName + ': ' + prop);
		return prop;
	};
	
	images = $('img.lazy');
	$('img.lazy').css('height', function(index, value) {
		image = this; 
		return blockLazyImage(image, 'height', false); 
	});
	$('img.lazy').css('width', function(index, value) {
		image = this; 
		return blockLazyImage(image, 'width', false); 
	});
	
	$('.popBig').magnificPopup({
		type: 'image',
		gallery: {
	    enabled: true,
	    preload: [0,2],
	    navigateByImgClick: true,
	  },
	});
	$('.front').append('<p class="anweisung">Dreh mich</p>');
	//$('.back').append('<p class="anweisung">Entwurfsskizze</p>');
	$('.lazy').lazyload({
		placeholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP4/x8AAwAB/2+Bq7YAAAAASUVORK5CYII=',
		effect : "fadeIn",
		load: function() {
			//$(this).addClass('animated slideInUp');
			
		}
	});
	$('.flipper').flip({
		'trigger': 'hover',
	});
	$('.pano').cyclotron({
		dampingFactor: 0.6
	});
	$('.pano').css('background-repeat','no-repeat');
})
