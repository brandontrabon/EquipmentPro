/**
 * Created by btrabon on 6/26/16.
 */

var jwt = require('jwt-simple');

var config = require('../config/database');
var User = require('../models/identity/user');
var UserClaim = require('../models/identity/user-claim-value');
var Address = require('../models/address');
var UserViewModel = require('../viewModels/identity/user');

var functions = {
    create: function(request, response) {
        // creating a new user account doesn't require a token
        var userData = request.body;

        var user = new User({
            username: userData.username,
            password: userData.password,
            firstName: userData.firstName,
            middleInitial: userData.middleInitial,
            lastName: userData.lastName
        });

        userData.addresses.forEach(function(address) {
            var userAddress = new Address({
                addressTypeId: address.addressTypeId,
                address1: address.address1,
                address2: address.address2,
                city: address.city,
                stateProvince: address.stateProvince,
                postalCode: address.postalCode
            });

            user.addresses.push(userAddress);
        });

        var userClaim = new UserClaim({
            claimName: 'user_name',
            claimValue: {
                "username": userData.username
            }
        });

        user.claims.push(userClaim);

        user.save(function(err, data) {
            if (err)
                return response.status(400).send({ success: false, message: 'User create failed.' });
            else
                return response.status(200).send({ success: true });
        });
    },
    read: function(request, response) {
        var token = request.body.token || request.query.token || request.headers['x-access-token'];
        var decodedToken = jwt.decode(token, config.secret);

        if (request.params.username !== decodedToken.username)
            return response.status(400).send({success: false, message: 'Invalid token for username.'});
        
        User.findOne({
            username: request.params.username
        }, function(err, user) {
            if (err)
                return response.status(500).send(err);

            if (user && user.currentToken !== token)
                return response.status(400).send({success: false, message: 'Invalid token.'});

            if (!user) {
                return response.status(403).send({success: false, message: 'User was not found.'});
            } else {
                var viewModel = new UserViewModel(user);
                response.json(viewModel);
            }
        });
    },
    update: function(request, response) {
        var token = request.body.token || request.query.token || request.headers['x-access-token'];
        var decodedToken = jwt.decode(token, config.secret);
        
        if (request.params.username !== decodedToken.username)
            return response.status(400).send({ success: false, message: 'Cannot update another user.' });
        
        User.findOne({
            username: request.params.username
        }, function(err, user) {
            if (err)
                return response.status(500).send(err);
            
            if (!user)
                return response.status(403).send({ success: false, message: 'User was not found.' });
            
            if (user && user.currentToken !== token)
                return response.status(400).send({ success: false, message: 'Invalid token.' });
            
            var userData = request.body;
            
            user.firstName = userData.firstName;
            user.middleInitial = userData.middleInitial;
            user.lastName = userData.lastName;

            userData.addresses.forEach(function(address) {
                
            });
        });
    },
    delete: function(request, response) {

    }
};

module.exports = functions;