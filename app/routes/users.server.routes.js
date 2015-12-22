var users = require('../../app/controllers/users.server.controller'),
	passport = require('passport');

module.exports = function(app) {
	// Setting up the local authentication
	app.route('/auth/signup').post(users.signup);
	app.route('/auth/signin').post(users.signin);
	app.route('/auth/signout').get(users.signout);
    app.route('/auth/editProfile').put(users.editUserProfile);
    app.route('/auth/getUsers').get(users.getAllUserInfo);
    app.route('/auth/removeUsers/:id').delete(users.removeUserProfile);
    app.route('/auth/getUserInfo/:id').get(users.getUserInfoById);


	// Setting the facebook oauth routes
	app.route('/auth/facebook').get(passport.authenticate('facebook', {
		scope: ['email']
	}));
	app.route('/auth/facebook/callback').get(users.oauthCallback('facebook'));
};