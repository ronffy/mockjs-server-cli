#!/usr/bin/env node
const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const mockApiToApp = require('../helpers/mockApiToApp');
const formatArgv = require('../helpers/formatArgv');
require('../helpers/outCommander');

const cwd = process.cwd();
const METHODS = ['PUT', 'GET', 'POST', 'DELETE', 'OPTIONS'];
const app = express();
const { port, config, delay } = formatArgv();

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

let mockData;
try {
  mockData = require(cwd + '/' + config);
  mockApiToApp(app, mockData, delay);
} catch (error) {
  console.log(chalk.red('\nRequire config file error.\n'), error);
}

app.use('/*', function (req, res) {
  res.json({
    code: 404,
    message: 'NOT FIND'
  })
})

app.listen(port);

console.log('\n Listen on ' + chalk.blue('http://localhost:' + port) + '\n');
