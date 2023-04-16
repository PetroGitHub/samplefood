
const { src, dest, watch, parallel, series } = require('gulp');

const fileInclude = require('gulp-file-include');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');
const svgSprite = require('gulp-svg-sprite');

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    }
  });
}

function cleanDist() {
  return del('dist')
}


function images() {
  return src('app/images/**/*')
    .pipe(imagemin(
      [
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            { removeViewBox: true },
            { cleanupIDs: false }
          ]
        })
      ]
    ))
    .pipe(dest('dist/images'))
}

function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js',
    'app/js/main.js'
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())

}

function svgSprites() {
  return src('app/images/icons/*.svg')
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../sprite.svg',
          },
        },
      })
    )
    .pipe(dest('app/images'));
}

const htmlInclude = () => {
  return src(['app/html/*.html']) // Находит любой .html файл в папке "html", куда будем подключать другие .html файлы													
    .pipe(fileInclude({
      prefix: '@',
      basepath: '@file',
    }))
    .pipe(dest('app')) // указываем, в какую папку поместить готовый файл html
    .pipe(browserSync.stream());
}

function styles() {
  return src('app/scss/style.scss')
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 version'],
      grid: true
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

//function build() {
//  return src([
//    'app/css/style.min.css',
//    'app/fonts/**/*',
//    'app/js/main.min.js',
//    'app/*.html'
//  ], { base: 'app' })
//    .pipe(dest('dist'))
//}

function build() {
  return src(
    [
      "app/*.html",
      "app/favicons/**/*.*",
      "app/fonts/**/*.*",
      "app/css/*.css",
      "app/js/*.js",
      "app/images/**/*.*"
    ],
    { base: "app" }
  ).pipe(dest("dist"))
}

function watching() {
  watch(['app/html/**/*.html'], htmlInclude);
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/*.html']).on('change', browserSync.reload);
  watch(['app/images/icons/*.svg'], svgSprites);
}

exports.htmlInclude = htmlInclude;
exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;
exports.svgSprites = svgSprites;

exports.build = series(cleanDist, images, build);
exports.default = parallel(htmlInclude, svgSprites, styles, scripts, build, browsersync, watching);
