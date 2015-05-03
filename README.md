Russian version of readme is available [here](https://github.com/suenot/virtual-viewport/master/README.ru.md).

Virtual viewport
=========
Virtual viewport emulate viewport on desktops browsers.

### Install
Add to html:
```
<script src="js/jquery-2.1.3.min.js"></script>
<script src="js/jquery.browser.min.js"></script>
<script src="js/virtual-viewport.js"></script>
```

### Configure
In virtual-viewport.js we can change default values:
```
var virtualViewportWidthPhone = 640;
var virtualViewportWidthDesktop = 1280;
var virtualViewportWidthMax = 1400;
```

### How it works
Native viewport works only in mobile browsers and in Internet Explorer.

#### Mobile browsers
```
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
```

#### Internet Explorer
```
if ($.browser.msie) {
    $('head').append('<style>@-ms-viewport {width: ' + virtualViewportWidthDesktop + 'px}</style>');
};
```

#### Desktops browsers
```
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
```