// 根据 mock 配置，设置匹配请求 api
const chalk = require('chalk');
const random = require('lodash/random');

module.exports = function mockApiToApp(app, mockData, delay) {
  if (!mockData) {
    return;
  }
  for (const item in mockData) {
    let api = item;
    if (item.split(' ').length > 1) {
      api = item.split(' ')[1];
    }
    app.use(api, function (req, res, next) {
      try {
        const method = req.method;
        const lowMethod = method.toLowerCase();
        const uppMethod = method.toUpperCase();
        const getData = mockData[lowMethod + ' ' + api] || mockData[uppMethod + ' ' + api] || (uppMethod === 'GET' && mockData[api]);
        
        if (delay && delay.length) {
          let timeout;
          if (delay.length === 2) {
            const [min, max] = delay;
            timeout = random(min, max);
          } else {
            timeout = toNumber(delay[0])
          }
          setTimeout(() => {
            sendData(getData, req, res);
          }, timeout || 0);
        } else {
          sendData(getData, req, res);
        }
      } catch (error) {
        console.log(chalk.red('send data error: \n'), error);
        next()
      }
    })
  }
}

function sendData(data, req, res) {
  if (!data) {
    return res.json({})
  }

  if (typeof data === 'function') {
    return data(req, res);
  }

  res.end(JSON.stringify(data));
}
