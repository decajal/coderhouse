const express = require('express');
const { Router } = express;
const controladorPersonas = require('../controllers/controllerPersonas')

const router = Router();


router.get('/', controladorPersonas.listar);
router.post('/', controladorPersonas.agregar);

module.exports = router;