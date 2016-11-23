define(function() {
	return {
		imagesize: function(elem, prop, auto) {
			var heightBlock, widthBlock;
			var elem = $(elem);
			var heightBlock =	elem.closest('.block').height();
			var widthBlock = elem.closest('.block').width();
			var landscape = heightBlock <= widthBlock ? true : false;
			var auto = $(window).width() < 768 ? true : false;
			var propName = prop;

			heightBlock += 'px';
			widthBlock += 'px';
			heightBlock = auto === true ? 'auto' : heightBlock;
			widthBlock = auto === true ? 'auto' : widthBlock;
			prop = prop === 'height' ? heightBlock : widthBlock;
			//console.log(propName + ': ' + prop);
			return elem;
		}
	};
});
