/**
 * Created by btrabon on 6/28/16.
 */

var UserViewModel = function(model) {
    var vm = this;
    
    vm.username = model.username;
    vm.firstName = model.firstName;
    vm.middleInitial = model.middleInitial;
    vm.lastName = model.lastName;
    vm.companyName = model.companyName;
    vm.addresses = [];

    model.addresses.forEach(function(address) {
        var addressVm = {
            id: address._id,
            addressTypeId: address.addressTypeId,
            address1: address.address1,
            address2: address.address2 ? address.address2 : "",
            city: address.city,
            stateProvince: address.stateProvince,
            postalCode: address.postalCode,
            countryCode: address.countryCode
        };
        
        vm.addresses.push(addressVm);
    });
};

module.exports = UserViewModel;