const router = require('express').Router();

router.use('/productos', require('./productos'));

module.exports = router;