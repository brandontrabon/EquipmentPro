/**
 * Created by btrabon on 7/4/16.
 */

var ServiceEnvelope = function() {
    var vm = this;

    vm.createSuccessEnvelope = createSuccessEnvelope;
    vm.createFailureEnvelope = createFailureEnvelope;

    function createSuccessEnvelope(data) {
        var envelope = {
            success: true,
            data: data
        };

        return envelope;
    }

    function createFailureEnvelope(message) {
        var envelope = {
            success: false,
            message: message
        };

        return envelope;
    }
};

module.exports = new ServiceEnvelope();