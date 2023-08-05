const { categoryNames } = require('../constant/hash');
const _ = require('lodash');
const getCategoryId = (topic0) => {
  const indexes = Object.keys(categoryNames).map((key, index) => {
    const filterCategory = categoryNames[key].filter((name) => name === topic0);
    if (filterCategory.length > 0) {
      return index;
    }
  });
  return indexes.filter(Boolean)[0] ? indexes.filter(Boolean)[0] + 1 : null;
};

module.exports = {
  getCategoryId,
};
