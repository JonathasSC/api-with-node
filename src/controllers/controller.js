exports.getAll = (req, res, next) => {
    res.status(200).send({
        title: 'Node API',
        version: '0.0.1',
    });
};

// =======================================

exports.get = (req, res, next) => {
    const id = req.params.id;
    res.status(201).send({
        id: id,
        item: req.body,  
    });
};

exports.post = (req, res, next) => {
    res.status(201).send(req.body);
};

exports.put = (req, res, next) => {
    const id = req.params.id;
    res.status(201).send({
        id: id,
        item: req.body,  
    });
};

exports.delete = (req, res, next) => {
    const id = req.params.id;
    res.status(201).send({
        id: id,
        item: req.body    
    });
};
