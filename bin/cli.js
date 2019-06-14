#!/usr/bin/env node
const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const addMockApiToApp = require('../helpers/addMockApiToApp');
require('../helpers/outCommander');

const METHODS = ['PUT', 'GET', 'POST', 'DELETE', 'OPTIONS'];
const app = express();
let port = '8888';
let config = 'mock.config.js';

process.argv.forEach(val => {
  switch (true) {
    // 配置 port
    case val.indexOf('-p') === 0:
    case val.indexOf('--port') === 0:
      port = val.split('=')[1];
      port = port.trim();
      break;
    // 配置 mock 的配置文件
    case val.indexOf('-c') === 0:
    case val.indexOf('--config') === 0:
      config = val.split('=')[1];
      config = config.trim();
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

addMockApiToApp(app, config);

app.use('/*', function (req, res) {
  res.json({
    code: 404,
    message: 'not find'
  })
})

app.listen(port);

console.log('\nrun on ' + chalk.blue('http://localhost:' + port) + '\n');
