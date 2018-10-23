'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    titlePost: {
        type: String,
        required: true,
        trim: true
    },
    competicao: {
        type: String,
        required: true
    },
    competicaoPhoto: {
        type: String,
        required: true
    },
    hrPartida: {
        type: String,
        required: true
    },
    placar: {
        type: String,
        required: true
    },
    modoJogo: {
        type: String,
        required: true
    },
    photoTim1: {
        type: String,
        required: true
    },
    photoTim2: {
        type: String,
        required: true
    },
    nameTim1: {
        type: String,
        required: true
    },
    nameTim2: {
        type: String,
        required: true
    },
    linkLive: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    idcategory: {
        type: String,
        required: true
    },
    visit: {
        type: Number,
        required: true
    }
 
});

module.exports = mongoose.model('Product', schema)