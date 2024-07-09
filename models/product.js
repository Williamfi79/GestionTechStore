module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: DataTypes.TEXT,
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      categoryId: DataTypes.INTEGER
    }, {});
    Product.associate = function(models) {
      Product.belongsTo(models.Category, { foreignKey: 'categoryId' });
    };
    return Product;
  };
  