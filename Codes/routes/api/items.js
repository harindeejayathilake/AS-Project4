const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const isAdmin = require('../../middleware/isAdmin');
 
//User Model
 const Item = require('../../models/Item');

// ** Customer routes ** //

//get item -------------------------------------------------------------------------
router.get('/:id', (req, res)=>{
    Item.findById(req.params.id)
    .select(['-seller', '-user'])
    .then(item=>{
        //get related items --------------------------------------------
        res.json(item);
    });
})

//get items
router.get('/', (req, res)=>{
    Item.find().sort({date: -1})
    .select(['name', 'price' ,'short_desc', 'picture', '_id'])
    .then(items => {
        if(items){
            res.json(items);
        }else{
            res.json({items: []});
        }
    })
})

//get items - category
router.get('/category/:category', (req, res)=>{
    Item.find({category: req.params.category})
    .sort({date: -1})
    .select(['name', 'price' ,'short_desc', 'picture', '_id'])
    .then(items=>{
        if(items){
            res.json(items)
        }else{
            res.json({items: []});
        }
    })
})

//Search Items




module.exports =  router;
