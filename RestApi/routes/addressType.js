/**
 * Created by btrabon on 7/4/16.
 */

var express = require('express');
var addressTypeActions = require('../actions/addressType');

var router = express.Router();

router.get('/api/addressType', addressTypeActions.readAll);

module.exports = router;