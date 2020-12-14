const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const isAdmin = require('../../middleware/isAdmin');
const { update } = require('../../models/Bill');

const Bill = require('../../models/Bill');
const Item = require('../../models/Item');
const Seller = require('../../models/Seller');



module.exports =  router;

// ** Orders ** //

//get orders
router.get('/orders', auth, isAdmin, (req, res)=>{
    Bill.find().sort({date: -1})
    .then(bills=>{
        if(bills){
            res.json(bills);
        }else{
            res.json({bills: []})
        }
    })
})

//get order
router.get('/orders/:id', auth, isAdmin, (req, res)=>{
    Bill.findById(req.params.id).populate(['items.item', 'user']).then(bill=>{
        res.json(bill);
    })
})

//update order
router.put('/orders/:id', auth, isAdmin, (req, res)=>{
    const {update} = req.body;
    Bill.findByIdAndUpdate(req.params.id, {$set: update}, {new: true})
    .then(()=>res.json({success: true}));
})

//update order by item (ready)
router.post('/orders', auth, isAdmin, (req, res)=>{
    const {order_id, item_id} = req.body;
    Bill.findById(order_id).then(order=>{

        let item_index = 0;

        order.items.map((item, index)=>{
            if(item_id.match(item._id)){
                item.ready = true;
            }
        })

        order.save().then(order=>{
            res.json({success: true})
        })

    })
})

//delete order
router.delete('/orders/:id', auth, isAdmin, (req, res)=>{
    Bill.findByIdAndRemove(req.params.id).then(()=>{
        res.json({success: true});
    })
})

//get orders by user (remaining)
router.get('/orders/bucket/:admin', auth, isAdmin, (req, res)=>{
    const admin = req.params.admin;

    Bill.find().populate(['user', 'items.item']).then(orders=>{
        let bills = [];
        orders.map(( order )=>{
            order.items.map(items=>{
                if(admin.match(items.item.user)){
                    if(bills.indexOf(order) === -1 ){
                        bills.push(order)
                    }
                }
            })
        });
        
        res.json({bills})
    })
    
})



// ** Sellers ** //

//get seller-items
router.get('/seller-items/:id', auth, isAdmin, (req, res)=>{
    Item.find({seller:req.params.id})
    .select(['name', '_id'])
    .then(items=>{
        res.json(items)
    })
})

//get sellers
router.get('/seller', auth, isAdmin, (req, res)=>{
    Seller.find().then(sellers=>{
        if(sellers){
            res.json(sellers)
        }else{
            res.json({sellers: null})
        }
    })
})

//add seller
router.post('/seller', auth, isAdmin, (req, res)=>{
    const { seller } = req.body;
    const newSeller = new Seller(seller);
    newSeller.save().then(seller=>{
        res.json({success:true, seller})
    })
})

//update seller
router.put('/seller', auth, isAdmin, (req, res)=>{
    const { seller_id, update } = req.body;
    Seller.findByIdAndUpdate(seller_id, {$set: update}, {new:true})
    .then(seller=>res.json({seller, success: true}))
})

//delete seller ------------------------------------------------------------------------------
router.delete('/seller/:id', auth, isAdmin, (req, res)=>{

    Seller.findByIdAndRemove(req.params.id)
    .then(()=>{

        //remove seller's items --------------------------------------------------------------
        res.json({success:true})
    })
})



// ** Items ** //

//get Item
router.get('/item/:id', auth, isAdmin, (req, res)=>{
    Item.findById(req.params.id).populate(['seller', 'user'])
    .then(item=>res.json(item))
    .catch(err=>console.log(err))
})

//add item
router.post('/item', auth, isAdmin, (req, res)=>{

    const { item } = req.body;
    item.user = req.user.id;
    
    const newItem = new Item(item);
    newItem.save().then(item=>{
        res.json({id: item._id, success:true})
    })
})

//update item
router.put('/item', auth, isAdmin, (req, res)=>{
    const { item_id, update } = req.body;
    Item.findByIdAndUpdate(item_id, {$set: update}, {new:true})
    .then(item=>res.json({item, success: true}))
})

//delete item
router.delete('/item/:id', auth, isAdmin, (req, res)=>{
    Item.findByIdAndRemove(req.params.id)
    .then(()=>res.json({success:true}))
})


