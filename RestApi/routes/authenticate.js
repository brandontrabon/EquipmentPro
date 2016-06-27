/**
 * Created by btrabon on 6/19/16.
 */

var express = require('express');
var actions = require('../actions/authenticate');

var router = express.Router();
router.post('/api/authenticate', actions.authenticate);

module.exports = router;