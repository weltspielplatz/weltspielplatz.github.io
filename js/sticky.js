define(['jquery'], function($) {
	var navigation = function() {
		return $('#navigation');
	};
	var menuParentWidth = function() {
		return navigation().closest('.menu').css('width');
	};
	var menuOffsetTop = navigation().offset().top;
	return {
		helper: function() {
			var offsetTop = $(window).scrollTop();
			var menuParentWidth = navigation().closest('.menu').css('width');
			var menuHeight = navigation().height();
			return {
				offsetTop: offsetTop,
				menuParentWidth: menuParentWidth,
				menuHeight: menuHeight
			}
		},
		makeSticky: function() {
			//console.log(this.helper().offsetTop, menuOffsetTop);
			if (this.helper().offsetTop > menuOffsetTop){
				navigation().css({'position':'fixed', 'top':'0', 'width':this.helper().menuParentWidth}).addClass('sticky');
					$('.menu').css({'height':this.helper().menuHeight});
			} else {
					navigation().css({'position':'relative', 'top':'inital'}).removeClass('sticky');
			}
 		}		
	}
})

