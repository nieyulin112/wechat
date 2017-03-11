'use strict'
exports.reply = function* (next) {
    var message = this.weixin;
    if (message.msgType === 'event') {
        if (message.Event === 'subscribe') {
            if (message.EventKey) {
                console.log('扫二维码' + message.EventKey + '' + message.ticket);
            }
            this.body = '哈哈,你订阅了找个号' + '消息ID' + message.MsgId;
        } else if (message.Event === 'unsubscribe') {
            console.log('退出订阅');
        } else if(message.Event === 'LOACTION') {
            this.body = '你上报的位置是' + message.Latitude + '/' + message.Longitude + '-'
            + message.Precision;
        } else if (message.Event === 'CLICK') {
            console.log('关注下扫描' + message.EventKey + message.Ticket);
            this.body = '你点击了菜单' + message.EventKey;
        } else if (message.Event === 'SCAN') {
            this.body = '看你扫描了一下';
        } else if (message.Event === 'VIEW') {
            this.body = '你点击了菜单中的链接' + message.EventKey;
        } else if (message.MsgType === 'text') {
            var content = message.Content;
            var reply = '你说的太复杂了' + message.Content + '太复杂了';
            if (content === '1') {
                reply = '天下第一大米'
            } else if (content === '2') {
                reply = '天下第二豆腐';
            } else if (content === '3') {
                reply = '天下第三吃咸蛋';
            } else if (content === '4') {
                reply = [{
                    title: '技术改变世界',
                    description: '知识是美好的',
                    picUrl: 'https://www.baidu.com',
                    url: 'https://www.baidu.com'
                }, {
                    title: '技术改变世界',
                    description: '知识是美好的',
                    picUrl: 'https://www.baidu.com',
                    url: 'https://www.baidu.com'
                }];
            }
            this.body = reply;
        }
    } else {
    }
    yield next;
};
