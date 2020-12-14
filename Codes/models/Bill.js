const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    item: {type: Schema.Types.ObjectId, ref: 'Item'},
    ready: {type: Boolean, default: false},
    quantity: {type: Number, default: 1}
})

//create schema
const BillSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    items: [itemSchema],
    date: { type: Date, default: Date.now},
    accepted: {type: Boolean, required: true, default: false},
    delivered: {type: Boolean, required: true, default: false},
    total: {type: Number, required: true}
});

module.exports = Bill = mongoose.model('Bill', BillSchema);