'use strict';

/**
 * Module exports.
 * @public
 */

/**
 *
 * @param {[]} data - Set of data to rank
 * @param {String} key - field The field to rank on
 * @param {Boolean} testData - If true, will return a test data with the rank
 * @returns []
 * @example ranker([{name: 'test-1', rating: 100}, {name: 'test-2', rating: 50}], 'rating', true)
 * Using the example above, the result will be:
 * [{name: 'test-2', rating: 50, rank: 1}, {name: 'test-1', rating: 100, rank: 2}]
 */
const ranker = function ranker(
  params = { useTestData: false, data: [], key: '' },
) {
  let { useTestData, data, key } = params;

  if (useTestData) {
    data = genTestData();
    key = 'rating';
  }

  if (!data?.length && !useTestData) {
    throw new Error('Data must have at least one item');
  }

  if (!key && !useTestData) {
    throw new Error('Key must be provided');
  }

  if (!Array.isArray(data)) {
    throw new Error('Data must be an array');
  }

  if (typeof key !== 'string') {
    throw new Error('Key must be a string');
  }

  data = flatten(data);
  const sorted = [];
  for (var i = 0; i < data.length; i++) {
    sorted.push(data[i]);
  }
  sorted.sort(function (a, b) {
    return b[key] - a[key];
  });
  for (var i = 0; i < sorted.length; i++) {
    sorted[i].rank = i + 1;
  }
  sortRanking(sorted, key);
  return sorted;
};

/**
 *
 * @param {[]} arr - Set of data to flatten
 * @returns []
 */
const flatten = function flatten(arr) {
  var result = [];
  var i = 0;
  while (i < arr.length) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]));
    } else {
      result.push(arr[i]);
    }
    i++;
  }
  return result;
};

/**
 *
 * @param {[]} sorted
 * @param {String} key
 */
const sortRanking = function sortRanking(sorted, key) {
  for (var k = 0; k < sorted.length; k++) {
    for (var h = 1; h < sorted.length + 1; h++) {
      if (sorted[k + h] !== undefined) {
        if (sorted[k + h].tie !== true) {
          if (sorted[k][key] === sorted[h + k][key]) {
            sorted[k].rank = k + 1;
            sorted[h + k].rank = k + 1;
            sorted[k].tie = true;
            sorted[h + k].tie = true;
          }
        }
      }
    }
  }
};

// generate test data
const genTestData = function testData(length = 11) {
  const expData = [];
  for (let index = 1; index < length; index++) {
    expData.push({
      name: 'test-' + index,
      rating: Math.floor(Math.random() * 100 + 1),
    });
  }
  return expData;
};

module.exports = ranker;
