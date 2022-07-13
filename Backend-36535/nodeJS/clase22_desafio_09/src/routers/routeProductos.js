const express = require('express');
const { Router } = express;

const router = Router();
const products = require('../controllerProductos');

router.get('/', products.generateProducts);

module.exports = router;