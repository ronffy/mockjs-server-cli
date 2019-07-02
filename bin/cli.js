#!/usr/bin/env node
const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const mockApiToApp = require('../helpers/mockApiToApp');
const getArgv = require('../helpers/getArgv');
require('../helpers/outCommander');

const METHODS = ['PUT', 'GET', 'POST', 'DELETE', 'OPTIONS'];
const app = express();
const { port, config, delay} = getArgv();

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

mockApiToApp(app, config, delay);

app.use('/*', function (req, res) {
  res.json({
    code: 404,
    message: 'NOT FIND'
  })
})

app.listen(port);

console.log('\nrun on ' + chalk.blue('http://localhost:' + port) + '\n');
