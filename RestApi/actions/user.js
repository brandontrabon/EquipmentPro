/**
 * Created by btrabon on 6/26/16.
 */

var jwt = require('jwt-simple');
var _ = require('lodash');

var config = require('../config/database');
var User = require('../models/identity/user');
var UserClaim = require('../models/identity/user-claim-value');
var Address = require('../models/address');
var UserViewModel = require('../viewModels/identity/user');

var ServiceEnvelope = require('../common/serviceEnvelope');

var UserActions = function() {
    var vm = this;

    vm.create = create;
    vm.read = read;
    vm.update = update;
    vm.remove = remove;

    function create(request, response) {
        // creating a new user account doesn't require a token
        var userData = request.body;

        var user = new User({
            userTypeId: userData.userTypeId,
            username: userData.username,
            password: userData.password,
            firstName: userData.firstName,
            middleInitial: userData.middleInitial,
            lastName: userData.lastName,
            companyName: userData.companyName
        });

        userData.addresses.forEach(function(address) {
            var userAddress = new Address({
                addressTypeId: address.addressTypeId,
                address1: address.address1,
                address2: address.address2,
                city: address.city,
                stateProvince: address.stateProvince,
                postalCode: address.postalCode,
                countryCode: address.countryCode
            });

            user.addresses.push(userAddress);
        });

        _createInitialClaims(userData).forEach(function(claim) {
            user.claims.push(claim);
        });
        _save(user, response);
    }

    function read(request, response) {
        var token = request.body.token || request.query.token || request.headers['x-access-token'];
        var decodedToken = jwt.decode(token, config.secret);

        if (request.params.username !== decodedToken.username)
            return response.status(400).send(ServiceEnvelope.createFailureEnvelope('Invalid token for username.'));

        User.findOne({
            username: request.params.username
        }, function(err, user) {
            if (err)
                return response.status(500).send(err);

            if (user && user.currentToken !== token)
                return response.status(400).send(ServiceEnvelope.createFailureEnvelope('Invalid token.'));

            if (!user) {
                return response.status(403).send(ServiceEnvelope.createFailureEnvelope('User was not found.'));
            } else {
                var viewModel = new UserViewModel(user);
                response.json(ServiceEnvelope.createSuccessEnvelope(viewModel));
            }
        });
    }

    function update(request, response) {
        var token = request.body.token || request.query.token || request.headers['x-access-token'];
        var decodedToken = jwt.decode(token, config.secret);

        if (request.params.username !== decodedToken.username)
            return response.status(400).send(ServiceEnvelope.createFailureEnvelope('Cannot update another user.'));

        User.findOne({
            username: request.params.username
        }, function(err, user) {
            if (err)
                return response.status(500).send(err);

            if (!user)
                return response.status(403).send(ServiceEnvelope.createFailureEnvelope('User was not found.'));

            if (user && user.currentToken !== token)
                return response.status(400).send(ServiceEnvelope.createFailureEnvelope('Invalid token.'));

            var userData = request.body;

            user.firstName = userData.firstName;
            user.middleInitial = userData.middleInitial;
            user.lastName = userData.lastName;
            user.companyName = userData.companyName;

            userData.addresses.forEach(function(address) {
                var userAddress = _.find(user.addresses, function(item) {
                    return address.id === item._id;
                });

                userAddress.addressTypeId = address.addressTypeId;
                userAddress.address1 = address.address1;
                userAddress.address2 = address.address2;
                userAddress.city = address.city;
                userAddress.stateProvince = address.stateProvince;
                userAddress.postalCode = address.postalCode;
                userAddress.countryCode = address.countryCode;
            });

            _save(user, response);
        });
    }

    function remove(request, response) {
        var token = request.body.token || request.query.token || request.headers['x-access-token'];
        var decodedToken = jwt.decode(token, config.secret);

        if (request.params.username !== decodedToken.username)
            return response.status(400).send(ServiceEnvelope.createFailureEnvelope('Cannot update another user.'));

        User.findOne({
            username: request.params.username
        }, function(error, user) {
            if (error) return response.status(500).send(error);
            if (!user) return response.status(403).send(ServiceEnvelope.createFailureEnvelope('User was not found.'));
            if (user.currentToken !== token)
                return response.status(400).send(ServiceEnvelope.createFailureEnvelope('Invalid token.'));

            user.remove(function(error) {
                if (error) return response.staus(400).send(ServiceEnvelope.createFailureEnvelope('User was not deleted.'));
            })
        });
    }

    function _save(userModel, response) {
        userModel.save(function(error, data) {
            if (error)
                return response.status(400).send(ServiceEnvelope.createFailureEnvelope('User information save error: ' + error));
            else
                return response.status(200).send(ServiceEnvelope.createSuccessEnvelope(data));
        });
    }

    function _createInitialClaims(userData) {
        var claims = [];

        claims.push(
            new UserClaim({
                claimName: 'user_info',
                claimValue: {
                    "username": userData.username
                }
            })
        );

        return claims;
    }
};

module.exports = new UserActions();