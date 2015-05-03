"use strict";
$(document).ready(function(){
	// VIEWPORT
	// https://github.com/gabceb/jquery-browser-plugin
	var htmlWidth = $('html').width();
	var virtualViewportWidthPhone = 640;
	var virtualViewportWidthDesktop = 1280;
	var virtualViewportWidthMax = 1400;
	// for desktops: virtual viewport
	if ($.browser.desktop) {
		var scaleScreen = function(){
			$('html').css('zoom', '1');
			htmlWidth = $('html').width();
			if ((htmlWidth > virtualViewportWidthMax) && !$.browser.msie) {
				var zoom = htmlWidth/virtualViewportWidthMax;
				$('html').css('zoom', zoom);
			} else if ((htmlWidth > virtualViewportWidthPhone) && !$.browser.msie) {
				var zoom = htmlWidth/virtualViewportWidthDesktop;
				$('html').css('zoom', zoom);
			} else if ((htmlWidth <= virtualViewportWidthPhone) && !$.browser.msie) {
				var zoom = htmlWidth/virtualViewportWidthPhone;
				$('html').css('zoom', zoom);
			};
		};
		scaleScreen();
		var resizeTimer = true;
		$(window).on('resize', function(){
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(scaleScreen, 100);
		});
	};
	// for phones and tablets: native viewport
	if ($.browser.mobile) {
		$('html').css('min-width', '100vw');
		// for phones
		if (htmlWidth <= virtualViewportWidthPhone) {
			$('meta[name=viewport]').attr('content', 'width=' + virtualViewportWidthPhone);
		// for tablets
		} else {
			$('meta[name=viewport]').attr('content', 'width=' + virtualViewportWidthDesktop);
		};
	};
	// for ie: native viewport
	if ($.browser.msie) {
		$('head').append('<style>@-ms-viewport {width: ' + virtualViewportWidthDesktop + 'px}</style>');
	};
	// END VIEWPORT
});
