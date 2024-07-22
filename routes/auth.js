const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

// Ruta para obtener información del usuario conectado
router.get('/me', authController.verifyToken, authController.getMe);

module.exports = router;
