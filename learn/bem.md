# БЭМ

```
Документ в процессе. Текст будет обсуждаться и изменяться.
```

<div style="float:right; font-style: italic;">
Красивое лучше, чем уродливое.<br>
Явное лучше, чем неявное.<br>
Плоское лучше, чем вложенное.<br>
</div>
<div style="text-align: right; clear: both;">
    <small>— Отрывок из <a href="https://en.wikipedia.org/wiki/Zen_of_Python">The Zen of Python</a></small>
</div>

# Зачем
Без ограничений не бывает творчества. БЭМ дает ограничения. Рамки позволяют сделать работу проще. Рутинные задачи (придумать названия классов, организовать стили) решаются сами собой.

БЭМ позволяет команде лучше взаимодействовать. Это понятный язык, на котором говорят верстальщики.

Разработчику, который пришел на любой проект, проще понимать код. Не нужно подстраиваться под каждый проект, нужно только один раз разобраться с БЭМ-нотацией.

Легче поддерживать код.

# Нужен ли Full Stack BEM?
Для работы с БЭМ придумали кучу инструментов. Full Stack BEM — это набор инструментов, которые позволяют компоновать страницу из блоков через json.

Нам он не нужен. Наша задача — максимально упростить вхождение в верстку и обеспечить ее максимальное понимание.

Все знают HTML, но никто не знает BEM-json. Проводить код-ревью BEM-json невозможно.

Нам интересен исключительно способ именования элементов и удобная организация стилей на файловой системе.

# Каскад
HTML и CSS изначально придуманы для оформления текстов. Они не предназначены для реализации сложных интерфейсов.

Для оформления текстов каскад вполне хорош, но нам надо делать сложные дизайны, динамические элементы интерфейса, повторяющиеся в разных местах блоки и для этого нужно что-то более изящное, чем каскад.

БЭМ помогает создать плоскую структуру стилей и сделать блоки уникальными без каскада. Каскад в БЭМе становится помощником, а не догмой и не связывает руки.

Часто каскад используется для элементов блока с модификатором:

```less
.menu {
    &__item {
        font-size: 14px;
        color: red;
    }

    &_bottom &__item { // модифицируем пункты меню в .menu_bottom
        font-size: 12px;
        color: blue;
    }
}
```

Каскад для блоков может быть, если нужно специально сделать блок зависимым от контекста:

```less
.menu {
    // общие стили
}

.header {
    .menu {
        // только для хедера
    }
}

.footer {
    .menu {
        // только для футера
    }
}
```

Еще случай каскада для блоков. Например, есть блок `.pagination`. Он встречается на Категории, Продукте, Вопросах и ответах и везде, где есть разбивка по страницам. Вид у блока одинаковый, но есть нюансы в отступах, положению и пр. Мы можем сделать так:

```less
// pagination.less
.pagination {
    // Родные стили блока, которые присутствуют везде
}

// category.less
// Структура html:
// <div class="category__pagination">
//    <div class="pagination"></div>
// </div>
.category {
    &__pagination {
        // задаем отступы, позиционируем, может что-то еще делаем
    }

    .pagination {
        // Тут можем, например, перекрасить что-то.
        // Не обязательно добавлять модификатор к блоку .pagination_category.
    }
}
```

# Блок (независимый блок)
Независимый блок или просто блок, это самодостаточный элемент страницы, который при перемещении в другое место на странице или на другую страницу не теряет своей самодостаточности (выглядит так же, работает так же).
Харисов: https://ru.bem.info/forum/-43/

