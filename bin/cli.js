#!/usr/bin/env node

const express = require('express');
const bodyParser = require('body-parser');
const addMockApiToApp = require('../helpers/addMockApiToApp');

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

addMockApiToApp(app);

app.listen(port);

console.log('run on localhost:' + port);
