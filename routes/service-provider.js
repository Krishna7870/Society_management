const express = require('express');
const router = express.Router();
const passport = require('passport');
const serviceProvider_controller = require('../controllers/service_provider');


router.get('/carpenters' ,passport.checkAuthentication ,serviceProvider_controller.carpenters);
router.get('/barbers' ,passport.checkAuthentication ,serviceProvider_controller.barbers);
module.exports = router;