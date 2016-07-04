/**
 * Created by btrabon on 6/26/16.
 */

var express = require('express');
var userActions = require('../actions/user');

var router = express.Router();

router.post('/api/user', userActions.create);
router.get('/api/user/:username', userActions.read);
router.put('/api/user/:username', userActions.update);
router.delete('/api/user/:username', userActions.remove);

module.exports = router;