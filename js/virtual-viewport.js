"use strict";
$(document).ready(function(){
	// VIEWPORT
	// https://github.com/gabceb/jquery-browser-plugin
	var htmlWidth = $('html').width();
	var htmlHeight = $('html').height();
	var virtualViewportWidthPhone = 640;
	var virtualViewportWidthDesktop = 1280;
	var virtualViewportWidthMax = 1400;
	// for desktops: virtual viewport
	if ($.browser.desktop) {
		if (!$.browser.mozilla) {
			var scaleScreen = function(){
				$('html').css('zoom', '1');
				htmlWidth = $('html').width();
				if ((htmlWidth > virtualViewportWidthMax) && !$.browser.msie) {
					var zoom = htmlWidth/virtualViewportWidthMax;
				} else if ((htmlWidth > virtualViewportWidthPhone) && !$.browser.msie) {
					var zoom = htmlWidth/virtualViewportWidthDesktop;
				} else if ((htmlWidth <= virtualViewportWidthPhone) && !$.browser.msie) {
					var zoom = htmlWidth/virtualViewportWidthPhone;
				};
				$('html').css('zoom', zoom);
			};
		} else {
			$('body').wrapInner('<div id="zoom-wrap"></div>');
			var viewport;
			var zoom;
			var scaleScreen = function(){
				$('body').css({
					'transform': 'scale(1)',
					'margin': 0
				});
				htmlWidth = $('body').width();
				htmlHeight = $('body').height();
				if ((htmlWidth > virtualViewportWidthMax) && !$.browser.msie) {
					var zoom = htmlWidth/virtualViewportWidthMax;
					var viewport = virtualViewportWidthMax;
				} else if ((htmlWidth > virtualViewportWidthPhone) && !$.browser.msie) {
					var zoom = htmlWidth/virtualViewportWidthDesktop;
					var viewport = virtualViewportWidthDesktop;
				} else if ((htmlWidth <= virtualViewportWidthPhone) && !$.browser.msie) {
					var zoom = htmlWidth/virtualViewportWidthPhone;
					var viewport = virtualViewportWidthPhone;
				};
				$('body').css({
					'transform': 'scale('+zoom+')',
					'margin-left': -viewport * (1-zoom) / 2 + "px",
					'margin-right': -viewport * (1-zoom) / 2 + "px",
					'margin-top': -htmlHeight * (1-zoom) / 2,
					'margin-bottom': -htmlHeight * (1-zoom) / 2
				});
				$('#zoom-wrap').css({
					'overflow-y': 'hidden'
				});
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
