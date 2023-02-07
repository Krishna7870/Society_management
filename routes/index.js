const express = require('express');
const router = express.Router();
const passport = require('passport');
const homeController = require('../controllers/home_controller');
const notificationController = require('../controllers/notice_controller');
router.get('/',homeController.home);
router.use('/users', require('./users'));
router.use('/service-provider', require('./service-provider'));
router.get('/notification', passport.checkAuthentication, notificationController.notice); 



module.exports = router;