module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: DataTypes.TEXT
    }, {});
    Category.associate = function(models) {
      Category.hasMany(models.Product, { foreignKey: 'categoryId' });
    };
    return Category;
  };
  