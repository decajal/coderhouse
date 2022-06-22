const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) =>
{
    const min = req.query.min;
    const nivel = req.query.nivel;
    const max = req.query.max;
    const titulo = req.query.titulo;

    res.render('hello', {min, max, nivel, titulo});
})

module.exports = router;