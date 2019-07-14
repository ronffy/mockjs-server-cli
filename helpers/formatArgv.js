/**
 * 获取命令行参数
 */
const isString = require('lodash/isString');
const chalk = require('chalk');

const defaultOption = {
  config: './mock.config.js',
  port: '8888',
  delay: []
}

const getArgvVal = (argv, argvKey) => {
  try {
    const value = argv.split('=')[1];
    if (!value) {
      console.log(chalk.yellow(`WARN:deploy parameter ${argvKey} failed, will use the default configuration. \n`));
      return;
    }
    return value;
  } catch (error) {
    console.log(chalk.red(`ERROR:deploy parameter ${argvKey} error: \n`), error);
  }
}

function formatArgv() {
  const result = {
    ...defaultOption
  };

  process.argv.forEach((val, index) => {
    if (index === 0 || index === 1) {
      return;
    }
    switch (true) {
      // 配置 port
      case val.indexOf('-p') === 0:
      case val.indexOf('--port') === 0:
        const port = getArgvVal(val, 'port');
        port ? (result.port = port) : null;
        break;
      // 配置 mock 的配置文件
      case val.indexOf('--config') === 0:
        const config = getArgvVal(val, 'config');
        config ? (result.config = config) : null;
        break;
      // 配置http请求的延迟
      case val.indexOf('--delay') === 0:
        let delay = getArgvVal(val, 'delay');
        if (delay) {
          if (isString(delay) && delay.includes('-')) {
            delay = delay.split('-');
          } else {
            delay = [delay];
          }
        }
        delay ? (result.delay = delay) : null;
        break;
      default:
        break;
    }
  });
  return result;
}

module.exports = formatArgv;

module.exports.defaultOption = defaultOption;