* Используем только `.class`, нельзя именовать блоки через `#id`.
* Если класс состоит из нескольких слов, то их нужно разделять `-`.
* В БЭМ для элементов могут использоваться префиксы: `l-`, `g-`, `b-` и пр. Нам они особо не нужны. Незачем вводить сущности там, где можно без них обойтись. Оставляем только для `.js-` для навешивания JS-обработчиков. _Для таких классов нельзя писать стили, только JS_.
* Именовать `js-` блоки нужно так же, как обычные классы — через `-`, не камелкейсом. Камелкейс только для айдишников.
* TODO: `js-` навешивать на все задействованные элементы или только на те, на которые непосредственно навешаны обработчики? https://gist.github.com/amiskov/c35a5d4d91e0108f076c0b359a189f48
* Нет классов вне блоков. Все стили написаны только в контексте блоков.
История создания БЭМ: https://ru.bem.info/forum/-147/

## Имена блоков
Имена блоков должны отображать сущность блока, его смысл, а не его внешний вид:

```html
<!-- Не правильно: -->
<input class="big_red_button">

<!-- Правильно: -->
<input class="order-button checkout__submit">
```

Однако, иногда попадаются дизайны, где сложно придумать имена классов исходя из логики поведения элементов. В таком случае можно задать модификаторы и по внешнему виду: `.btn_small`, `.btn_red`. Но только в том случае, когда реально не подойдет, например, `.btn_secondary` или `.btn_primary`.

Не нужно бояться создавать новые блоки. Если возникает желание сделать элемент у элемента (что не правильно), то, возможно, стоит ввести новый блок.

## Префиксы
Префиксы добавляют сложности, повышают порог вхождения, но дают больше возможностей по организации структуры.

Мы не используем префиксы, кроме `.js-`. Ништяки от их использования не перекрывают их сложности в наших реалиях. Без них мы ничего не теряем, без них новеньким проще врубиться в БЭМ. 

Пример:
* `.l-` — префикс для лайаутных блоков. Тех, которые отвечают чисто за позиционирование, ширину, без визуального представления.
* `.b-` — основной префикс.
* `.h-` — внешняя обертка блока.
* `.js-` — префикс для блоков, на которые навешивается JS-обработчики.

```html
<div class="l-header"><!-- Позиционирование, ширина, высота -->
    <div class="h-header"><!-- Обертка блока, может задавать тень, фон, отступы и пр. -->
        <header class="b-header"></header><!-- оформление -->
    </div>
</div>
```

## Соглашение об именовании
Блок — это `less`-файл со стилями для блока. В нем содержатся только стили для блока, его элементов, модификаторов и `@media`-правила.

Модуль — это блок (виджет), для реализации функционала которого нужен JS. На файловой системе это папка с js и less-файлами. В большинстве случаев хватает одного файла стилей и одного js-файла, но если в модуле есть несколько блоков, то для них нужно создавать отдельные less-файлы.

Нельзя называть папку `less`, нужно `blocks`. Потому что если на проекте будет не `less`, то будет не правильно.

## Перенос и реализация
Мадженто генерирует статические страницы. Верстка для них вставляется в темплейты руками, если есть заверстанные макеты.

Стили и скрипты для компонента (блок, который будет встречаться на разных страницах) нужно класть в отдельную папку:

```bash
src/
    modules/
        related-products/
            index.js
            index.less
```

Далее этот блок можно импортить на разных страницах. Например, блок `related-products` может быть показан на странице категории и на корзине:

```
src/
    modules/
        _category/
            index.js
            index.less
        _cart/
            index.js
            index.less
        related-products
            index.js
            index.less    
```

Верстку вставляем в `.phtml`-файлы вручную, стили и скрипты блока импортим так:

```js
//src/pages/category/index.js
require('../../blocks/related-products');

//src/pages/cart/index.js
require('../../blocks/related-products');
```

Некоторые блоки (попапы, например) можно подключать через `require.ensure()`, если используется Вебпак или асинхронный `require`, если используется AMD.

## Делать файл или не делать?
Если у нас есть страница, на которой много блоков, характерных только ей (например, категория товаров), то рекомендуется использовать только один файл `index.less`. Так будет удобно искать блоки через `Ctrl+F`.

[ ] Подумать над разбивкой файлов. Посоветоваться с ребятами.

