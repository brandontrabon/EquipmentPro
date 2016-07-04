/**
 * Created by btrabon on 6/25/16.
 */

module.exports = function(app) {
    app.use(require('../routes/authenticate'));
    app.use(require('../routes/user'));
    app.use(require('../routes/addressType'));
    app.use(require('../routes/userType'));
};