module.exports = (sequelize, DataTypes) => {
  const ContractFunctionCategories = sequelize.define('contractFunctionCategories', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    categoryId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    contractFunctionId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  });

  
ContractFunctionCategories.associate = (models) => {
    ContractFunctionCategories.belongsTo(models.contractFunctions, {
      as: "contractFunctions",
      foreignKey: 'contractFunctionId',
      constraints: false
    });

    ContractFunctionCategories.belongsTo(models.categories, {
      as: "categories",
      foreignKey: 'categoryId',
      constraints: false
    });
}

  return ContractFunctionCategories;
};
