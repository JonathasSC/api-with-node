const mongoose = require('mongoose');
const User = mongoose.model('users');
const ValidationContract = require('../validators/fluent-validator')

exports.getBase = (req, res, next) => {
    res.status(200).send({
        title: 'Node API',
        version: '0.0.1',
    });
};

// ============== GET ====================

exports.get = (req, res, next) => {
    User.find({}, 'id name surname email')
    .then(data => {
        res
        .status(200)
        .send(data);
    })
    .catch(e => {
        res
        .status(400)
        .send(e);
    });
};

exports.getById = (req, res, next) => {
    User.findById(req.params.id, 'id name surname email')
    .then(data => {
        res
        .status(200)
        .send(data);
    })
    .catch(e => {
        res
        .status(400)
        .send(e);
    });
};

// ============== POST ===================

exports.post = (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 1, "É necessário preencher o campo {name}.")

    contract.hasMinLen(req.body.surname, 1, "É necessário preencher o campo {surname}.")

    contract.hasMinLen(req.body.email, 1, "É necessário preencher o campo {email}.")
    contract.isEmail(req.body.email, "Preencha o campo {email} com um email valido.")

    if (!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    var user = new User();

    user.name    = req.body.name;
    user.surname = req.body.surname;
    user.email   = req.body.email;

    user
        .save()
        .then(x => {
            res
            .status(201)
            .send({
                message:'Usuário registrado.'
            });
        })
        .catch(e => {
            res
            .status(400)
            .send({
                message:'Falha ao registrar usuário', data: e
            });
        });

};

// ============== PUT ====================

exports.put = (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 1, "É necessário preencher o campo {name}.")

    contract.hasMinLen(req.body.surname, 1, "É necessário preencher o campo {surname}.")

    contract.hasMinLen(req.body.email, 1, "É necessário preencher o campo {email}.")
    contract.isEmail(req.body.email, "Preencha o campo {email} com um email valido.")

    if (!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    User.findByIdAndUpdate(req.params.id, {
        $set: {
            name:    req.body.name,
            surname: req.body.surname,
            email:   req.body.email
        }
    })

    .then(x => {
        res
        .status(200)
        .send({
            message:'Usuário atualizado.'
        });
    })
    .catch(e => {
        res
        .status(400)
        .send({
            message:'Falha ao atualizar usuário', data: e
        });
    });
};

// ============== DELETE =================

exports.delete = (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
    .then(x => {
        res
        .status(200)
        .send({
            message:'Usuário deletado.'
        });
    })
    .catch(e => {
        res
        .status(400)
        .send({
            message:'Falha ao deletar usuário', data: e
        });
    });
};
