module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-mocks/angular-mocks.js',

      'src/app/services/services.module.js',
      'src/app/services/beers/beers.service.js',
      'src/app/modules/search-beer/search-beer.module.js',
      'src/app/modules/search-beer/search-beer.route.js',
      'src/app/modules/search-beer/search-beer.controller.js',
      'src/app/directives/directives.module.js',
      'src/app/directives/force-select/force-select.js',
      'src/app/filters/filters.module.js',
      'src/app/filters/tags/tags.filter.js',
      'src/app/filters/alcohol-range/alcohol-range.filter.js',
      'src/app/modules/modules.module.js',
      'src/app/main/main.module.js',
      'src/app/main/main.route.js',
      'src/app/main/main.controller.js',
      'src/app/core/core.module.js',
      'src/app/core/core.config.js',
      'src/app/app.module.js',

      'src/app/filters/tags/tags.filter.spec.js',
      'src/app/filters/alcohol-range/alcohol-range.filter.spec.js',
      'src/app/services/beers/beers.service.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },

    reporters: ['spec'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
