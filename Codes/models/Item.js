const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({ 
    user_name: { type: String, required: false},
    comment: {type: String, required: false}
});

//create schema
const ItemSchema = new Schema({ 
    name: { type: String, required: true},
    price: { type: Number, required: true, default: 0},
    short_desc: { type: String, required: false, default:''},
    category: { type: String, required: false, default:''},
    desc: { type: String, required: false, default:''},
    picture : {type: String, required: false, default: ''},
    seller: { type: Schema.Types.ObjectId, ref: 'Seller' },
    date: {type: Date, default: Date.now},
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    qty: {type: Number, required:true, default: 0},
    comments: [commentSchema]
});

module.exports = Item = mongoose.model('Item', ItemSchema);