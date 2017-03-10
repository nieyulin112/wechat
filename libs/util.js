var fs = require('fs');
var Promise = require('bluebird');
// 读文件
exports.readFileAsync = function (fpath, encoding) {
    return new Promise(function(resolve, reject) {
        fs.readFile(fpath, encoding, function(err, conent) {
            if (err) {
                reject(err);
            } else {
                resolve(conent);
            }
        })
    });
};
// 写文件
exports.writeFileAsync = function (fpath, content) {
    return new Promise(function(resolve, reject) {
        fs.writeFile(fpath, content, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    });
};
