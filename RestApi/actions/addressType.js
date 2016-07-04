/**
 * Created by btrabon on 7/4/16.
 */

var AddressType = require('../models/addressType');

var AddressTypeActions = function() {
    var vm = this;

    vm.readAll = readAll;

    function readAll(request, response) {
        AddressType.find({}, function(error, addressTypes) {
            if (error) return response.status(500).send(error);

            if (!addressTypes) {
                return response.status(403).send({ success: false, message: 'No address types found.' });
            } else {
                response.json(addressTypes);
            }
        });
    }
};

module.exports = new AddressTypeActions();