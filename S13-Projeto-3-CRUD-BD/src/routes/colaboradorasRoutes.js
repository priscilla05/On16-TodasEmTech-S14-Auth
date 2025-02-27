const controller = require('../controller/colaboradorasController.js');
const express = require('express');
const router = express.Router();



router.post('/colaboradoras/', controller.create)
router.get('/colaboradoras/', controller.getAll)
router.delete('/colaboradoras/:id', controller.deleteById)
router.post('/colaboradoras/login', controller.login)

module.exports = router