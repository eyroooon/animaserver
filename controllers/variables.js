const { objectPairing } = require('../constant/categoryVariablesPairing');

const Variables = require('../models').variables;

const getVariables = async (req, res) => {
  const { categoryId } = req.query;
  const variableIds = objectPairing[`myCategory${categoryId}`];
  try {
    const LIMIT = 50;

    const variables = await Variables.findAll({
      where: { id: variableIds },
      limit: LIMIT,
    });
    res.json({ data: variables });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getVariables,
};
