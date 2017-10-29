const gulp = require('gulp');
// const watch = require('gulp-watch');
const ts = require('gulp-typescript');
const fs = require('fs');
const path = require('path');
const replace = require('gulp-replace');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const buble = require('gulp-buble');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const through = require('through2');
const gzip = require('gulp-gzip');
const KarmaServer = require('karma').Server;
const runSequence = require('run-sequence');

const tsProject = ts.createProject('tsconfig.json');
const tsProjectTests = ts.createProject('test/tsconfig.json');

const isWin = /^win/.test(process.platform);

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
  // 'transform-es2015-classes',
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

gulp.task('es-modules', ['ts'], () => {
  const header = fs.readFileSync('./src/header.txt', 'utf8');

  return gulp
    .src('dist/mixiner.js')
    .pipe(replace(/\/\*\s*export\s*\*\/[\s\r\n]*/gm, `export `))
    .pipe(
      replace(/\/\*\s*export\s*default\s*mixiner;\s*\*\/[\s\r\n]*/gm, `export default mixiner;\n`)
    )
    .pipe(replace(/^module.exports[^.].*/gm, `\n`))
    .pipe(replace(/^/, `${header}\n;`))
    .pipe(gulp.dest('es'));
});

gulp.task('dist-cleaning', ['es-modules'], () =>
  gulp
    .src('dist/mixiner.js')
    .pipe(replace(/\/\*\s*export\s*\*\/[\s\r\n]*/gm, ''))
    .pipe(replace(/\/\*\s*export\s*default\s*mixiner;\s*\*\/[\s\r\n]*/gm, ''))
    .pipe(gulp.dest('dist'))
);

gulp.task('umd-fix', ['dist-cleaning'], () => {
  const header = fs.readFileSync('./src/header.txt', 'utf8');
  const umdBegin = fs.readFileSync('./src/umd-begin.txt', 'utf8');
  const umdEnd = fs.readFileSync('./src/umd-end.txt', 'utf8');

  return gulp
    .src('dist/mixiner.js')
    .pipe(replace(/^/, `${header}\n${umdBegin}\n`))
    .pipe(replace(/^module.exports[^.].*/gm, `\n${umdEnd}\n`))
    .pipe(gulp.dest('dist'));
});

gulp.task('minify-es6', ['umd-fix'], () => {
  const header = fs.readFileSync('./src/header.txt', 'utf8');

  return gulp
    .src(['dist/mixiner.js', 'es/mixiner.js'])
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ['minify'] }))
    .pipe(replace(/^/, `${header}\n;`))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sizeCompare('test/size/min.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(
      gulp.dest(function(file) {
        return file.base;
      })
    );
});

gulp.task('copy-dts', ['ts'], () =>
  gulp
    .src('dist/**/*.d.ts')
    .pipe(gulp.dest('es'))
    .pipe(gulp.dest('test/mixiner-es5'))
);

gulp.task('es5', ['copy-dts', 'minify-es6'], () =>
  gulp
    .src('dist/mixiner.js')
    .pipe(iife())
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        // plugins: babelPlugins,
        plugins: [...babelPlugins, 'transform-es2015-classes', 'transform-es2015-typeof-symbol'],
      })
    )
    // .pipe(buble()) // used for classes
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('test/mixiner-es5'))
);

gulp.task('minify-es5', ['es5'], () =>
  gulp
    .src(['test/mixiner-es5/mixiner.js'])
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify(minifyOptions))
    .pipe(rename({ suffix: '.min' }))
    .pipe(iife())
    .pipe(sizeCompare('test/size/min.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('test/mixiner-es5'))
);

gulp.task('build', ['minify-es5']);

gulp.task('watch', ['build'], () => {
  gulp.watch(['src/**/*.ts'], ['build']);
});

gulp.task('default', ['watch']);

gulp.task('dev-size', ['build'], () =>
  gulp
    .src(['dist/*.js', 'es/*.js'])
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

gulp.task('umd-fix-test', ['ts-test'], () => {
  const header = fs.readFileSync('./src/header.txt', 'utf8');
  const umdBegin = fs.readFileSync('./src/umd-begin.txt', 'utf8');
  const umdEnd = fs.readFileSync('./src/umd-end.txt', 'utf8');

  return gulp
    .src('test/es6/**/*.js')
    .pipe(replace(/^/, `${header}\n${umdBegin}\n`))
    .pipe(replace(/^module.exports[^.].*/gm, `\n${umdEnd}\n`))
    .pipe(gulp.dest('test/es6'));
});

gulp.task('build-test', ['ts-test'], () =>
  gulp
    .src('test/es6/**/*.js')
    .pipe(iife())
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        plugins: [
          ...babelPlugins,
          'transform-es2015-classes',
          'transform-es2015-typeof-symbol',
          'transform-object-assign',
        ],
      })
    )
    // .pipe(buble()) // used for classes
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('test/es5'))
);

gulp.task(`test-karma-es5`, ['build-test'], done => {
  try {
    new KarmaServer(
      {
        configFile: path.join(__dirname, './karma.conf.js'),
        files: [
          'https://cdnjs.cloudflare.com/ajax/libs/chai/4.1.2/chai.js',
          'test/mixiner-es5/mixiner.min.js',
          'test/es5/**/*.js',
          'test/test-es5.js',
        ],
        browsers: isWin
          ? [
              'Chrome',
              // 'ChromeCanary',
              'Firefox',
              'Safari',
              // 'Opera',
              // 'Edge',
              'IE',
              'IE10',
              'IE9',
              // 'IE8',
              'PhantomJS',
            ]
          : [
              // 'Chromium', 'Opera',
              'Firefox',
              'PhantomJS',
            ],
        // singleRun: false,
        // client: {
        //   captureConsole: true,
        // },
      },
      done
    ).start();
  } catch (e) {
    console.error(e.message);
  }
});

gulp.task(`test-karma-es6`, ['build-test'], done => {
  try {
    new KarmaServer(
      {
        configFile: path.join(__dirname, './karma.conf.js'),
        files: [
          'https://cdnjs.cloudflare.com/ajax/libs/chai/4.1.2/chai.js',
          'dist/mixiner.js',
          'test/es6/**/*.js',
          'test/test-es6.js',
        ],
        browsers: isWin ? ['Chrome', 'Firefox', 'Opera'] : ['Firefox'],
        // singleRun: false,
        // client: {
        //   captureConsole: true,
        // },
      },
      done
    ).start();
  } catch (e) {
    console.error(e.message);
  }
});

gulp.task('test-karma', callback => {
  runSequence('test-karma-es6', 'test-karma-es5', callback);
});
