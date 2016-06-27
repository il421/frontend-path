# 27 июня

## NPM
[Материалы для изучения](../../../learn/npm.md).

## Фронтовый шаблонизатор
Когда нужно получить голые данные (как правило JSON) и сгенерировать на их основе верстку, часто используют шаблонизатор. Например, может прийти список товаров в JSON-формате. Или при клике на товар мы можем получить JSON с подробной информацией о нем (картинка, описание, ценовые правила и пр.). С помощью шаблонов мы можем это дело красиво представить без генерирования разметки в JS руками.

Шаблон часто хранят в теге [`<script>`](http://learn.javascript.ru/template-lodash#хранение-шаблона-в-документе), указывая ему какой-то специфический атрибут `type`: `<script type="text/template" id="menu-template">`. Так браузер не будет пытаться обработать этот код как JS, у которого `type="application/javascript`.

* [Шаблонизатор LoDash](http://learn.javascript.ru/template-lodash) — общая информация о шаблонизаторах на примере LoDash.
* [Эволюция шаблонных систем для JavaScript](http://learn.javascript.ru/templates)

Основные шаблонизаторы, которые используются у нас на проектах: [lodash](https://learn.javascript.ru/template-lodash), [jsrender](https://www.jsviews.com/#jsrender), который вышел из [jquery-tmpl](https://github.com/BorisMoore/jquery-tmpl).


