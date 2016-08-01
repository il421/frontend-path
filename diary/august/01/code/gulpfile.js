var gulp = require('gulp');

// gulp-iconfont — не рекомендуется использовать. Косячит при обработке SVG.
var iconfont = require('gulp-iconfont');
var runTimestamp = Math.round(Date.now() / 1000);
gulp.task('iconfont', function() {
    gulp.src(['svg/*.svg'])
        .pipe(iconfont({
            fontName: 'iconfont', // required
            prependUnicode: true, // recommended option
            normalize: true,
            fontHeight: 1001,
            formats: ['ttf', 'woff'], // default, 'woff2' and 'svg' are available
            timestamp: runTimestamp // recommended to get consistent builds when watching files
        }))
        .on('glyphs', function(glyphs, options) {
            // CSS templating, e.g.
            console.log(glyphs, options);
        })
        .pipe(gulp.dest('fonts/'));
});

// FontCustom + gulp-fontcustom — хорошо справляется, рекомендуется для генерации шрифтов.
var fontcustom = require('gulp-fontcustom')
gulp.task('fontcustom', function() {
    gulp.src("./svg")
        .pipe(fontcustom({
            font_name: 'iconfont', // defaults to 'fontcustom',
            'css-selector': '.prefix-{{glyph}}'
        }))
        .pipe(gulp.dest("./results"))
});

// Генерация SVG-иконок. Лучше всего использовать этот подход.
var svgstore = require("gulp-svgstore");
gulp.task("svgstore", function() {
    gulp
        .src("./svg/*.svg")
        .pipe(svgstore({
            inlineSvg: true,
            fileName: "sprite.svg",
            prefix: ""
        }))
        .pipe(gulp.dest("includes/"));
});
