module.exports = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define('OrderProduct', {
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Orders', // Nombre de la tabla referenciada
        key: 'id',
      },
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products', // Nombre de la tabla referenciada
        key: 'id',
      },
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  }, {});

  OrderProduct.associate = function(models) {
    OrderProduct.belongsTo(models.Order, { foreignKey: 'orderId' });
    OrderProduct.belongsTo(models.Product, { foreignKey: 'productId' });
  };

  return OrderProduct;
};
