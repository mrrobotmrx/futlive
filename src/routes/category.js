'use strict'

const express = require('express');
const router = express.Router();
const category = require('../controllers/category-controller')


router.post('/', category.post);
router.get('/', category.get);
router.delete('/:id', category.delete);


module.exports = router;