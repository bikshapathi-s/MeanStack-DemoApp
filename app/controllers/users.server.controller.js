'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User'),Role = mongoose.model('Role'),Org = mongoose.model('Org');


/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Username already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Signout
 */
exports.signout = function(req, res) {
	req.logout();
	res.redirect('/');
};

/**
 * Signup
 */
exports.signup = function(req, res) {
	// Init Variables
	var user = new User(req.body);
	var message = null;

	// Add missing user fields
	user.provider = 'local';
    var org = new Org();
    Org.collection.insert(org._doc,function(err,r){
    });
	// Then save the user
    user.organization = org._id;
	user.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			// Remove sensitive data before login
			user.password = undefined;
			user.salt = undefined;

			req.login(user, function(err) {
				if (err) {
					res.send(400, err);
				} else {
					res.jsonp(user);
				}
			});
		}
	});
};
/**
 * To update the existed user profile information.
 * **/
exports.editUserProfile = function(req,res,next){
    var user = new User(req.body);
    User.findOneAndUpdate({_id: user._id}, user, function(err){
        if(err){
            res.status(500).json({
                error: err,
                msg: 'error'
            });
        }else{
            console.log("user profile updated success fully");
            req.user = user;
            res.status(200).json({
                msg: 'success'

            });
        }

    });
    //next();
},
    exports.getAllUserInfo = function(req,res,next){
        User.find(function(err,doc){
            if(err){
                res.status(500).json({
                    error: err,
                    msg: 'error'
                });
            }else{
                var data=[];
                    for(var i=0;i<doc.length;i++){
                      data[i] = new User(doc[i]._doc);
                    }
                res.json(data);
            }

        });
        //next();
    },
    exports.getUserInfoById =function(req,res,next){
        var id = req.params.id;
        User.findOne({_id: id}, function (err, doc){
            if(err){
                res.status(500).json({
                    error: err,
                    msg: 'user information not available....:('
                });
            }else{
                res.json(doc);
            }
        });
    },
    exports.removeUserProfile = function(req,res,next){
        var id = req.params.id;
       // console.log('deleted id::::::::'+id);
        User.remove({_id: id}, function (err, doc) {
            if(err){
                console.log("unable to delete the user profile :::  :(")
            }else{
                User.find(function(err,doc){
                    if(err){
                        res.status(500).json({
                            error: err,
                            msg: 'error'
                        });
                    }else{
                        var data=[];
                        for(var i=0;i<doc.length;i++){
                            data[i] = new User(doc[i]._doc);
                        }
                        res.json(data);
                    }
                });
            }

        });
        //next();
    },
/**
 * Signin after passport authentication
 */
exports.signin = function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err || !user) {
			res.send(400, info);
		} else {
			// Remove sensitive data before login
			user.password = undefined;
			user.salt = undefined;

			req.login(user, function(err) {
				if (err) {
					res.send(400, err);
				} else {
					res.jsonp(user);
				}
			});
		}
	})(req, res, next);
};

/**
 * OAuth callback
 */
exports.oauthCallback = function(strategy) {
	return function(req, res, next) {
		passport.authenticate(strategy, function(err, user, redirectURL) {
			if (err || !user) {
				return res.redirect('/#!/signin');
			}
			req.login(user, function(err) {
				if (err) {
					return res.redirect('/#!/signin');
				}

				return res.redirect(redirectURL || '/');
			});
		})(req, res, next);
	};
};