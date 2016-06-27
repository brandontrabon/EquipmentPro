/**
 * Created by btrabon on 6/18/16.
 */

var mongoose = require('mongoose');
var express = require('express');
var morgan = require('morgan');
var cors = require('cors');
var passport = require('passport');
var bodyParser = require('body-parser');
var authRoute = require('./routes/authenticate');
var userRoute = require('./routes/user');
var config = require('./config/database');

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

    require('./config/passport')(passport);

    app.listen(4100, function (err) {
        console.log('server is running');
    });
});