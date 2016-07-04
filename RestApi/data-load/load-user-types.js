/**
 * Created by btrabon on 7/3/16.
 */

var q = require('q');
var mongoose = require('mongoose');
var config = require('../config/database');

var UserType = require('../models/identity/userType');

mongoose.connect(config.database);
mongoose.connection.on('open', function() {
    UserType.remove({}, function(error) {
        if (error) {
            console.error(error);
            mongoose.connection.close();
            return;
        }

        var promises = [];

        var adminTypeDeferred = q.defer();
        var userTypeAdmin = new UserType({
            name: 'Admin'
        });
        userTypeAdmin.save(function(error, data) {
            if (error) adminTypeDeferred.reject(error);
            else adminTypeDeferred.resolve(data);
        });
        promises.push(adminTypeDeferred.promise);

        var companyTypeDeferred = q.defer();
        var userTypeCompany = new UserType({
            name: 'Company'
        });
        userTypeCompany.save(function(error, data) {
            if (error) companyTypeDeferred.reject(error);
            else companyTypeDeferred.resolve(data);
        });
        promises.push(companyTypeDeferred.promise);

        var employeeTypeDeferred = q.defer();
        var userTypeEmployee = new UserType({
            name: 'Employee'
        });
        userTypeEmployee.save(function(error, data) {
            if (error) employeeTypeDeferred.reject(error);
            else employeeTypeDeferred.resolve(data);
        });
        promises.push(employeeTypeDeferred.promise);

        q.all(promises).then(
            function() {
                console.log('User Types Created');
                mongoose.connection.close();
            },
            function(error) {
                console.error(error);
                mongoose.connection.close();
            }
        );
    });
});