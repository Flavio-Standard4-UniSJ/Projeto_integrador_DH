const express = require('express');
const session = require('express-session');
const router = express.Router();
const validador = require('../middlewares/Validador');
const auth = require('../middlewares/auth')
const authO = require('../middlewares/authO')

const landingPageController = require('../controller/landingPageController');

/* GET home page. */
router.get('/', landingPageController.landingPage)
router.get('/', validador.validador_cadastro, landingPageController.create)


module.exports = router;
