const gulp = require('gulp');
// const watch = require('gulp-watch');
const ts = require('gulp-typescript');
const fs = require('fs');
const replace = require('gulp-replace');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const through = require('through2');
const gzip = require('gulp-gzip');

const tsProject = ts.createProject('tsconfig.json');
const tsProjectTests = ts.createProject('test/tsconfig.json');

const iife = () => replace('*/\n(', '*/\n;(');

const minifyOptions = {
  warnings: true,
  compress: {
    collapse_vars: true,
    unsafe: true,
    negate_iife: false,
    warnings: true,
  },
  output: {
    ascii_only: true,
    comments: /@license/gm,
    max_line_len: 32000,
  },
};

const babelPlugins = [
  'check-es2015-constants',
  'transform-es2015-arrow-functions',
  'transform-es2015-block-scoped-functions',
  'transform-es2015-block-scoping',
  'transform-es2015-classes',
  'transform-es2015-computed-properties',
  'transform-es2015-destructuring',
  'transform-es2015-duplicate-keys',
  'transform-es2015-for-of',
  'transform-es2015-function-name',
  'transform-es2015-literals',
  // modules are build in script
  'transform-es2015-object-super',
  'transform-es2015-parameters',
  'transform-es2015-shorthand-properties',
  'transform-es2015-spread',
  'transform-es2015-sticky-regex',
  'transform-es2015-template-literals',
  // typeof-symbol add unneessary _typeof() func
  // works slow and contain some space
  // 'transform-es2015-typeof-symbol',
  'transform-es2015-unicode-regex',
  'transform-regenerator',
];

function sizeCompare(fileName) {
  return through.obj((chunk, enc, cb) => {
    fs.appendFileSync(
      fileName,
      `.concat(${JSON.stringify({
        time: new Date().toLocaleString('ua-UK', { timeZone: 'Europe/Kiev' }),
        size: chunk._contents.length,
        timestamp: Date.now(),
        file: chunk.history[1],
      })})\n`
    );
    console.log(`${chunk.history[1].split('/').slice(-1)[0]} -> ${chunk._contents.length} bytes`);
    return cb(null, chunk);
  });
}

gulp.task('ts', () =>
  gulp
    .src('src/**/*.ts')
    .pipe(tsProject())
    .pipe(gulp.dest('dist'))
);

gulp.task('header-fix', ['ts'], () => {
  const header = fs.readFileSync('./src/header.txt', 'utf8');

  return gulp
    .src('dist/mixiner.js')
    .pipe(replace(/^/, `${header}\n`))
    .pipe(gulp.dest('dist'));
});

// gulp.task('minify-es6', ['header-fix'], () => {
//   const header = fs.readFileSync('./src/header.txt', 'utf8');

//   return gulp
//     .src(['es5/mixiner.js'])
//     .pipe(sourcemaps.init())
//     .pipe(babel({ presets: ['minify'] }))
//     .pipe(replace(/^/, `${header}\n;`))
//     .pipe(rename({ suffix: '.min' }))
//     .pipe(sizeCompare('test/size/min.js'))
//     .pipe(sourcemaps.write('./'))
//     .pipe(gulp.dest(file => file.base));
// });

gulp.task('minify', ['header-fix'], () =>
  gulp
    .src(['dist/mixiner.js'])
    .pipe(
      babel({
        plugins: babelPlugins,
      })
    )
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify(minifyOptions))
    .pipe(rename({ suffix: '.min' }))
    .pipe(iife())
    .pipe(sizeCompare('test/size/min.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'))
);

gulp.task('build', ['minify']);

gulp.task('watch', ['build'], () => {
  gulp.watch(['src/**/*.ts'], ['build']);
});

gulp.task('default', ['watch']);

gulp.task('dev-size', ['build'], () =>
  gulp
    .src(['dist/*.js', 'es5/*.js'])
    .pipe(gzip({ append: true }))
    .pipe(sizeCompare('test/size/gz.js'))
    .pipe(gulp.dest('test/tmp/zip'))
);

// ------------- TESTS -----------------

gulp.task('ts-test', () =>
  gulp
    .src('test/src/**/*.ts')
    .pipe(tsProjectTests())
    .pipe(gulp.dest('test/es6'))
);

gulp.task('build-test', ['ts-test'], () =>
  gulp
    .src('test/es6/**/*.js')
    .pipe(iife())
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        plugins: [...babelPlugins, 'transform-object-assign'],
      })
    )
    // .pipe(buble()) // used for classes
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('test/es5'))
);
