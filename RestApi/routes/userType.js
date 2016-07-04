/**
 * Created by btrabon on 7/4/16.
 */

var express = require('express');
var userTypeActions = require('../actions/userType');

var router = express.Router();

router.get('/api/userType', userTypeActions.readAll);

module.exports = router;