module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define('Customer', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      phone: DataTypes.STRING,
      address: DataTypes.TEXT
    }, {});
    Customer.associate = function(models) {
      // associations can be defined here
    };
    return Customer;
  };
  