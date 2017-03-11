'use strict';
var sha1 = require('sha1');
var Wechat = require('./wechat');
var getRawBody = require('raw-body');
var util = require('./util');
module.exports = function(opts) {
  var wechat = new Wechat();
  console.log('opts', opts);
  return function*(next) {
    var that = this;
    console.log(this.query);
    var token = opts.token;
    var signature = this.query.signature;
    var nonce = this.query.nonce;
    var timestamp = this.query.timestamp;
    var echostr = this.query.echostr;
    // 先排序,在加密
    var str = [token, timestamp, nonce].sort().join('');
    var sha = sha1(str);
    if (this.method === 'GET') {
      if (sha === signature) {
        this.body = echostr + '';
      } else {
        this.body = 'wrong';
      }
    } else if (this.method === 'POST') {
      if (sha !== signature) {
        this.body = 'wrong';
        return false;
      } else {
        var data = yield getRawBody(this.req, {
          length: this.length,
          limit: '1mb',
          encoding: this.charset
        });
        var content = yield util.parseXMLAsync(data);
        console.log('content', content);
        var message = util.formatMessage(content.xml);
        console.log(message);
        this.weixin = message;
        yield handler.call(this, next);
        wechat.reply.call(this);
      }
    }
  };
}
