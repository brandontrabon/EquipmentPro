/**
 * Created by btrabon on 6/26/16.
 */

var UserViewModel = function(model) {
    var vm = this;
    
    vm.username = model.username;
    vm.claims = model.claims;
};

module.exports = UserViewModel;