// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const { join } = require('path');
const getBaseKarmaConfig = require('../../karma-configs/karma.conf.ci');

module.exports = function (config) {
  const baseConfig = getBaseKarmaConfig(config);

  config.set({
    ...baseConfig,
    coverageIstanbulReporter: {
      ...baseConfig.coverageIstanbulReporter,
      dir: join(__dirname, '../../coverage/libs/showcase'),
    },
  });

  return config;
};
