# Примеры плохого и хорошего кода

## БЭМ

### Именование блоков
Плохо: :hankey:
```less
.home-banner {
    &-item { // Найти класс .home-banner-intem в коде будет невозможно.
             // Имена блоков нужно писать полностью: .home-banner-item.
    }
}
```
Сойдет, но выглядит странно: :unamused:
```less
.home-banner {}
.home-banner-item {} // item — англ. пункт списка, составная часть чего-либо.
                     // Судя по имени, элемент здесь подойдет лучше.
```
Хорошо: :+1:
```less
.home-banner {
    &__item { // Имя блока написано полностью, логичное именование.
    }
}
```

## Верстка
### Don't Repeat Yourself
Нужно верстать повторяющийся кусок макета один раз и размножать верстку без копипаста. Размножать можно или в PHP (например, через `foreach`) или в JS-шаблоне. Разумеется, не всегда есть такая возможность, но если она есть, то ее нужно использовать:

Плохо: :hankey:
```html
<!-- Копипаст. Если надо будет изменить что-то, менять придется во многих местах.
Вероятность ошибки увеличивается, простыня кода мешает понять суть: -->
<ul class="cms-gallery">
    <li class="cms-gallery__item">
        <a class="fancybox" rel="gallery" href="IMG_3522.jpg">
            <img src="previews/IMG_3522.jpg" alt="">
        </a>
    </li>
    <li class="cms-gallery__item">
        <a class="fancybox" rel="gallery" href="IMG_3698.jpg">
            <img src="previews/IMG_3698.jpg" alt="">
        </a>
    </li>
    <li class="cms-gallery__item">
        <a class="fancybox" rel="gallery" href="IMG_3917.jpg">
            <img src="previews/IMG_3917.jpg" alt="">
        </a>
    </li>
    <li class="cms-gallery__item">
        <a class="fancybox" rel="gallery" href="IMG_5025.jpg">
            <img src="previews/IMG_5025.jpg" alt="">
        </a>
    </li>
    <!-- ... -->
</ul>
```
Хорошо: :+1:
```html
<!-- 
Код элемента не дублируется, занимает меньше места.
Все просто и понятно, не нужно разбираться с простыней HTML:
-->
<ul class="cms-gallery">
    <?php
    $images = [
        'IMG_3522',
        'IMG_3698',
        'IMG_3917',
        'IMG_5025',
        // ...
    ]
    ?>
    <?php foreach ( $images as $image ): ?>
        <li class="cms-gallery__item">
            <a
                class="fancybox cms-gallery__link"
                rel="gallery"
                href="<?php echo $image; ?>.jpg"
                style="background-image:url(<?php echo $image; ?>.jpg);">
            </a>
        </li>
    <?php endforeach; ?>
</ul>
```

### Именование классов
Слова в именах классов разделяются `-`:

Плохо :shit:

```html
<div class="top_menu"></div>
<!-- Слова разделены подчеркиванием -->
```

Хорошо :+1:

```html
<div class="top-menu"></div>
<!-- Слова разделены дефисом -->
```

В БЭМ элементы именуются через `__`, а модификаторы через `_`:

```html
<div class="top-menu top-menu_secondary">
    <div class="top-menu__item"></div>
</div>
```

### Именование айди
Айдишники именуются `камелКейсом`, как принято в JS:

```html
<div class="top-menu" id="topMenu"></div>
```

Стили по `id` не пишем, только по классам. Айдишники могут быть использованы в JS, если элемент ну странице встречается один раз (выборка по `id` происходит гораздо быстрее, чем по классам) и для связывания лейблов формы с интпутами.

## jQuery
### Выборка элементов
Плохо :shit:
```javascript
var menuItems = $('#menu li');
// По имени переменной не понятно, что это объект jQuery.
// Сначала браузер найдет все li в документе,
// а уже потом будет фильтровать их по принадлежности к #menu.
```
Хорошо :+1:
```javascript
var $menuItems = $('#menu').find('li');
// Из имени переменной видно, что имеем дело с объектом jQuery.
// Найдет #menu, это быстро.
// Связано с алгоритмом рендеринга у браузеров.
// Потом уже отфильтрует только детей #menu и найдет li.

var $menuItems = $('#menu').children();
// Если нужно выбрать только прямых потомков.
// Аналогично #menu > li, только быстрее.
```

### Ajax
Плохо :shit:
```js
$.ajax({
    // Параметры задаются прямо в урле — плохо читаемо.
    // Параметр захардкожен.
    url: 'response.php?price=2038',
    beforeSend: showLoading

    // Используются устаревшие методы (success, complete, error)
    success: function(json) {
        $("<div class=\"content\">").html(json.html).appendTo("body");
        hideLoading(); // убираем крутилку
    }

    // Нет обработчиков ошибок.
    // Крутилка убирается только по success. При ошибке она будет крутиться дальше.
});

// Используется $.getJSON:
var productsPromise = $.getJSON('./products.json');
// Для консистентности кода нужно всегда пользоваться $.ajax
```

Хорошо :+1:
```javascript
// Есть обработчики ошибок.
// Используются правильные методы: $.ajax, done, fail, always.
// GET-параметры вынесены из URL.
$.ajax({
    url: "response.php",
    data: {
        'price': $btn.data('price') // Параметр берется из HTML
    },
}).done(function (json) {
    $("<div class=\"content\">").html(json.html).appendTo("body");
}).fail(function (xhr, status, errorThrown) {
    // Показали ошибку, если сервер не ответил и вывели техническую информация в консоль:
    alert("Извините, произошла ошибка. Пожалуйста, обновите страницу и попробуйте еще раз.");
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
}).always(function (xhr, status) {
    $.fancybox.hideLoading(); // Убрали крутилку в любом случае.
});
```

