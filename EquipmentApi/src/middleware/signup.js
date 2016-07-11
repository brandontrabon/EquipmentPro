'use strict';

module.exports = function(app) {
  return function(req, res, next) {
    // Perform actions
    const body = req.body;

    // create a new user
    app.service('users').create({
      email: body.email,
      password: body.password
    })
    .then(function(user) {
      res.json({ success: true });
    })
    .catch(next);
  };
};
