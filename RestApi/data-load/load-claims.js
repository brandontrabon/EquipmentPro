/**
 * Created by btrabon on 7/2/16.
 */

var mongoose = require('mongoose');
var config = require('../config/database');

var Claim = require('../models/identity/claim');

mongoose.connect(config.database);
mongoose.connection.on('open', function() {
    Claim.remove({}, function(error) {
        if (error) {
            console.error(error);
            mongoose.connection.close();
            return;
        }

        var userNameClaim = new Claim({
            name: 'user_info'
        });
        userNameClaim.save(function(claimError, data) {
            if (claimError) {
                console.error(claimError);
            } else {
                console.log('Claim created successfully.');
                mongoose.connection.close();
            }
        });
    });
});