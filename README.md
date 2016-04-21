# merge-exports [![Build Status][https://travis-ci.org/peigong/merge-exports.svg?branch=master]][https://travis-ci.org/peigong/merge-exports] [![Dependency Status][https://david-dm.org/peigong/merge-exports.svg?theme=shields.io]][https://david-dm.org/peigong/merge-exports] [![Coverage percentage][https://coveralls.io/repos/peigong/merge-exports/badge.svg]][https://coveralls.io/r/peigong/merge-exports] #

> 合并输出当前目录下NODE文件的`module.exports`

## 应用场景 ##

`index.js`只是用于收集当前目录下各个`.js`文件的`module.exports`，便于统一对外输出。

## 使用方法 ##

将本项目`lib`下的`index.js`，复制到需要收集各`.js`文件`module.exports`的目录。

## 简化的局限 ##

为了简化问题和代码实现，有如下使用局限：

- 只支持`.js`后缀的代码文件。
- 只支持`module.exports`输出键值对对象的情况。
- 只支持当前目录下的一级文件，不支持子目录。

## License

MIT © [周培公](http://www.peigong.net)


[npm-image]: https://badge.fury.io/js/merge-exports.svg
[npm-url]: https://npmjs.org/package/merge-exports
[travis-image]: https://travis-ci.org/peigong/merge-exports.svg?branch=master
[travis-url]: https://travis-ci.org/peigong/merge-exports
[daviddm-image]: https://david-dm.org/peigong/merge-exports.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/peigong/merge-exports
[coveralls-image]: https://coveralls.io/repos/peigong/merge-exports/badge.svg
[coveralls-url]: https://coveralls.io/r/peigong/merge-exports
