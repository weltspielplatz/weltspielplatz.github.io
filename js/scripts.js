/*(function($){$.fn.cyclotron=function(options){var settings=$.extend({dampingFactor:0.93,historySize:5},options);return this.each(function(){var container,sx,dx=0,armed,offset=0,tick,prev,h=[];container=$(this);container.mousedown(function(e){sx=e.pageX-offset;armed=true;e.preventDefault();});container.mousemove(function(e){var px;if(armed){px=e.pageX;if(prev===undefined){prev=px;}
offset=px-sx;if(h.length>settings.historySize){h.shift();}
h.push(prev-px);container.css('background-position',offset);prev=px;}});container.bind('mouseleave mouseup',function(){if(armed){var i,len=h.length,v=h[len-1];for(i=0;i<len;i++){v=(v*len+(h[i]))/(len+1);}
dx=v;}
armed=false;});tick=function(){if(!armed&&dx){dx*=settings.dampingFactor;offset-=dx;container.css('background-position',offset);if(Math.abs(dx)<0.001){dx=0;}}};setInterval(tick,16);});};}(jQuery));*/

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
				startEventType = 'touchstart';
				endEventType   = 'touchend';
				moveEventType = 'touchmove';
			}	
			
			container.bind(startEventType,function (e) {
				if (modernTouch) {
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
					if (modernTouch) {
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
		$('img.lazy').css('height', function () {
			var heightBlock;
			heightBlock =	$(this).closest('.block').height();
			heightBlock += 'px';
			console.log(heightBlock);
			return heightBlock;
		}).css('width', function () {
			var widthBlock;
			widthBlock = $(this).closest('.block').width();
			widthBlock += 'px';
			return widthBlock;
		});
	});
	$('img.lazy').css('height', function () {
		var heightBlock;
		heightBlock =	$(this).closest('.block').height();
		heightBlock += 'px';
		console.log(heightBlock);
		return heightBlock;
	}).css('width', function () {
		var widthBlock;
		widthBlock = $(this).closest('.block').width();
		widthBlock += 'px';
		return widthBlock;
	});
	$('.popBig').magnificPopup({
		type: 'image',
		gallery: {
	    enabled: true,
	    preload: [0,2],
	    navigateByImgClick: true,
	  },
	});
	$('.lazy').lazyload({
		placeholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP4/x8AAwAB/2+Bq7YAAAAASUVORK5CYII=',
		effect : "fadeIn",
		load: function() {
			$(this).addClass('animated slideInUp');
		}
	});
	$('.pano').cyclotron({
		dampingFactor: 0.6
	});
	$('.pano').css('background-repeat','no-repeat');
})
