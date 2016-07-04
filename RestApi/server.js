/**
 * Created by btrabon on 6/18/16.
 */

var mongoose = require('mongoose');
var express = require('express');
var morgan = require('morgan');
var cors = require('cors');
var passport = require('passport');
var bodyParser = require('body-parser');
var config = require('./config/database');

var authRoute = require('./routes/authenticate');
var userRoute = require('./routes/user');
var addressTypeRoute = require('./routes/addressType');
var userTypeRoute = require('./routes/userType');

mongoose.connect(config.database);
mongoose.connection.on('open', function() {
    console.log('mongo is open');
    var app = express();
    app.use(cors());
    app.use(morgan('dev'));
    app.use(passport.initialize());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    app.use(authRoute);
    app.use(userRoute);
    app.use(addressTypeRoute);
    app.use(userTypeRoute);

    require('./config/passport')(passport);

    app.listen(4100, function (error) {
        if (error) console.error(error);
        else console.log('server is running');
    });
});