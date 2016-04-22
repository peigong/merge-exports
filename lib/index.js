'use strict';

var fs = require('fs');

function isObject(o){
    return Object.prototype.toString.call(o) === '[object Object]';
}

var items = fs.readdirSync(__dirname).filter(function (item) { // 只处理.js后缀的文件
    return (item.indexOf('index') !== 0) && (item.indexOf('.js') > 0);
}).map(function (item) {
    return require(['.', item].join('/'));
}).filter(function (item) { // 只处理键值对的对象
    return isObject(item);
});

/*----> 用于兼容没有部署Object.assign方法的环境 START <----*/
function extend(){
    var args = [].slice.call(arguments);
    var key;
    var src = args.shift();
    var dest;
    while (src) {
        if(isObject(dest)){
            for(key in src){
                dest[key] = src[key];
            }
        }else{
            dest = src;
        }
        src = args.shift();
    }
    return dest;
}
/*----> 用于兼容没有部署Object.assign方法的环境 END <----*/

var assign = Object.assign || extend;
var exports = assign.apply(null, items);

module.exports = exports;