## И блок и элемент
Блок может быть элементом другого блока. В БЭМ это называется миксование.

Например, пост в блоге:

```html
<section class="blog">
    <article class="blog__item post"></article> 
</section>
```

Зачем так делать?
Для `.post` мы задаем стили такие, что позволяют его переносить с места на место. Для `.blog__item` мы задаем стили такие, которые форматируют статью так, как это нужно внутри блока `.blog`. Таким образом `.post` не зависим и в то же время как-то изменяется в зависимости от положения внутри `.blog`.
Косяки: стили могут конфликтовать. Что-то внутри `.post` может перетереть стили для `.blog__item`.
Выход: можно делать так (это решение более стабильное):
```html
<section class="blog">
    <div class="blog__item">
        <article class="post"></article>
    </div>
</section>
```
Можно так же добавить модификатор к `.post`:
```html
<section class="blog">
    <article class="post post_blog"></article>
</section>
```
Однако, решение с отдельным элементом `.blog__item`, оборачивающим `.post` более изящное и логически правильное

# Элемент
Элемент — часть блока, отвечающая за какой-то его функционал.

Элемент не может существовать вне блока, вне блока он теряет смысл. Например, кнопка `Найти` в форме поиска. Или ссылка в меню.

## Именование
В имени элемента должно быть название блока и название элемента. В HTML элементы могут быть вложены друг-в-друга:

```html
<ul class="menu">
    <li class="menu__item">
        <a class="menu__link" href="#">
            <span class="menu__text">О компании</span>
            <!-- Как вариант, можно написать menu__link-text -->
        </a>
    </li>
</ul>
```

Элемент `menu__link` принадлежит блоку `menu`, об этом нам сообщает его класс.

Не верно писать `menu__item__link`, потому что ссылка принадлежит меню, а не элементу `menu__item`. **Элемент не может принадлежать другому элементу. Элементы — это атомарные, неделимые части блока.**

В LESS такая структура выглядит так:

```less
.menu {
    &__item { }
    &__link { }
    &__text { }
}
```

Плоская структура, без каскада. Все понятно, легко поддерживать.

Еще пример правильного именования классов:
```html
<div class="block">
    <div class="block__elem1">
        <div class="block__elem2"></div>
    </div>
    <div class="block__elem3"></div>
</div>
```

```css
.block {}
.block__elem1 {}
.block__elem2 {}
.block__elem3 {}
```

## Элемент у элемента?
Если вам нужно сделать элемент у элемента, значит вам нужно:
* или создать новый блок
* или сделать ваше БЭМ-дерево с одинарной вложенностью элементов

Не нужно бояться создавать новые блоки.

# @media queries
Стили для мобильных пишутся внутри блоков и элементов. Код должен быть написан так, чтобы мы могли скопировать CSS-код блока (`.menu` и то, что внутре него), вставить его в другой проект и все заработает. Не нужно их разносить по разным местам.

**Так делать не правильно:**
```css
.menu {
    &__item { }
}
@media @phone {
    .menu {
        /* ... */
        &__item {
            /* ... */
        }
    }
}
```

Разнося стили для одного блока по разным местам мы нарушаем главный принцип хорошей разработки: Don't repeat yourself. Это ухудшает поддерживаемость кода. Один написал стили для разных медиа, а это увидит не сразу. Ему надо будет знать, что код для мобильника есть и найти его где-то.

Если код будет написан в одном месте, то мы получим хорошо поддерживаемый, не повторяющийся код:

```less
.menu {
    font-size: 14px;
    // Все стили для блока в одном месте
    @mobile {
        width: auto;
        margin: 0 5%;
    }

    @media @large {
        width: 1200px;
        margin: 0 auto;
    }

    &__item {
        // Все стили для элемента в одном месте
        font-size: 14px;

        @media @large {
            font-size: 18px;
        }
    }
}
```


