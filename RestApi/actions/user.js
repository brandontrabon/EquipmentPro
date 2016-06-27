/**
 * Created by btrabon on 6/26/16.
 */

var jwt = require('jwt-simple');

var config = require('../config/database');
var User = require('../models/identity/user');

var functions = {
    create: function(request, response) {

    },
    read: function(request, response) {
        var token = request.body.token || request.query.token || request.headers['x-access-token'];
        var decodedToken = jwt.decode(token, config.secret);
        
        User.findOne({
            username: request.params.username
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                return response.status(403).send({success: false, message: 'User was not found.'});
            } else {
                response.json(user);
            }
        })
    },
    update: function(request, response) {

    },
    delete: function(request, response) {

    }
};

module.exports = functions;