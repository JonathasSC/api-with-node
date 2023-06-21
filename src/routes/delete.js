const express = require('express')
const router = express.Router();

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    
    res.status(201).send({
        id: id,
        item: req.body    
    });
});

module.exports = router
