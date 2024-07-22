const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const port = 3000;
const authController = require('./controllers/authController');

// Configuración de Sequelize
const sequelize = new Sequelize('techstore_db', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

// Importar modelos
const db = require('./models');
const Product = db.Product;
const Customer = db.Customer;
const Order = db.Order;
const OrderProduct = db.OrderProduct;
const Category = db.Category;
const User = db.User; // Importar el modelo User

// Asociaciones (si las hay)
if (Product.associate) Product.associate(db);
if (Customer.associate) Customer.associate(db);
if (Order.associate) Order.associate(db);
if (OrderProduct.associate) OrderProduct.associate(db);
if (Category.associate) Category.associate(db);

// Middleware de registro
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Configuración del middleware body-parser
app.use(bodyParser.json());

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const customerRoutes = require('./routes/customers');
const orderRoutes = require('./routes/orders');
const orderProductRoutes = require('./routes/orderproducts');
const categoryRoutes = require('./routes/categories');

app.use('/api/auth', authRoutes);
app.use('/api/products', authController.verifyToken, productRoutes);
app.use('/api/customers', authController.verifyToken, customerRoutes);
app.use('/api/orders', authController.verifyToken, orderRoutes);
app.use('/api/orderproducts', authController.verifyToken, orderProductRoutes);
app.use('/api/categories', authController.verifyToken, categoryRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    sequelize.sync({ force: true }).then(() => {
      console.log('Database synchronized');
    }).catch(err => {
      console.error('Unable to synchronize the database:', err);
    });
  });
}

module.exports = app; // Exportar la app para las pruebas
