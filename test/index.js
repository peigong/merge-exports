import assert from 'assert';
import mergeExports from '../lib';

describe('merge-exports', () => {
  it('should have unit test!', () => {
    const isObject = (typeof mergeExports === 'object');
    assert(isObject, 'we expected this package author to add actual unit tests.');
  });
});
