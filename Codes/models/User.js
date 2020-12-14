const mongoose = require('mongoose');
const Item = require('./Item');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    item: {type: Schema.Types.ObjectId, ref: 'Item'},
    quantity: {type: Number, default: 1}
})

//create schema
const UserSchema = new Schema({ 
    name: { type: String, required: true},
    tp : {type: String, required: false, default: ''},
    email : {type: String, required: true},
    password : {type: String, required: true},
    address : {type: String, required: false, default: ''},
    bills : [{type: Schema.Types.ObjectId, ref: 'Bill'}],
    cart : [itemSchema],
    admin: {type: Boolean, required: false, default: false}
});

module.exports = User = mongoose.model('User', UserSchema);