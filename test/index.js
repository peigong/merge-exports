import assert from 'assert';
import mergeExports from '../lib';

describe('merge-exports', () => {
  it('should have unit test!', () => {
    assert(mergeExports.test, 'we expected this package author to add actual unit tests.');
  });
});
