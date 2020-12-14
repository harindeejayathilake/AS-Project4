const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//create schema
const SellerSchema = new Schema({ 
    name: { type: String, required: true},
    tp: { type: String, required: true},
    address: { type: String, required: false, default:''},
    account_no : {type: String, required: true, default: ''},
    account_details: { type: String, require: true }
});

module.exports = Seller = mongoose.model('Seller', SellerSchema);