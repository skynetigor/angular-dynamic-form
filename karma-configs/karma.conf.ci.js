// With that file we can override test configuration in CI process
// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

var baseConfig = require('./karma.conf.base');

module.exports = function (config) {
  baseConfig(config);

  config.set({
    ...config,
    frameworks: [...config.frameworks],
    plugins: [
      ...config.plugins,
    ],
    reporters: [...config.reporters, 'kjhtml'],
    browsers: ['ChromeHeadless'],
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage/anectodes-frontend'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true,
    },
    specReporter: {
      // For more info visit https://www.npmjs.com/package/karma-spec-reporter
      maxLogLines: 5, // limit number of lines logged per test
      suppressErrorSummary: true, //  print or not error summary
      suppressFailed: false, // print or not information about failed tests
      suppressPassed: true, // print or not information about passed tests
      suppressSkipped: true, // print or not information about skipped tests
      showSpecTiming: false, // print or not the time elapsed for each spec
      failFast: false, // test would finish with error when a first fail occurs.
    },
    logLevel: config.LOG_ERROR,
    autoWatch: false,
    singleRun: true,
    restartOnFileChange: false,
  });
};
