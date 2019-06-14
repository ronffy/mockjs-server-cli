const express = require('express');
const bodyParser = require('body-parser');
const METHODS = ['PUT', 'GET', 'POST', 'DELETE', 'OPTIONS'];
const app = express();
let port = '8888';
let mockFile = 'mock.config.js';

process.argv.forEach(val => {
  switch (true) {
    // 配置 port
    case val.indexOf('--port') === 0:
      port = val.split('=')[1];
      port = port.trim();
      break;
    // 配置 mock 的配置文件
    case val.indexOf('--mock') === 0:
      mockFile = val.split('=')[1];
      mockFile = mockFile.trim();
      break;
    default:
      break;
  }
});

// 处理正确解析body
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

// 处理跨域
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', METHODS.join(','));
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

// 根据 mock 配置，设置匹配请求 api
const cwd = process.cwd();
const mockData = require(cwd + '/' + mockFile);

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



app.listen(port);

console.log('run on localhost:' + port);
