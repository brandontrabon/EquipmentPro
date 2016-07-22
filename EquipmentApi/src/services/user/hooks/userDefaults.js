'use strict';

// src/services/user/hooks/userDefaults.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const q = require('q');

const Role = require('../../role/role-model');
const UserType = require('../../userType/userType-model');
const UserClaim = require('../user-claim-value-model');

const defaults = {};

module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    return new Promise(function(resolve, reject) {
      const userTypeId = hook.data.userTypeId;

      const userTypeDeferred = q.defer();
      UserType.find({ _id: userTypeId }, function(error, userType) {
        if (error) userTypeDeferred.reject(error);
        else userTypeDeferred.resolve(userType[0]);
      });

      const roleDeferred = q.defer();
      userTypeDeferred.promise.then(
        function(userType) {
          var roleName = '';

          switch(userType.name) {
            case "Admin":
              roleName = 'admin';
              break;
            case "Company":
            case "User":
              roleName = 'user';
              break;
            case "Employee":
              roleName = 'employee';
              break;
            default:
              roleName = 'user';
          }

          Role.find({ name: roleName }, function(error, role) {
            if (error) roleDeferred.reject(error);
            else roleDeferred.resolve(role);
          });
        },
        function(error) {
          reject(error);
        }
      );

      roleDeferred.promise.then(
        function(role) {
          var userInfoClaim = new UserClaim({
            claimId: role[0].claims[0],
            claimName: 'user_info',
            claimValue: { "email": hook.data.email }
          });

          hook.data = Object.assign({}, hook.data, {
            roles: role,
            claims: [userInfoClaim]
          });

          resolve(hook);
        },
        function(error) {
          reject(error);
        }
      );
    });
  };
};
