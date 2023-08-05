module.exports = (sequelize, DataTypes) => {
  const ContractFunctions = sequelize.define('contractFunctions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    contractName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contractAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contractLink: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    functionName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mappingStatus: {
      allowNull: true,
      type: DataTypes.ENUM('UNMAPPED', 'MAPPED', 'IN_REVIEW'),
      defaultValue: 'UNMAPPED',
    },
  });

  ContractFunctions.associate = (models) => {
    ContractFunctions.hasMany(models.contractFunctionCategories, {
      as: 'categories',
    });
  };

  return ContractFunctions;
};
