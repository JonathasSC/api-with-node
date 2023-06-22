const mongoose = require('mongoose');
const User = mongoose.model('user');

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
    var user = new User();

    user.id      = req.body.id;
    user.name    = req.body.name;
    user.surname = req.body.surname;
    user.email   = req.body.email;

    user
        .save()
        .then(x => {
            res.status(201).send({message:'Usuário registrado.'});
        })
        .catch(e => {
            res.status(400).send({message:'Falha ao registrar usuário', data: e});
        });

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
