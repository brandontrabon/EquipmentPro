/**
 * Created by btrabon on 6/19/16.
 */

var User = require('../models/identity/user');
var UserViewModel = require('../viewModels/identity/user-token');
var jwt = require('jwt-simple');
var config = require('../config/database');

var functions = {
    authenticate: function(request, response) {
        User.findOne({
            name: request.body.name
        }, function(err, user) {
            if (err) throw err;
            
            if (!user) {
                return response.status(403).send({success: false, msg: 'Authentication failed, user not found.'});
            } else {
                user.comparePassword(request.body.password, function(err, isMatch) {
                    console.log(isMatch);
                    if (isMatch && !err) {
                        var userToken = new UserViewModel(user);
                        var token = jwt.encode(userToken, config.secret);
                        response.json({success: true, token: token});
                    } else {
                        console.log(err);
                        return response.status(403).send({success: false, msg: 'Authentication failed'});
                    }
                });
            }
        });
    }
};

module.exports = functions;