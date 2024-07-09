const express = require('express');
const router = express.Router();
const { Order } = require('../models');

// Crear orden
router.post('/', async (req, res) => {
  const { customerId, total, status } = req.body;
  try {
    const order = await Order.create({ customerId, total, status });
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener detalles de orden
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).send('Order not found');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar orden
router.put('/:id', async (req, res) => {
  const { customerId, total, status } = req.body;
  try {
    const order = await Order.findByPk(req.params.id);
    if (order) {
      await order.update({ customerId, total, status });
      res.json(order);
    } else {
      res.status(404).send('Order not found');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar orden
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (order) {
      await order.destroy();
      res.status(204).send();
    } else {
      res.status(404).send('Order not found');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
