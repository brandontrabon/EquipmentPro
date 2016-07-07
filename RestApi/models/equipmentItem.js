/**
 * Created by btrabon on 7/6/16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EquipmentItemSchema = new Schema({
    equipmentTypeId: { type: Schema.ObjectId, ref: 'equipmentTypes' },
    name: { type: String, required: true }
});

module.exports = mongoose.model('equipmentItems', EquipmentItemSchema);