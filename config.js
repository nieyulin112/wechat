var path = require('path');
var util = require('./libs/util');
var wechat_file = path.join(__dirname, './config/wechat.txt');;
var config = {
    wechat: {
        appID: 'wx8e86895bd9f8cdb3',
        appSecret: '40b863468ae6b5372445ab481064253e',
        token: 'imoocsecret00001111small',
        getAccessToken: function(data) {
            return util.readFileAsync(wechat_file);
        },
        saveAccessToken: function(data) {
            data = JSON.stringify(data);
            return util.writeFileAsync(wechat_file);
        }
    }
};
module.exports = config;
