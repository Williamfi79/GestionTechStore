const express = require('express');
const router = express.Router();
const { Category } = require('../models');

// Crear categoría
router.post('/', async (req, res) => {
  const { name, description } = req.body;
  try {
    const category = await Category.create({ name, description });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todas las categorías
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener detalles de categoría
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (category) {
      res.json(category);
    } else {
      res.status(404).send('Category not found');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar categoría
router.put('/:id', async (req, res) => {
  const { name, description } = req.body;
  try {
    const category = await Category.findByPk(req.params.id);
    if (category) {
      await category.update({ name, description });
      res.json(category);
    } else {
      res.status(404).send('Category not found');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar categoría
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (category) {
      await category.destroy();
      res.status(204).send();
    } else {
      res.status(404).send('Category not found');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
