# 25 июля

## Объекты jQuery vs. DOM объекты
Нужно помнить, что при переборе jQuery-коллекций `this`-ом является не jQuery-объект, а DOM-элемент. Вот [пример с пояснениями](code/index.html).

DOM-коллекции — живые, а jQuery — нет:

```js
var $els = $('.element')
var els = document.getElementsByClassName('.element')

$els.length == els.length;  // true

$('body').append('<div class="element">test</div>');
$els.length == els.length;  // false, в DOM-коллекции стало на 1 больше
```

[Как достать нативный DOM-элемент из jQuery-коллекции](https://learn.jquery.com/using-jquery-core/faq/how-do-i-pull-a-native-dom-element-from-a-jquery-object/)

## Полифил flexibility для ИЕ9
Флексибилити версии 2 работает через модули и бажит. На данный момент лучше использовать версию [1.0.6](https://github.com/jonathantneal/flexibility/releases/tag/v1.0.6).

На NPM лежит версия 2.

## Полифил для `<picture>`
[Picturefill](https://scottjehl.github.io/picturefill/)

## Прочее
[Вариант решения первой домашки](https://gist.github.com/amiskov/b94e0cf7298be2075fa27eedfc59adf8)

Курсы с уклоном в функциональное программирование:
* [Основы программирования (JS, ES6)](https://ru.hexlet.io/courses/programming-basics)
* [Структура и интерпретация компьютерных программ (Racket, Scheme)](https://ru.hexlet.io/courses/sicp)

## Домашка
Скоро будет...

* Заверстать макет с off canvas меню и сложным гридом, типа главной Армани.
* Большие баннеры для больших экранов, маленькие — для маленьких.
* Чтобы использовался `calc`.
* Должны быть viewport units, флексбоксы.

