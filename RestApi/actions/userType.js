/**
 * Created by btrabon on 7/4/16.
 */

var UserType = require('../models/identity/userType');

var UserTypeActions = function() {
    var vm = this;

    vm.readAll = readAll;

    function readAll(request, response) {
        UserType.find({}, function(error, userTypes) {
            if (error) return response.status(500).send(error);

            if (!userTypes) {
                return response.status(403).send({ success: false, message: 'No user types found.' });
            } else {
                response.json(userTypes);
            }
        });
    }
};

module.exports = new UserTypeActions();