# Организация кода
Код становится проще и лучше воспринимается если просто сделать объект с методами и избавиться от анонимных функций в качестве обработчиков событий:

Если нам нужно создать функционал, который будет инициализирован один раз на странице, самый простой способ — создать объект с нужными методами. Такой способ гораздо лучше, чем просто строчки команд jquery:

```js
var catalog = {
    init: function() {
        $('#catalog')
            .on('mouseover', '.product', this.showRating)

            // Предпочтительный вариант:
            .on('click', '.product__buy', this.buyProduct.bind(this))
            // Вариант: через утилиту jQuery: $.proxy(this.buyProduct, this);

            // Вариант: через функцию-стрелку (ES6):
            .on('click', '.product__wishlist', () => { this.addToWishlist(); });
    },

    showRating: function() {
        // Здесь this — элемент, на котором произошло событие: .product
        console.log(this);
        $(this).find('.product__rating').show();
    },

    buyProduct: function() {
        // Здесь this — наш объект catalog, потому что мы привязали контекст текущего объекта через .bind(this) или $.proxy
        console.log(this);
        this.sendRequest('Buy');
    },

    addToWishlist: function() {
        // Здесь this — наш объект catalog. Контекст привязан с помощью обертки () => { ... }. Функция-стрелка при создании сохраняет внешний контекст. Она не имеет своего this.
        console.log(this)
        this.sendRequest('Wishlist');
    },

    sendRequest: function(type) {
        alert('Request: ' + type);
    }
};

// Далее, либо инициализируем объект по DOM ready:
$(function() {
    catalog.init();
});

// Либо экспортируем:
module.exports = catalog;
```

Подробнее про this: http://learn.javascript.ru/object-methods

Внимание! Недостаточно просто создать метод `init` и напихать туда обработчики и аяксы. Нужно еще вынести колбэки в методы. Без это толку мало в создании объекта.

Если нужно инициализировать много объектов (возможно, с разными входными данными), то нужно создать конструктор: http://learn.javascript.ru/constructor-new + jQery Return Flight: 2.5 JavaScript Functions + examples/constructor.html

# Основные моменты
* Код нужно дробить на модули — небольшие функциональные блоки.
* Не нужно копипастить код. Для этого есть наследование.
* jQuery плотно работает с DOM, однако яваскрипт-модули (приложение) — это не про DOM. Функционал не нужно привязывать к DOM.
* Модули должны существовать максимально обособлено (слабое зацепление). Коммуникацию между модулями нужно организовывать с помощью событий или pub/sub (!!!).

# Инкапсуляция
Приложение нужно разделять на функциональные блоки — модули. Зачастую этого уже достаточно для грамотной организации кода.

## Объявление объекта
Самый простой способ для изоляции кода — использовать объект. Мы не получим приватных методов и свойств, но объект 
позволит нам избежать анонимных функций, выделить конфигурацию (опции), упростить поддержку кода и рефакторинг:

```js
// An object literal
var myFeature = {
    myProperty: "hello",
 
    myMethod: function() {
        console.log( myFeature.myProperty );
    },
 
    init: function( settings ) {
        myFeature.settings = settings;
    },
 
    readSettings: function() {
        console.log( myFeature.settings );
    }
};
 
myFeature.myProperty === "hello"; // true
 
myFeature.myMethod(); // "hello"
 
myFeature.init({
    foo: "bar"
});
 
myFeature.readSettings(); // { foo: "bar" }
```

## Прием проектирования «Модуль»
Позволяет делать приватные методы и открывать доступ только к необходимому функционалу.

Мы уже рассматривали ранее этот прием, почитать можно [тут](http://learn.javascript.ru/closures-module).

## Анонимные функции
Анонимные функции тяжело читаемы, их неудобно поддерживать, тестироватиь, повторно использовать код.

Вместо анонимных функций нужно использовать именованные или организовывать код в виде объектов:

```js
// BAD
$( document ).ready(function() {
    $( "#magic" ).click(function( event ) {
        $( "#yayeffects" ).slideUp(function() {
            // ...
        });
    });
 
    $( "#happiness" ).load( url + " #unicorns", function() {
        // ...
    });
 
});
 
// BETTER
var PI = {
 
    onReady: function() {
        $( "#magic" ).click( PI.candyMtn );
        $( "#happiness" ).load( PI.url + " #unicorns", PI.unicornCb );
    },
 
    candyMtn: function( event ) {
        $( "#yayeffects" ).slideUp( PI.slideCb );
    },
 
    slideCb: function() { ... },
 
    unicornCb: function() { ... }
 
};
 
$( document ).ready( PI.onReady );
```

## Не нужно копипастить (DRY — Don't Repeat Yourself)
Повторение кода очень вредно. Попробуйте что-то изментиь, придется лазить по всему коду:

```js
// BAD
if ( eventfade.data( "currently" ) !== "showing" ) {
    eventfade.stop();
}
 
if ( eventhover.data( "currently" ) !== "showing" ) {
    eventhover.stop();
}
 
if ( spans.data( "currently" ) !== "showing" ) {
    spans.stop();
}
 
// GOOD!!
var elems = [ eventfade, eventhover, spans ];
 
$.each( elems, function( i, elem ) {
    if ( elem.data( "currently" ) !== "showing" ) {
        elem.stop();
    }
});
```

# Смотреть браузер или фичу?
Если нужно использовать какой-то функционал, котоырй не всеми поддерживается, то можно определить браузер или определить, пожддерживается ли фича. Второй способ предпочтительнее.

## Минусы определения браузера
* Другие браузеры могут тоже содержать/не содержать нужную нам фичу.
* Со временем фича может добавляться/меняться
* Браузер может подменить строку UA

## Определение фичи без библиотеки
Чтобы определить, работает ли что-то в браузере, мы пробуем, и смотрим, что получилось. Это просто, но долго:

```js
// We want to show a graph in browsers that support canvas,
// but a data table in browsers that don't.
var elem = document.createElement( "canvas" );
 
if ( elem.getContext && elem.getContext( "2d" ) ) {
    showGraph();
} else {
    showTable();
}
```

Предпочтительнее использовать библиотеку Modernizr или аналогичные:

```js
if ( Modernizr.canvas ) {
    showGraphWithCanvas();
} else {
    showTable();
}
```

Ссылки: https://learn.jquery.com/code-organization/feature-browser-detection/#other-resources