# Изменение блоков
Внешний вид блока можно изменить следующими способами:
* Модификатором (для блока или для элемента)
* Контекстом (каскадом от блока выше)
* (? разобраться)Уровнем переопределения (добавлением-перезаписью файла стилей)
* Миксованием (добавлением классов от других блоков)
    - в том числе через глобальный класс (? разобраться)

# Модификаторы    
Пдумать (TODO):
Отделение модификатора через `--` более читабельно, чем через `_`. Логика такая: используем подчеркивание для элементов, а дефисы для модификаторов. И везде по два.

Изменить блок можно добави в к нему модификатор. Элементы блока могут быть переопределены по каскаду от модификатора, это нормально:

```css
.menu {
    &__item {
        font-size: 14px;
        color: red;
    }
    &_bottom &__item {
        font-size: 12px;
        color: blue;
    }
}
```

Изменить элемент тоже можно через модификатор. Например, активный пункт меню:

```html
<li class="menu__item menu__item--active"></li>
```

Нужно быть внимательным. Сделать активной ссылку, нормально сделать через модификатор. Если нужно сильно переделать элемент, то может быть лучше ввести новый блок (придумать пример). Не нужно каскадом переписывать все правила.

Модификаторы общего характера (активное состояние, по наведению, текущий пункт меню) можно сокращать, опуская название блока или элемента:

```html
<li class="menu__item _active"></li>
```

Фактически, это блоки с префиксом `_`. И далее стили:

```css
.menu {
    &__item {
        background: gray;
        color: black;

        &._active {
            background: black;
            color: white;

            .menu__link { /* допускается каскад */
                font-weight: bold;
            }
        }
    }
}
```

Таким образом, `_active` может использоваться с любыми блоками и элементами и влиять только на них, т. к. стили задаются по двум классам сразу: `&._active`.

**Не допускается писать стили для `_active` вне контекста модифицируемого блока или элемента.**

```css
/* Так нельзя: */
_active {
    font-weight: bold; /* нельзя !!! Это повлияет на все элементы, к которым добавиться класс _active */
}
```

Когда их применять?
Если мы модифицируем состояние элемента (активная ссылка, текущий пункт меню, текущй таб и пр.), то проще и понятнее применить сокраенный модификатор.
Если нужно модифицировать вид блока (форма поиска полная и сокращенная, меню в хедере и футере), то лучше подойдет модификатор с полным именем:

```html
<div class="menu menu_top"></div>
<div class="menu menu_bottom"></div>

<div class="search search_mini"></div>
<div class="search search_full"></div>
```

## Глобальные блоки-модификаторы
Глобальный модификатор влияет на внешний вид блока. Например:

```html
<div class="product">
    <div class="product__pic col-md-6"></div>
</div>
```

`.col-md-6` — это колонка из Бутстрапа, она делает ширину блока в 6 колонок 12-ти колоночной сетки. Этот класс меняет внешний вид элементм `.product__pic` и, таким образом, блок `.prodct` перестает быть независимым. Это плохо. Блок должен жить сам по себе. 

Термин "блок-модификатор" в мире БЭМ звучит глупо. Так и есть, применять его не стоит.

## Тип модификатора
В БЭМ принято указывать, что именно меняет модификатор: `&_size_big`, `&_color_red`, `&_type_warning` и пр.

Мы опускаем тип модификатора: `&_big`, `&_red`, `&_warning`. Этого хватает, так проще.

# Mobile first [? удостовериться]
Часто макеты приходят для десктопов, а потом для мобильных.

Нам нужно писать стили сначала для десктопов, потом для мобильных.

Логично, чтобы стили шли по нарастающие: по умолчанию для мобильных, потом для планшетов и потом для десктопов.


# Текст из админки
Для текста, который вводит пользователь, нормально делать каскад:

```css
.cms-text {
    h2 {}
    p {}
    /* ... */
}
```


# Материалы
http://ihorzenich.github.io/talks/webcamp/2015/bem/

