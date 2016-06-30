/**
 * Created by btrabon on 6/19/16.
 */

var User = require('../models/identity/user');
var UserTokenViewModel = require('../viewModels/identity/user-token');
var jwt = require('jwt-simple');
var config = require('../config/database');

var functions = {
    authenticate: function(request, response) {
        User.findOne({
            username: request.body.username
        }, function(err, user) {
            if (err) throw err;
            
            if (!user) {
                return response.status(403).send({success: false, msg: 'Authentication failed, user not found.'});
            } else {
                user.comparePassword(request.body.password, function(err, isMatch) {
                    if (isMatch && !err) {
                        var userToken = new UserTokenViewModel(user);
                        var token = jwt.encode(userToken, config.secret);
                        
                        user.currentToken = token;
                        user.save(function(err, data) {
                            if (err) console.error(err);
                        });

                        response.json({success: true, token: token});
                    } else {
                        return response.status(403).send({success: false, msg: 'Authentication failed'});
                    }
                });
            }
        });
    }
};

module.exports = functions;