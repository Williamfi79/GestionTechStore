const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const app = express();
const port = 3000;

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

// Asociaciones
Product.associate(db);
Customer.associate(db);
Order.associate(db);
OrderProduct.associate(db);
Category.associate(db);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const productRoutes = require('./routes/products');
const customerRoutes = require('./routes/customers');
const orderRoutes = require('./routes/orders');
const categoryRoutes = require('./routes/categories');

app.use('/products', productRoutes);
app.use('/customers', customerRoutes);
app.use('/orders', orderRoutes);
app.use('/categories', categoryRoutes);

// Ruta para la raíz de la aplicación
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para la página de gestiones
app.get('/gestiones.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'gestiones.html'));
});

// Rutas para las páginas de gestión específicas
app.get('/gestion_productos.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'gestion_productos.html'));
});

app.get('/gestion_clientes.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'gestion_clientes.html'));
});

app.get('/gestion_ordenes.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'gestion_ordenes.html'));
});

app.get('/gestion_categorias.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'gestion_categorias.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  sequelize.sync().then(() => {
    console.log('Database synchronized');
  }).catch(err => {
    console.error('Unable to synchronize the database:', err);
  });
});


