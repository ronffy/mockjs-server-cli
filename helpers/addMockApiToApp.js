// 根据 mock 配置，设置匹配请求 api
const chalk = require('chalk');

function addMockApiToApp(app, config) {
  const cwd = process.cwd();
  let mockData;
  try {
    mockData = require(cwd + '/' + config);
  } catch (error) {
    console.log(chalk.red('\n mockjs-server error. require config file error: \n'), error);
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
        
        if (!getData) {
          return res.json({})
        }

        const result = getData({
          body: req.body,
          query: req.query,
        });

        // 支持 promise 形式，满足延迟返回结果
        if (typeof result === 'object' && typeof result.then === 'function') {
          result.then(data => {
            res.json(data)
          })
        } else {
          res.json(result);
        }
      } catch (error) {
        console.log(error, req);
        next()
      }
    })
  }
}

module.exports = addMockApiToApp;
