# 11 июля

## Разные замечания по домашке products-by-type
* Всегда нужно юзать `'use strict'`.
* Повторяющийся код нужно выносить в функции.
* Проверка существования свойства в объекте:
    * `key in products` — если не надо фильтровать свойства из прототипа.
    * `products.hasOwnProperty(key)` — если нужно избежать свойств из прототипа.
* Для темплейтов префикс `js-` не нужен. Темплейт всегда один, используем айдишник.
* `setTimeout` вряд ли понадобится реальных проектах.
* Всегда используем метод [`$.ajax`](https://github.com/OggettoWeb/frontend-path/blob/master/learn/best_practices.md#ajax) для асинхронных запросов.

## require
Инструкции `require('./my-module')` исполняются на этапе формирования файлов. Они не могут быть вызваны из функции или по событию. Поэтому логичнее все реквайры писать в начале файла.

Исключение — `require.ensure(['./my-module'])`. Модуль будет создан на этапе формирования файлов, но подгрузится динамически браузером.

## Gulp
На этой неделе проходим курс [Web Tooling & Automation](https://www.udacity.com/course/web-tooling-automation--ud892) на Udacity.

По курсу имеется [задание](https://github.com/amiskov/homeworks/tree/master/gulp-basics).

## Проверка caniuse в командной строке
https://davidwalsh.name/caniuse-command-line

Если нужно быстро проверить какое-то свойство или метод на поддержку разными браузерами.

## Git: matching vs. simple
Во второй версии гита требуется настройка поведения для пуша веток. Все сразу или каждую по отдельности?

Раньше пушились все сразу. Теперь, в git 2.x требуется указать настройку явно. Каждый раз при пуше Гит будет спрашивать:

```
warning: push.default is unset; its implicit value has changed in
Git 2.0 from 'matching' to 'simple'. To squelch this message
and maintain the traditional behavior, use:

  git config --global push.default matching

To squelch this message and adopt the new behavior now, use:

  git config --global push.default simple

When push.default is set to 'matching', git will push local branches
to the remote branches that already exist with the same name.

Since Git 2.0, Git defaults to the more conservative 'simple'
behavior, which only pushes the current branch to the corresponding
remote branch that 'git pull' uses to update the current branch.

See 'git help config' and search for 'push.default' for further information.
(the 'simple' mode was introduced in Git 1.7.11. Use the similar mode
'current' instead of 'simple' if you sometimes use older versions of Git)
```

Лучше поставить `git config --global push.default simple` и пушить каждую ветку отдельно.


