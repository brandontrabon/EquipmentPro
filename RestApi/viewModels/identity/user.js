/**
 * Created by btrabon on 6/28/16.
 */

var UserViewModel = function(model) {
    var vm = this;
    
    vm.username = model.username;
    vm.firstName = model.firstName;
    vm.middleInitial = model.middleInitial;
    vm.lastName = model.lastName;
    vm.addresses = [];

    model.addresses.forEach(function(address) {
        var addressVm = {
            id: address._id,
            addressType: {
                id: address.addressType._id,
                name: address.addressType.name
            },
            address1: address.address1,
            address2: address.address2 ? address.address2 : "",
            city: address.city,
            stateProvince: address.stateProvince,
            postalCode: address.postalCode
        };
        
        vm.addresses.push(addressVm);
    });
};

module.exports = UserViewModel;