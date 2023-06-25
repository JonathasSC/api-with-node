const mongoose = require('mongoose');
const User = mongoose.model('users');
const repository = require('../repositories/users-repositories')
const ValidationContract = require('../validators/fluent-validator')

exports.getBase = (req, res, next) => {
    res.status(200).send({
        title: 'Node API',
        version: '0.0.1',
    });
};

// ============== GET ====================

exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data)
    } catch (e) {
        res
        .status(400)
        .send({message: '400 Bad Request - Get elements'});
    }
};

exports.getById = (req, res, next) => {
    repository.getById(req.params.id)
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

    repository.create(req.body)
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

    repository.update(req.params.id, req.body)
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
    repository.delete(req.params.id)
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
