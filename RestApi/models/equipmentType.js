/**
 * Created by btrabon on 7/4/16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EquipmentTypeSchema = new Schema({
    name: { type: String, required: true },
    parentId: { type: Schema.ObjectId, required: false }
});

module.exports = mongoose.model('equipmentTypes', EquipmentTypeSchema);