/**
 * Created by btrabon on 6/26/16.
 */

var UserTokenViewModel = function(model) {
    var vm = this;

    // the id is stored to make updating easier
    vm.id = model._id;
    vm.username = model.username;
    vm.claims = model.claims;
    vm.createDate = Date.now();
};

module.exports = UserTokenViewModel;