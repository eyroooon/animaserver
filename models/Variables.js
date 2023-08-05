module.exports = (sequelize, DataTypes) => {
  const Variables = sequelize.define('variables', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    variableName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Variables.associate = (models) => {
    
  };

  return Variables;
};
