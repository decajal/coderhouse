const express = require('express');
const { Router } = express;
const controladorMascotas = require('../controllers/controllerMascotas')

const router = Router();


router.get('/', controladorMascotas.listar);
router.post('/', controladorMascotas.agregar)

module.exports = router;