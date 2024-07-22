const express = require('express');
const router = express.Router();
const db = require('../models');
const OrderProduct = db.OrderProduct;

// Crear OrderProduct
router.post('/', async (req, res) => {
  const { orderId, productId, quantity } = req.body;
  try {
    const orderProduct = await OrderProduct.create({ orderId, productId, quantity });
    res.status(201).json(orderProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los OrderProducts
router.get('/', async (req, res) => {
  try {
    const orderProducts = await OrderProduct.findAll();
    res.json(orderProducts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener detalles de OrderProduct
router.get('/:orderId/:productId', async (req, res) => {
  try {
    const orderProduct = await OrderProduct.findOne({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId
      }
    });
    if (orderProduct) {
      res.json(orderProduct);
    } else {
      res.status(404).send('OrderProduct not found');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar OrderProduct
router.put('/:orderId/:productId', async (req, res) => {
  const { quantity } = req.body;
  try {
    const orderProduct = await OrderProduct.findOne({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId
      }
    });
    if (orderProduct) {
      await orderProduct.update({ quantity });
      res.json(orderProduct);
    } else {
      res.status(404).send('OrderProduct not found');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar OrderProduct
router.delete('/:orderId/:productId', async (req, res) => {
  try {
    const orderProduct = await OrderProduct.findOne({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId
      }
    });
    if (orderProduct) {
      await orderProduct.destroy();
      res.status(204).send();
    } else {
      res.status(404).send('OrderProduct not found');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
