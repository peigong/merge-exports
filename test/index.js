'use strict';

var assert = require('assert');
var mockery = require('mockery');

var fsMock = {
    readdirSync: function () {
        return ['a.js', 'b.js', 'c.js'];
    }
};

describe('merge-exports', function () {
    var target;
    beforeEach(function () {
        mockery.enable();
        mockery.registerAllowables(['../lib']);
        mockery.registerMock('fs', fsMock);
        mockery.registerMock('a.js', {
            a: 'a'
        });
        mockery.registerMock('b.js', {
            b: 'b'
        });
        mockery.registerMock('c.js', {
            c: 'c'
        });
        target = require('../lib');
    });
    it('should have unit test!', function () {
        assert(target.hasOwnProperty('a'), 'we expected this package author to add actual unit tests.');
    });
    afterEach(function () {
        mockery.deregisterAllowables(['../lib']);
        mockery.disable();
    });
});
