module.exports = config => {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'commonjs', 'chai'],
    // autoWatch: true,
    concurrency: 1,
    singleRun: true,
    client: {
      captureConsole: false,
    },
    browsers: [
      // see gulpfile
    ],
    customLaunchers: {
      IE10: {
        base: 'IE',
        'x-ua-compatible': 'IE=EmulateIE10',
      },
      IE9: {
        base: 'IE',
        'x-ua-compatible': 'IE=EmulateIE9',
      },
      // IE8: {
      //   base: 'IE',
      //   'x-ua-compatible': 'IE=EmulateIE8',
      // },
    },
    plugins: [
      'karma-mocha',
      'karma-commonjs',
      'karma-chai',
      'karma-coverage',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-safari-launcher',
      'karma-opera-launcher',
      'karma-ie-launcher',
      'karma-edge-launcher',
      'karma-phantomjs-launcher', // phantomjs dont support ES2015 until version 2.5
    ],
    files: [
      // see gulpfile
    ],
    proxies: {
      '/dist/': '/base/dist/',
      '/es6/': '/base/es6/',
      '/test/': '/base/test/',
    },
    reporters: ['progress', 'coverage'],
    preprocessors: {
      'test/**/*.js': ['commonjs'],
      'dist/**/*.js': ['coverage'],
      'es6/**/*.js': ['coverage'],
    },
    coverageReporter: {
      type: 'lcov',
      // include: ['dist/es5/**/*.js', 'test/tmp/es/**/*.js'],
      dir: 'test/coverage/',
    },
  });
};
