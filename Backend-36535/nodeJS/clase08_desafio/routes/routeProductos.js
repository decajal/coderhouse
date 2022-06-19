const express = require('express');
const { Router } = express;
const controllerProductos = require('../controllers/controllerProductos');

const router = Router();

router.get('/', controllerProductos.listar);
router.get('/:id', controllerProductos.buscar);
router.post('/', controllerProductos.agregar);
router.put('/:id', controllerProductos.actualizar);
router.delete('/:id', controllerProductos.eliminar);

module.exports = router;