/**
 * Created by btrabon on 7/6/16.
 */

var q = require('q');
var mongoose = require('mongoose');
var config = require('../config/database');

var EquipmentType = require('../models/equipmentType');

mongoose.connect(config.database);
mongoose.connection.on('open', function() {
    EquipmentType.remove({}, function(error) {
        if (error) {
            console.error(error);
            mongoose.connection.close();
            return;
        }

        var promises = [];

        var gymEquipDeferred = q.defer();
        var gymEquipmentType = new EquipmentType({
            name: 'Gym Equipment'
        });
        gymEquipmentType.save(function(error, data) {
            if (error) gymEquipDeferred.reject(error);
            else gymEquipDeferred.resolve(data);
        });

        gymEquipDeferred.promise.then(
            function(data) {
                var gymCardioType = new EquipmentType({
                    name: 'Cardio',
                    parentId: data._id
                });
                gymCardioType.save(function(error) {
                    if (error) console.error(error);
                });

                var gymStrengthType = new EquipmentType({
                    name: 'Strength',
                    parentId: data._id
                });
                gymStrengthType.save(function(error) {
                    if (error) console.error(error);
                });
            },
            function(error) {
                console.error(error);
                mongoose.connection.close();
            }
        )
    });
});