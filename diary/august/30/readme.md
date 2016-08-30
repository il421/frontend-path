# 30 августа

## Тестирование мобильных

### Через прокси
Для тестирования на устройствах нужно собрать фронт для прода: `npm run prod`.

Прописываем свой айпишник в настройках прокси внтури настроек вайфая и можем открывать урл (например, `matrix.loc`) на мобильном.

### Если каждый проект на своем порте
Можно каждый проект распологать на отдельном порте:

```
server {
    listen 8181;
    server_name 192.168.0.13;
    ...
}
```

В этом случае на любом устройстве в сети он будет доступен по адресу `http://192.168.0.13:8181`.

Маджента не всегда корректно обрабатывает порты в урлах, могут быть глюки.

### Если все проекты на дефолтном порте и каждый под своим именем
Тут можно закомментировать хосты в настройках nginx, перезапустить серер и по айпишнику будет доступен только нужный проект.

## Улучшаем сборку на проде
Задача: улучшить вот этот код:

```json
"dev": "php -f shell/toggle_base_skin_url.php -- --base_url http://localhost:8080/skin/ && rm -rf skin/frontend/matrix/default/public && npm start",
"prod": "php -f shell/toggle_base_skin_url.php -- --base_url {{unsecure_base_url}}skin/ && rm -rf skin/frontend/matrix/default/tmp && NODE_ENV=production webpack && rm -rf skin/frontend/matrix/default/public && cp -r skin/frontend/matrix/default/tmp skin/frontend/matrix/default/public",
```

Косяки в текущей:
* Очень длинная строка, долго разбираться, что к чему.
* Папка `tmp/` остается после сборки, хотя она должна превращаться `public/`. Происходит копирование вместо переименования.
* Куча захардкоженных путей.

Самое первое, что можно сделать — применять переименовывание вместо копирования. Получим:

```
NODE_ENV=production webpack && rm -rf skin/frontend/matrix/default/public &&  mv skin/frontend/matrix/default/tmp skin/frontend/matrix/default/public
```

Плохо, что `tmp/` создается через Вебпак и потом переименовывается в скрипте. Лушче все держать в одном месте и использовать переменные с путями, а не хардкодить их.

Можно все в Вебпаке: как только сборка собралась в `tmp`, то переименовать `tmp` в `public`, предварительно удалив текущую `public`.

Можно использовать нативный модуль `fs` из Ноды, но там придется помудрить с рекурсивным удалением. `fs` дает низкоуровневый функционал и много надо делать руками.

На NPM есть модуль [`fs-extra`](https://www.npmjs.com/package/fs-extra), там уже есть методы для рекурсивного удаления и переименовывания.

Для того, чтобы запустить манипуляции с папками уже после сборки, можно использовать плагин [`on-build-webpack`](https://www.npmjs.com/package/on-build-webpack).

Итого получаем:

```js
var fse = require('fs-extra');
var WebpackOnBuildPlugin = require('on-build-webpack');

var publicPath = path.resolve('skin/frontend/matrix/default/public'),
var tmpPath = path.resolve('skin/frontend/matrix/default/tmp');

module.exports = {
    plugins: [
        new WebpackOnBuildPlugin(function (stats) {
            // Здесь все уже будет собрано: для дева в ОЗУ, а для прода в tmp

            // Удаляем public из файловой системы:
            fse.remove(publicPath, function (err) {
                if (err) return console.error(err);

                // Переименовываем tmp в public на проде:
                if (env == 'production') {
                    fse.move(tmpPath, publicPath, function (err) {
                        if (err) return console.error(err);
                        console.log("Moved tmp to public!")
                    })
                }
            })
        })
    ]
};
```

А скрипты в `package.json` урощаются до таких:

```json
"dev": "php -f shell/toggle_base_skin_url.php -- --base_url http://localhost:8080/skin/ npm start",
"prod": "php -f shell/toggle_base_skin_url.php -- --base_url {{unsecure_base_url}}skin/ && NODE_ENV=production webpack",
```