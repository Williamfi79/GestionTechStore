const express = require('express');
const router = express.Router();
const { Product } = require('../models');

// Crear producto
router.post('/', async (req, res) => {
  const { name, description, price, stock, categoryId } = req.body;
  try {
    const product = await Product.create({ name, description, price, stock, categoryId });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener detalles de producto
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).send('Product not found');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar producto
router.put('/:id', async (req, res) => {
  const { name, description, price, stock, categoryId } = req.body;
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.update({ name, description, price, stock, categoryId });
      res.json(product);
    } else {
      res.status(404).send('Product not found');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar producto
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.destroy();
      res.status(204).send();
    } else {
      res.status(404).send('Product not found');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

