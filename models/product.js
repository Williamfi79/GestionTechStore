module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
      name: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      description: DataTypes.TEXT,
      price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
      },
      stock: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      categoryId: DataTypes.INTEGER,
      createdAt: {
          type: DataTypes.DATE,
          defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
          type: DataTypes.DATE,
          defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
  }, {});

  Product.associate = function(models) {
      Product.belongsTo(models.Category, { foreignKey: 'categoryId' });
  };

  return Product;
};
