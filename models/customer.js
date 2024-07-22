module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
      name: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
      },
      phone: DataTypes.STRING,
      address: DataTypes.TEXT,
      createdAt: {
          type: DataTypes.DATE,
          defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
          type: DataTypes.DATE,
          defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
  }, {});

  Customer.associate = function(models) {
       Customer.hasMany(models.Order, { foreignKey: 'customerId' });
  };

  return Customer;
};

  