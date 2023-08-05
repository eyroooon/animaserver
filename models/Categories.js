module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('categories', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryNotes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Categories.associate = (models) => {
    
  };

  return Categories;
};
