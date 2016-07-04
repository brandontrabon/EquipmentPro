/**
 * Created by btrabon on 7/2/16.
 */

var q = require('q');
var mongoose = require('mongoose');
var config = require('../config/database');

var Claim = require('../models/identity/claim');
var Role = require('../models/identity/role');

mongoose.connect(config.database);
mongoose.connection.on('open', function() {
    Role.remove({}, function(error) {
        if (error) {
            console.error(error);
            mongoose.connection.close();
            return;
        }

        var promises = [];
        var claimDef1 = q.defer();
        Claim.findOne({ name: 'user_info' }, function(claimError, data) {
            if (claimError) claimDef1.reject(claimError);
            else claimDef1.resolve(data);
        });
        promises.push(claimDef1.promise);

        // put the claims in the correct places
        var adminClaims = [];
        var userClaims = [];
        var employeeClaims = [];

        var claimsDef = q.defer();
        q.all(promises)
            .then(
                function(data) {
                    data.forEach(function(claim) {
                        switch (claim.name) {
                            case 'user_info':
                                adminClaims.push(claim._id);
                                userClaims.push(claim._id);
                                employeeClaims.push(claim._id);
                                break;
                        }
                    });

                    claimsDef.resolve({});
                },
                function(error) {
                    claimsDef.reject(error);
                }
            );

        claimsDef.promise.then(
            function() {
                var adminRole = new Role({
                    name: 'admin',
                    claims: [adminClaims]
                });
                adminRole.save(function(roleError) {
                    if (roleError) console.error('Admin role error: ' + roleError);
                });

                var companyRole = new Role({
                    name: 'companyUser',
                    claims: [userClaims]
                });
                companyRole.save(function(roleError) {
                    if (roleError) console.error('Company role error: ' + roleError);
                });

                var employeeRole = new Role({
                    name: 'employeeUser',
                    claims: [employeeClaims]
                });
                employeeRole.save(function(roleError) {
                    if (roleError) console.error('Employee role error: ' + roleError);
                    else mongoose.connection.close();
                });
            },
            function(error) {
                console.error(error);
                mongoose.connection.close();
            }
        )
    });
});