/**
 * Created by btrabon on 6/26/16.
 */

var express = require('express');
var actions = require('../actions/user');

var router = express.Router();

router.post('/api/user', actions.create);
router.get('/api/user/:username', actions.read);
router.put('/api/user', actions.update);
router.delete('/api/user', actions.delete);

module.exports = router;