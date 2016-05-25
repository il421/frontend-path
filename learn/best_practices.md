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

## jQuery
### Ajax
Плохо :shit:
```js
// Нет обработчиков ошибок:
$.ajax({
    url: "post.php",
    // ...
}).done(function (json) {
    // Все ок. Показываем ответ сервера:
    $("<h1>").text(json.title).appendTo("body");
    $("<div class=\"content\">").html(json.html).appendTo("body");
});
```

Хорошо :+1:
```javascript
// Есть обработчики ошибок:
$.ajax({
    url: "post.php",
    // ...
}).done(function (json) {
    // Все ок. Показываем ответ сервера:
    $("<h1>").text(json.title).appendTo("body");
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

