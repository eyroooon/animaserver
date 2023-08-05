module.exports = (sequelize, DataTypes) => {
  const ContractFunctionCategoryVariables = sequelize.define('contractFunctionCategoryVariables', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    categoryId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      unique: false
    },
    contractFunctionId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      unique: false
    },
    variableId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      unique: false
    },
    mappedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    logIndex: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  ContractFunctionCategoryVariables.associate = (models) => {
    // ContractFunctionCategoryVariables.belongsTo(models.categories, {
    //   as: 'categories',
    //   foreignKey: 'categoryId',
    //   constraints: false
    // });

    // ContractFunctionCategoryVariables.belongsTo(models.variables, {
    //   as: 'variables',
    //   foreignKey: 'variableId',
    //   constraints: false
    // });

    // ContractFunctionCategoryVariables.belongsTo(models.contractFunctions, {
    //   as: 'contractFunctions',
    //   foreignKey: 'contractFunctionId',
    //   constraints: false
    // });
  };

  return ContractFunctionCategoryVariables;
};
