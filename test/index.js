'use strict';

var assert = require('assert');
var mockery = require('mockery');

function foo() {}
var fsMock = {
    readdirSync: function () {
        return ['..', 'index.js', 'ignore.node', 'a.js', 'b.js', 'c.js', 'd.js', 'e.js', 'f.js'];
    }
};

describe('merge-exports', function () {
    var target;
    beforeEach(function () {
        mockery.enable();
        mockery.registerAllowables(['../lib']);
        mockery.registerMock('fs', fsMock);
        mockery.registerMock('./a.js', {
            a: 'a'
        });
        mockery.registerMock('./b.js', {
            b: foo
        });
        mockery.registerMock('./c.js', function () {});
        mockery.registerMock('./d.js', ['d']);
        mockery.registerMock('./e.js', 1e3);
        mockery.registerMock('./f.js', null);
        target = require('../lib');
    });
    it('检查index.js本身及非.js文件是否排除在外', function () {
        assert.equal(target.hasOwnProperty('..'), false, '排除上级目录标识');
        assert.equal(target.hasOwnProperty('index'), false, '排除index本身');
        assert.equal(target.hasOwnProperty('index.js'), false, '排除index.js本身');
        assert.equal(target.hasOwnProperty('ignore'), false, '排除非.js文件');
        assert.equal(target.hasOwnProperty('ignore.node'), false, '排除非.js文件');
    });
    it('检查输出模块的正常合并', function () {
        assert.ok(target.hasOwnProperty('a'), '合并的模块输出包含键a');
        assert.equal(target.a, 'a', '合并的模块输出键a的值为字符串a');
        assert.ok(target.hasOwnProperty('b'), '合并的模块输出包含键b');
        assert.equal(target.b.name, 'foo', '合并的模块输出键b的值为函数foo');
    });
    it('检查类型为function的exports是否排除在外', function () {
        assert.equal(target.hasOwnProperty('c'), false, '排除类型为function的exports');
        assert.equal(target.hasOwnProperty('c.js'), false, '排除类型为function的exports');
        assert.equal(target.hasOwnProperty('./c.js'), false, '排除类型为function的exports');
    });
    it('检查类型为数组的exports是否排除在外', function () {
        assert.equal(target.hasOwnProperty('d'), false, '检查类型为数组的exports是否排除在外');
        assert.equal(target.hasOwnProperty('d.js'), false, '检查类型为数组的exports是否排除在外');
        assert.equal(target.hasOwnProperty('./d.js'), false, '检查类型为数组的exports是否排除在外');
    });
    it('检查类型为数值的exports是否排除在外', function () {
        assert.equal(target.hasOwnProperty('e'), false, '检查类型为数值的exports是否排除在外');
        assert.equal(target.hasOwnProperty('e.js'), false, '检查类型为数值的exports是否排除在外');
        assert.equal(target.hasOwnProperty('./e.js'), false, '检查类型为数值的exports是否排除在外');
    });
    it('检查类型为NULL的exports是否排除在外', function () {
        assert.equal(target.hasOwnProperty('f'), false, '检查类型为NULL的exports是否排除在外');
        assert.equal(target.hasOwnProperty('f.js'), false, '检查类型为NULL的exports是否排除在外');
        assert.equal(target.hasOwnProperty('./f.js'), false, '检查类型为NULL的exports是否排除在外');
    });
    afterEach(function () {
        mockery.deregisterMock('fs');
        mockery.deregisterMock('./a.js');
        mockery.deregisterMock('./b.js');
        mockery.deregisterMock('./c.js');
        mockery.deregisterMock('./d.js');
        mockery.deregisterMock('./e.js');
        mockery.deregisterMock('./f.js');
        mockery.deregisterAllowables([
            '../lib',
            './a.js',
            './b.js',
            './c.js',
            './d.js',
            './e.js',
            './f.js'
        ]);
        mockery.disable();
    });
});
