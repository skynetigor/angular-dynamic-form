// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-spec-reporter'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    reporters: ['spec', 'kjhtml'],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
      captureConsole: false,
      jasmine: {
        random: false,
        stopOnFailure: false
      }
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/anectodes-frontend'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true,
    },
    specReporter: {               // For more info visit https://www.npmjs.com/package/karma-spec-reporter
      maxLogLines: 5,             // limit number of lines logged per test
      suppressErrorSummary: true, //  print or not error summary
      suppressFailed: false,      // print or not information about failed tests
      suppressPassed: false,       // print or not information about passed tests
      suppressSkipped: true,      // print or not information about skipped tests
      showSpecTiming: false,      // print or not the time elapsed for each spec
      failFast: false              // test would finish with error when a first fail occurs. 
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true,
  });

  return config;
};
