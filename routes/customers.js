const express = require('express');
const router = express.Router();
const { Customer } = require('../models');

// Crear cliente
router.post('/', async (req, res) => {
  const { name, email, phone, address } = req.body;
  try {
    const customer = await Customer.create({ name, email, phone, address });
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener detalles de cliente
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (customer) {
      res.json(customer);
    } else {
      res.status(404).send('Customer not found');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar cliente
router.put('/:id', async (req, res) => {
  const { name, email, phone, address } = req.body;
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (customer) {
      await customer.update({ name, email, phone, address });
      res.json(customer);
    } else {
      res.status(404).send('Customer not found');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar cliente
router.delete('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (customer) {
      await customer.destroy();
      res.status(204).send();
    } else {
      res.status(404).send('Customer not found');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
