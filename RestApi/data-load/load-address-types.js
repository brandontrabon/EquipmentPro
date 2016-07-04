/**
 * Created by btrabon on 7/2/16.
 */

var q = require('q');
var mongoose = require('mongoose');
var config = require('../config/database');

var AddressType = require('../models/addressType');

mongoose.connect(config.database);
mongoose.connection.on('open', function() {
    AddressType.remove({}, function(error) {
        if (error) {
            console.error(error);
            mongoose.connection.close();
            return;
        }

        var promises = [];

        var homeDeferred = q.defer();
        var addressTypeHome = new AddressType({
            name: 'Home'
        });
        addressTypeHome.save(function(error, data) {
            if (error) homeDeferred.reject(error);
            else homeDeferred.resolve(data);
        });
        promises.push(homeDeferred.promise);

        var workDeferred = q.defer();
        var addressTypeWork = new AddressType({
            name: 'Work'
        });
        addressTypeWork.save(function(error, data) {
            if (error) workDeferred.reject(error);
            else workDeferred.resolve(data);
        });
        promises.push(workDeferred.promise);

        var otherDeferred = q.defer();
        var addressTypeOther = new AddressType({
            name: 'Other'
        });
        addressTypeOther.save(function(error, data) {
            if (error) otherDeferred.reject(error);
            else otherDeferred.resolve(data);
        });
        promises.push(otherDeferred.promise);

        q.all(promises).then(
            function() {
                console.log('Address Types Created');
                mongoose.connection.close();
            },
            function(error) {
                console.error(error);
                mongoose.connection.close();
            }
        );
    });
});