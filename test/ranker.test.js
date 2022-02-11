var expect = require('chai').expect;
var ranker = require('../index');
describe('Module Status', function () {
  describe('Testing entire ranking module', function () {
    it('Testing with example data', function (done) {
      var data = ranker({ useTestData: true });
      expect(data).to.an('array').that.is.not.empty;
      done();
    });
    it('Testing with data and key', function (done) {
      var testData = [
        { name: 'test-1', rating: 100 },
        { name: 'test-2', rating: 50 },
        { name: 'test-3', rating: 50 },
      ];
      var data = ranker({ data: testData, key: 'rating' });
      expect(data)
        .to.an('array')
        .that.is.not.empty.haveOwnPropertyDescriptor('length', 2)
        .haveOwnPropertyDescriptor('0', {
          name: 'test-2',
          rating: 50,
          rank: 1,
        });
      done();
    });
  });
});
