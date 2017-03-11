'use strict';
var xml2js = require('xml2js');
var Promise = require('bluebird');
var tpl = require('./tpl')
exports.parseXMLAsync = function(xml) {
    return new Promise(function(resolve, reject) {
        xml2js.parseString(xml, {trim: true}, function(err, content) {
            if (err) {
                reject(err)
            } else {
                resolve(content);
            }
        })
    });
};
function formatMessage(result) {
    var message = {};
    if (typeof result === 'object') {
        var keys = Object.keys(result);
        for(var i = 0; i<keys.length; i++) {
            var items = result[keys[i]];
            var key = keys[i];
            if (!(items instanceof Array) || items.length === 0) {
                continue;
            }
            if (items.length === 1) {
                var val = items[0];
                if (typeof val === 'object') {
                    message[key] = formatMessage(val);
                } else {
                    message[key] = (val || '').trim();
                }
            }
            else {
                message[key] = [];
                for(var j = 0, k = items.length; j < k; j ++) {
                    message[key].push(formatMessage[items[j]]);
                }
            }
        }
    }
    return message;
};
exports.tpl = function(content, message) {
    var info = {};
    var type = 'text';
    var fromUserName = message.fromUserName;
    var toUserName = message.ToUserName;
    if(Array.isArray(content)) {
        type = 'news';
    }
    type = content.type || type;
    info.content = content;
    info.createTime = new Date().getTime();
    info.msgType = type;
    info.toUserName = fromUserName;
    info.fromUserName = toUserName;
    return tpl.compiled(info);
};
exports.formatMessage = formatMessage;
