const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Bill = require('../../models/Bill');
const Item = require('../../models/Item');
const User = require('../../models/User');


// ** User Car ** //
//add to cart
router.put('/cart', auth, (req, res)=>{
    const {item} = req.body;
    User.findById(req.user.id).then(user=>{
        user.cart.push(item);
        user.save().then(()=>res.json({success: true}))
    })
})

//delete an item from the cart
router.delete('/cart/:id', auth, (req, res)=>{
    User.findById(req.user.id).then(user=>{
        const items_array = user.cart.map((product) => product.item);
        const index = items_array.indexOf(req.params.id);
        user.cart.splice(index, 1);
        user.save().then(user=>{
            res.json({success:true})
        })
    })
})

//delete whole cart
router.delete('/cart', auth, (req, res)=>{
    User.findById(req.user.id).then(user=>{
        //remove everything ----------------------------------------------------------------------------
        user.cart = [];
        user.save().then(()=>res.json({success: true}))
    })
})

//pay cart
router.post('/cart', auth, (req, res)=>{
    User.findById(req.user.id).populate('cart.item').then(user=>{
        var total = 0;
        async function resetItemsQuantity(item_id, qty){
            await Item.findByIdAndUpdate(item_id, {$set : qty }).then();
        }


        async function billing(){
            for(let i = 0; i<user.cart.length; i++){
                total += (user.cart[i].item.price * user.cart[i].quantity);
                await resetItemsQuantity(user.cart[i].item._id, {qty: (user.cart[i].item.qty - user.cart[i].quantity)});
            }

            const bill ={
                user: req.user.id,
                items: user.cart,
                total
            }
    
            const newBill = new Bill(bill);
            newBill.save().then(bill=>{
                user.bills.push(bill._id);
                //remove everything ----------------------------------------------------------------------------
                user.cart = [];
                user.save().then(()=>res.json({success: true}))
            })
            
        }
        
        billing();

        
    })
})

//pay now
router.post('/cart/buy-now', auth, (req, res)=>{
    const { item_id, quantity } = req.body;
    User.findById(req.user.id).then(user=>{
        Item.findById(item_id).then(item=>{
            if(item.qty>parseInt(quantity)){
                item.qty = item.qty - parseInt(quantity);
            }
            item.save().then(item=>{
                const bill = {
                    user: req.user.id,
                    items: [{item: item_id, quantity}],
                    total: (item.price * quantity)
                }
                const newBill = new Bill(bill)
                newBill.save().then(bill=>{
                    user.bills.push(bill._id);
                    user.save().then(user=>{
                        res.json({success: true})
                    })
                })
            })
        })
    })
})


// ** User Bills ** //

//get bills
router.get('/bills', auth, (req, res)=>{
    User.findById(req.user.id).select('bills').populate('bills')
    .then(bills=>res.json(bills))
})

//delete bills
router.delete('/bills/:id', auth, (req, res)=>{
    User.findById(req.user.id)
    .then(user =>{
        let index = user.bills.indexOf(req.params.id);
        if(index !== -1 ){
            user.bills.splice(index, 1);
            user.save().then(user=>{
                Bill.findByIdAndRemove(req.params.id).then(()=>res.json({success: true}))
            })
        }else{
            res.json({success: false})
        }
    })
})



// ** User Profile ** //

//update profile
router.put('/', auth, (req, res)=>{
    const {update} = req.body;
    User.findByIdAndUpdate(req.user.id, {$set: update}, {new:true}).then(user=>{
        res.json(user);
    })
})


//delete profile
router.delete('/', auth, (req, res)=>{
    User.findByIdAndRemove(req.user.id).then(user=>{
        res.json({success: true})
    })
})

module.exports =  router;
