'use strict';

module.exports = function(app) {
  return function(req, res, next) {
    // Perform actions
    const body = req.body;

    // create a new user
    app.service('users').create({
      facebookId: body.facebookId,
      facebook: body.facebook,
      githubId: body.githubId,
      github: body.github,
      googleId: body.googleId,
      google: body.google,
      linkedinId: body.linkedinId,
      linkedin: body.linkedin,
      paypalId: body.paypalId,
      paypal: body.paypal,
      userTypeId: body.userTypeId,
      email: body.email,
      password: body.password,
      firstName: body.firstName,
      middleInitial: body.middleInitial,
      lastName: body.lastName,
      companyName: body.companyName,
      addresses: body.addresses
    })
    .then(function(user) {
      res.json({ success: true });
    })
    .catch(next);
  };
};
