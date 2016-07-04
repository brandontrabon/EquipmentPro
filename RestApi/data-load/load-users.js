/**
 * Created by btrabon on 7/2/16.
 */

var q = require('q');
var mongoose = require('mongoose');
var config = require('../config/database');

var User = require('../models/identity/user');
var AddressType = require('../models/addressType');
var Address = require('../models/address');
var UserClaim = require('../models/identity/user-claim-value');
var Role = require('../models/identity/role');
var UserType = require('../models/identity/userType');

mongoose.connect(config.database);
mongoose.connection.on('open', function() {
    User.remove({}, function(error) {
        if (error) {
            console.error(error);
            mongoose.connection.close();
            return;
        }

        var addressTypeDeferred = q.defer();
        AddressType.find({}, function(error, data) {
            if (error) addressTypeDeferred.reject(error);
            else addressTypeDeferred.resolve(data);
        });

        var promises = [];

        var addressTypes = {};

        var typesLoaded = q.defer();
        promises.push(typesLoaded.promise);
        addressTypeDeferred.promise.then(
            function(data) {
                data.forEach(function(addressType) {
                    addressTypes[addressType.name] = addressType;
                });

                typesLoaded.resolve({});
            },
            function(error) {
                typesLoaded.reject(error);
            }
        );

        var rolesDeferred = q.defer();
        Role.find({}, function(error, data) {
            if (error) rolesDeferred.reject(error);
            else rolesDeferred.resolve(data);
        });

        var roles = {};

        var rolesLoaded = q.defer();
        promises.push(rolesLoaded.promise);
        rolesDeferred.promise.then(
            function(data) {
                data.forEach(function(role) {
                    roles[role.name] = role;
                });

                rolesLoaded.resolve({});
            },
            function(error) {
                rolesLoaded.reject(error);
            }
        );

        var userTypesDeferred = q.defer();
        UserType.find({}, function(error, data) {
            if (error) userTypesDeferred.reject(error);
            else userTypesDeferred.resolve(data);
        });

        var userTypes = {};

        var userTypesLoaded = q.defer();
        promises.push(userTypesLoaded.promise);
        userTypesDeferred.promise.then(
            function(data) {
                data.forEach(function(userType) {
                    userTypes[userType.name] = userType;
                });

                userTypesLoaded.resolve({});
            },
            function(error) {
                userTypesLoaded.reject(error);
            }
        );

        q.all(promises).then(
            function() {
                // this is where the actual user records will be created

                // first create the admin user
                var adminAddress = new Address({
                    addressTypeId: addressTypes['Home']._id,
                    address1: '1229 Vincent Place',
                    city: 'Pflugerville',
                    stateProvince: 'TX',
                    postalCode: '78660',
                    countryCode: 'US'
                });

                var adminUserClaim = new UserClaim({
                    claimName: 'user_info',
                    claimValue: { "username": "btrabon" }
                });

                var adminUser = new User({
                    userTypeId: userTypes['Admin']._id,
                    username: 'btrabon',
                    password: 'btrabon',
                    firstName: 'Brandon',
                    lastName: 'Trabon',
                    companyName: 'Equipment Pro',
                    addresses: [adminAddress],
                    roles: [roles['admin']],
                    claims: [adminUserClaim]
                });

                adminUser.save(function(error) {
                    if (error) {
                        console.error(error);
                        mongoose.connection.close();
                    }
                });

                // next create the company user
                var userAddress = new Address({
                    addressTypeId: addressTypes['Work']._id,
                    address1: '1234 Work Address',
                    address2: 'Suite 100',
                    city: 'Austin',
                    stateProvince: 'TX',
                    postalCode: '78752',
                    countryCode: 'US'
                });

                var userUserClaim = new UserClaim({
                    claimName: 'user_info',
                    claimValue: { "username": "brandon" }
                });

                var userUser = new User({
                    userTypeId: userTypes['Company']._id,
                    username: 'brandon',
                    password: 'brandon',
                    firstName: 'Brandon',
                    lastName: 'Trabon',
                    companyName: 'Equipment Pro',
                    addresses: [userAddress],
                    roles: [roles['companyUser']],
                    claims: [userUserClaim]
                });

                userUser.save(function(error) {
                    if (error) {
                        console.error(error);
                        mongoose.connection.close();
                    }
                });

                // lastly create the employee user
                var employeeAddress = new Address({
                    addressTypeId: addressTypes['Home']._id,
                    address1: '4321 Employee Address',
                    address2: 'Apt. 202',
                    city: 'Austin',
                    stateProvince: 'TX',
                    postalCode: '78750',
                    countryCode: 'US'
                });

                var employeeUserClaim = new UserClaim({
                    claimName: 'user_info',
                    claimValue: { "username": "brandon.trabon" }
                });

                var employeeUser = new User({
                    userTypeId: userTypes['Employee']._id,
                    username: 'brandon.trabon',
                    password: 'brandon.trabon',
                    firstName: 'Brandon',
                    lastName: 'Trabon',
                    companyName: 'Equipment Pro',
                    addresses: [employeeAddress],
                    roles: [roles['employeeUser']],
                    claims: [employeeUserClaim]
                });

                employeeUser.save(function(error) {
                    if (error) console.error(error);

                    mongoose.connection.close();
                });
            },
            function(error) {
                console.error(error);
                mongoose.connection.close();
            }
        );
    });
});