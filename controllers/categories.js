const Categories = require('../models').categories;

const getCategories = async (req, res) => {
  try {
    const LIMIT = 50;

    const categories = await Categories.findAll({
      limit: LIMIT,
    });
    res.json({ data: categories });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


module.exports = {
  getCategories,
};
