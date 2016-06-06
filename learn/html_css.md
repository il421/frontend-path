# Верстка
## Что должно быть в HTML
Обязательно указываем язык, на котором делается проект: `<html lang="ru">`. Нужно для Гугль/Яндекс переводчиков, для правильного отображения некоторых спецсимволов.

Для стандартизации дефолтных браузерных стелй подключаем  [`normalize.css`](https://htmlacademy.ru/blog/64-about-normalize-css) перед основными стилями.

Поддержку функционала в CSS и JS делаем через [Modernizr](https://modernizr.com/). Если нужно поддерживать IE8, подключаем в том числе `modernizr html5shiv`.

## Заметки с занятий
### em vs. rem
`em` — пляшут от родителя:

```less
.parent {
    font-size: 14px;

    .child {
        font-size: 2em; // 14px * 2 => 28px

        .child-child {
            font-size: 2em; // (14 * 2) * 2 = 56px
        }
    }
}
```

`rem` — пляшут от тега `<html>`, у которого в большинстве браузеров размер шрифта `16px` по умолчанию (проблему разного размера шрифта в разных браузерах по умолчанию решает `normalize.css`, он должен быть подключен):

```less
html {
    font-size: 12px; // rem схавает это
}
.parent {
    font-size: 14px; // для rem это не важно

    .child {
        font-size: 2em; // 12px * 2 => 24px

        .child-child {
            font-size: 2em; // (12 * 2) * 2 = 48px — не зависит от вложенности,
                            // только от <html>
        }
    }
}
```

### padding и margin в процентах
`padding` (как и `margin`), заданный в процентах, считается от _**ширины родительского** блока_ ([refer to width of containing block](https://www.w3.org/TR/2007/WD-css3-box-20070809/#the-padding)):

```html
<body>
    <div class="block">
        <p>Hello</p>
    </div>

    <style>
        .block {
            padding-top: 20%; /* 20% от ширины `<body>` */
        }
    </style>
</body>
```

## TODO
* Сделать стандарт для прибития футера (надо?)
* Позырить [Из PSD в HTML, как сверстать так, чтобы не было стыдно](https://www.youtube.com/watch?v=7gjxE_VEA_4).
* Позырить https://htmlacademy.ru/special/webinar
* Позырить [Как верстать сайты быстрее, чем их рисуют, Юрий Артюх](https://www.youtube.com/watch?v=tdRuZfZW99A)
* Oggetto Boilerplate?



