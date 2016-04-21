'use strict';

var fs = require('fs');

var items = fs.readdirSync(__dirname).filter(function (item) { // 只处理.js后缀的文件
    return (item.indexOf('index') !== 0) && (item.indexOf('.js') > 0);
}).map(function (item) {
    return require(['.', item].join('/'));
}).filter(function (item) { // 只处理键值对的对象
    return Object.prototype.toString.call(item) === '[object Object]';
});

var exports = Object.assign.apply(null, items);

module.exports = exports;
