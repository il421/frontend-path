# Примеры плохого и хорошего кода

## БЭМ

### Именование блоков
```less
// Плохо: :hankey:
.home-banner {
    &-item { // Найти класс .home-banner-intem в коде будет невозможно.
             // Имена блоков нужно писать полностью: .home-banner-item.
    }
}

// Сойдет, но выглядит странно: 
.home-banner {}
.home-banner-item {} // item — англ. пункт списка, составная часть чего-либо.
                     // Судя по имени, элемент здесь подойдет лучше.

// Хорошо: :+1:
.home-banner {
    &__item { // Имя блока написано полностью, логичное именование.
    }
}
```

## Don't Repeat Yourself
Нужно верстать повторяющийся кусок макета один раз и размножать верстку без копипаста. Размножать можно или в PHP (например, через `foreach`) или в JS-шаблоне. Разумеется, не всегда есть такая возможность, но если она есть, то ее нужно использовать:

```html
<!-- Плохо. :hankey:
Копипаст. Если надо будет изменить что-то, менять придется во многих местах.
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

<!-- Хорошо. :+1:
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