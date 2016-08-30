# 23 августа 2016

## Зачем делают return в Гальп-таске
`return` говорит Гальпу, что нужно вернуть объект `stream` после выполнения таска. Таким образом мы можем выстраивать зависимости одних тасков от других (по умолчанию Гальп запускает все таски параллельно).

Везде пихать `return` особого смысла нет. Если нужно организовывать зависимости, передаем массив зависимостей вторым параметром:

```js
var gulp = require('gulp');
var del = require('del'); // rm -rf

gulp.task('clean', function() {
    return del(['output']);
});

gulp.task('templates', ['clean'], function() {
    // Сначала запустить clean, а уже потом делать остальное
    var stream = gulp.src(['src/templates/*.hbs'])
        // do some concatenation, minification, etc.
        .pipe(gulp.dest('output/templates/'));
    return stream; // return the stream as the completion hint

});

gulp.task('styles', ['clean'], function() {
    var stream = gulp.src(['src/styles/app.less'])
        // do some hinting, minification, etc.
        .pipe(gulp.dest('output/css/app.css'));
    return stream;
});

gulp.task('build', ['templates', 'styles']);

// templates and styles will be processed in parallel.
// clean will be guaranteed to complete before either start.
// clean will not be run twice, even though it is called as a dependency twice.

gulp.task('default', ['build']);
```

* https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-tasks-in-series.md
* http://stackoverflow.com/questions/21699146/gulp-js-task-return-on-src

## Работа с документацией
Если что-то не получается решить сразу, то нужно прежде всего внимательно ознакомиться с документацией.

Если проблема с проектом — есть ридми на Гитхабе или Вики в Редмайне. Если проблема с NPM-пакетом, то нужно смотреть его репозиторий. Как правило там есть подробное Readme.md. Если проблему не удается решить, нужно смотреть issues на Гитхабе. Если это баг, то там может быть решение. Если какой-то вопрос, то там может быть ответ.

## Абсолютное позиционирование
Мы можем делать следующее, чтобы растянуть абсолютный блок внутри относительного или на все окно:

```css
.abs {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
```

## Домашняя работа
* Улучшить перенос собранных ресурсов из `temp/` в `public/` (есть на некоторых проектах).
