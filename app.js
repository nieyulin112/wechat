'use strict';
var koa = require('koa');
var app = new koa();
var config = require('./config');
var weixin = require('./weixin');
// 中间件的使用
var wechat = require('./wechat/g')
app.use(wechat(config.wechat, weixin.reply));
app.listen(1234);
console.log('listen 1234');
