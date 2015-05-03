Virtual viewport
=========
Виртуальный вьюпорт -- эмулирует вьюпорт на компьютерах.

### Установка
Подключаем:
```
<script src="js/jquery-2.1.3.min.js"></script>
<script src="js/jquery.browser.min.js"></script>
<script src="js/virtual-viewport.js"></script>
```

### Конфигурация
В virtual-viewport.js меняем переменные под свои задачи:
```
var virtualViewportWidthPhone = 640;
var virtualViewportWidthDesktop = 1280;
var virtualViewportWidthMax = 1400;
```

### Как работает
Нативно вьюпорт работает только в мобильных браузерах и в Internet Explorer.

#### Мобильные браузеры
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

#### Остальные браузеры компьютеров
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
