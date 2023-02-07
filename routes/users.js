const express = require('express');
const router = express.Router();
const passport = require('passport');
const user_Controller = require('../controllers/user_controller');



router.get('/sign-in' , user_Controller.sign_in);
router.get('/user-profile/:id',passport.checkAuthentication,user_Controller.user_profile );
router.post('/profile/update/:id', passport.checkAuthentication, user_Controller.profile_update);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
), user_Controller.create_session);

router.get('/sign-out', user_Controller.destroySession);
router.get('/help',passport.checkAuthentication,user_Controller.help );
router.post('/posts/create',passport.checkAuthentication,user_Controller.createPost );
router.get('/posts/destroy/:id',passport.checkAuthentication,user_Controller.destroyPost);
router.post('/comments/create', passport.checkAuthentication, user_Controller.createComment);
router.get('/comments/destroy/:id', passport.checkAuthentication, user_Controller.destroyComment);
router.post('/invite_guest/:id',passport.checkAuthentication, user_Controller.create_invite_guest);

module.exports = router;