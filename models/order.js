module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {});
    Order.associate = function(models) {
      Order.belongsTo(models.Customer, { foreignKey: 'customerId' });
      Order.belongsToMany(models.Product, { through: 'OrderProducts', foreignKey: 'orderId' });
    };
    return Order;
  };
  
  