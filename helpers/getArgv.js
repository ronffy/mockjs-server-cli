// 获取命令行参数
const isString = require('lodash/isString');

function getArgv() {
  const result = {
    config: './mock.config.js',
    port: '8888',
    delay: []
  };
  process.argv.forEach(val => {
    switch (true) {
      // 配置 port
      case val.indexOf('-p') === 0:
      case val.indexOf('--port') === 0:
        result.port = val.split('=')[1].trim();
        break;
      // 配置 mock 的配置文件
      case val.indexOf('--config') === 0:
        result.config = val.split('=')[1].trim();
        break;
      // 配置http请求的延迟
      case val.indexOf('--delay') === 0:
        let delay = val.split('=')[1];
        if (isString(delay) && delay.includes('-')) {
          delay = delay.split('-');
        } else {
          delay = [delay];
        }
        result.delay = delay;
        break;
      default:
        break;
    }
  });

  return result;
}

module.exports = getArgv;
