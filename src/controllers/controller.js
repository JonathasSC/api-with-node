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
        const data = await repository.get();
        res.status(200).send(data)
    } catch (e) {
        res.status(400).send({
            message: '400 Bad Request - get elements'
        });
    }
};

exports.getById = async(req, res, next) => {
    try {
        const data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: '400 Bad Request - get element by id'
        });
    };
};

// ============== POST ===================

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.surname, 1, "It is necessary to fill in the `surname` field.")
    contract.hasMinLen(req.body.email, 1, "It is necessary to fill in the `email` field.")
    contract.hasMinLen(req.body.name, 1, "It is necessary to fill in the `name` field.")

    contract.isEmail(req.body.email, "Fill in the field `email` with a valid email.")

    if (!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create(req.body)
        res.status(201).send({
            message:'201 Created - user created'
        });
    } catch (e) {
        res.status(400).send({
            message:'400 Bad Request - create user failed', data: e
        });
    }
};

// ============== PUT ====================

exports.put = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.surname, 1, "It is necessary to fill in the `surname` field.")
    contract.hasMinLen(req.body.email, 1, "It is necessary to fill in the `email` field.")
    contract.hasMinLen(req.body.name, 1, "It is necessary to fill in the `name` field.")
    
    contract.isEmail(req.body.email, "Fill in the field `email` with a valid email.")

    if (!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message:'200 Ok - user updated'
        });
    } catch (e) {
        res.status(400).send({
            message:'400 Bad Request - user update failed',
            data: e
        });
    };
};

// ============== DELETE =================

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.params.id)
        res.status(200).send({
            message:'200 Ok - user deleted'
        });
    } catch (e) {
        res.status(400).send({
            message:'400 Bad Request - delete user failed',
            data: e
        });
    };
};
