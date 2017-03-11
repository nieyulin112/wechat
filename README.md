#微信公众号开发
第一天
1.javascript
2.nodejs
3.nodejs + mongodb
4.微信公众号的接口
5.开发的流程

一.微信的的种类和特点
1.企业号
2.订阅号
3.服务号

域名和服务器的使用
基本的网站:www.tunnel.mobl
开启服务： python -m SimpleHTTPServer 3100
域名、服务器和ngrok的环境配置
python -m SimpleHTTPServer 3100
lt —port 3100
https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index
1.5配置、接入微信公众号
验证公众号的步骤：
1.将token、timestamp、nonce三个参数进行字典序排序
2.将三个参数字符串拼成一个字符串进行sha1加密
3.将加密后的字符串与signature对比,如果相同，表示这个请求来源于微信，我们直接原样返回echostr参数内容，接入验证就成功了
1.6写段代码实现加密认证逻辑
1.appID
2.token
3.appSecret
4.var str = [token, timestamp, nonce].sort().join('');
5.var sha = sha1(str);

2.1简介
1.消息与回复的种类
2.完成简单的回复机器人功能
3.代理调试方法：qq浏览器
4.稳扎稳打，提升自己的技术
2.2利用QQ浏览器代理调试端口
1.替代方案:QQ浏览器
2.3简述7种消息6种回复(普通消息)
1.文本消息
2.图片消息
3.语音消息
4.视频消息
5.小视频消息
6.地理位置消息
7.链接消息
2.4注意事项总结
1.微信公众号接口只支持80端口
2.微信后台配置的URL是唯一能接受到消息，事件的入口，我们在公众号中所有的操作，都是基于这个url进行交互的
3.调用所有的微信接口时都是使用https协议
4.用户向公众号发送信息时，会传过OpenID,这个值是唯一的
5.开发阶段，需要留意全局返回码，需要自己动手解决
6.接口的权限
2.5从封装和抽象开始
1.中间件的封装
2.6access_token
1.access_token它每两个小时自动失效，需要重新获取
2.更新了access_token,之前的token实效
3.每两个小时刷新
4.为了方便调用，需要配置
2.7编写自动回复出来
五个步骤：
1.处理post类型的控制逻辑，接受这个XML的数据包
2.解析这个数据包
3.拼装我们定义好的消息
4.包装成XML的格式
5.在5秒钟内返回回去

3.1简介
1.微信交互流程
2.Promise如何使用
3.koa和express中间件的使用
4.Generator生成器
