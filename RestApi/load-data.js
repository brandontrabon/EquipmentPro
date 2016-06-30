/**
 * Created by btrabon on 6/25/16.
 */

var mongoose = require('mongoose');
var config = require('./config/database');

var Claim = require('./models/identity/claim');
var Role = require('./models/identity/role');
var UserClaim = require('./models/identity/user-claim-value');
var User = require('./models/identity/user');
var Address = require('./models/address');
var AddressType = require('./models/addressType');

mongoose.connect(config.database);
mongoose.connection.on('open', function() {
    UserClaim.remove({});
    User.remove({});
    Role.remove({});
    Claim.remove({});
    Address.remove({});
    AddressType.remove({});

    var userNameClaim = new Claim({
        name: 'user_name'
    });

    userNameClaim.save(function(err, data) {
        if (err) console.error(err);
        else console.log('Success: ' + data);
    });

    var adminRole = new Role({
        name: 'admin',
        claims: [userNameClaim]
    });

    adminRole.save(function(err, data) {
        if (err) console.error(err);
        else console.log('Success: ' + data);
    });

    var userRole = new Role({
        name: 'user',
        claims: [userNameClaim]
    });

    userRole.save(function(err, data) {
        if (err) console.error(err);
        else console.log('Success: ' + data);
    });

    var adminUserClaim = new UserClaim({
        claimName: 'user_name',
        claimValue: { "username": "btrabon" }
    });

    var userUserClaim = new UserClaim({
        claimName: 'user_name',
        claimValue: { "username": "brandon" }
    });

    var addressTypeHome = new AddressType({
        name: 'Home'
    });

    addressTypeHome.save(function(err, data) {
        if (err) console.error(err);
        else console.log('Success: ' + data);
    });

    var addressTypeWork = new AddressType({
        name: 'Work'
    });

    addressTypeWork.save(function(err, data) {
        if (err) console.error(err);
        else console.log('Success: ' + data);
    });

    var addressTypeOther = new AddressType({
        name: 'Other'
    });

    addressTypeOther.save(function(err, data) {
        if (err) console.error(err);
        else console.log('Success: ' + data);
    });

    var adminAddress = new Address({
        addressTypeId: addressTypeHome._id,
        address1: '1229 Vincent Place',
        city: 'Pflugerville',
        stateProvince: 'TX',
        postalCode: '78660'
    });

    var adminUser = new User({
        username: 'btrabon',
        password: 'btrabon',
        firstName: 'Brandon',
        lastName: 'Trabon',
        addresses: [adminAddress],
        claims: [adminUserClaim]
    });

    adminUser.save(function(err, data) {
        if (err) console.error(err);
        else console.log('Success: ' + data);
    });

    var userAddress = new Address({
        addressTypeId: addressTypeWork._id,
        address1: '1234 Work Address',
        city: 'Austin',
        stateProvince: 'TX',
        postalCode: '78528'
    });

    var userUser = new User({
        username: 'brandon',
        password: 'brandon',
        firstName: 'Brandon',
        lastName: 'Trabon',
        addresses: [userAddress],
        claims: [userUserClaim]
    });

    userUser.save(function(err, data) {
        if (err) console.error(err);
        else console.log('Success: ' + data);
    })
});