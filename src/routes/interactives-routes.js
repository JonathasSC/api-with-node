const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller')

router.post('/', controller.post);
router.get('/:id', controller.get);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router