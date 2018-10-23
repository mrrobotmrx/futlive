'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-reprository');
const azure = require('azure-storage');
const guid = require('guid');
var config = require('../config');
const emailService = require('../services/email-service');

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get(req.query.lastid);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getapv = async (req, res, next) => {
    try {
        var data = await repository.getapv(req.query.lastid);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getAlta = async (req, res, next) => {
    try {
        var data = await repository.getAlta();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.plus = async (req, res, next) => {
    try {
        var lastid = req.query.lastid;
        var data = await repository.plus(lastid);
        res.status(200).send(data);
    } catch (e) {
        console.log(e)
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.plusapv = async (req, res, next) => {
    try {
        var lastid = req.query.lastid;
        var data = await repository.plusapv(lastid);
        res.status(200).send(data);
    } catch (e) {
        console.log(e)
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getSearch = async (req, res, next) => {
    try {
        var q = req.query.q;
        console.log(q);
        var data = await repository.search(q);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getSearchplus = async (req, res, next) => {
    try {
        var q = req.query.q;
        var lastid = req.query.lastid;
        console.log(q);
        var data = await repository.searchplus(lastid, q);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.catplus = async (req, res, next) => {
    try {
        var lastidcateg = req.query.lastid;
        var id = req.query.id;
        console.log(lastidcateg, id)
        var data = await repository.catplus(lastidcateg, id);
        res.status(200).send(data);
    } catch (e) {
        console.log(e)
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getById = async (req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getByCateg = async (req, res, next) => {
    try {
        var data = await repository.getByCateg(req.query.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.post = async (req, res, next) => {
    try {

        await repository.create({
            titlePost: req.body.titlePost,
            competicao: req.body.competicao,
            competicaoPhoto: req.body.competicaoPhoto,
            hrPartida: req.body.hrPartida,
            placar: req.body.placar,
            modoJogo: req.body.modoJogo,
            photoTim1: req.body.photoTim1,
            photoTim2: req.body.photoTim2,
            nameTim1: req.body.nameTim1,
            nameTim2: req.body.nameTim2,
            linkLive: req.body.linkLive,
            active: req.body.status,
            idcategory: req.body.idcategory,
            visit: 0
        });
        emailService.send(
            'candidoismail@gmail.com',
            'Um Grupo Espera Por Aprovação.',
            global.EMAIL_TMPL.replace('{0}', req.body.title));

        res.status(201).send({
            message: 'Produto cadastrado com sucesso!'
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'error aqui mano'
        });
    }
};

exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Produto atualizado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.putapv = async (req, res, next) => {
    try {
        await repository.updateapv(req.params.id, req.body);
        res.status(200).send({
            message: 'Produto atualizado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.delete = async (req, res, next) => {
    try {
        var id = req.params.id;
        console.log(id)
        await repository.delete(id)
        res.status(200).send({
            message: 'Produto removido com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};