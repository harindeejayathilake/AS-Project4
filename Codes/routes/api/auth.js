const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const isAdmin = require('../../middleware/isAdmin');
 
//User Model
 const Bill = require('../../models/Bill');
 const User = require('../../models/User');


//authenticate the user
router.post('/', (req, res)=>{
    const {email, password} = req.body;

    User.findOne({email}).then(user =>{
        if(!user) return res.status(400).json({msg : 'User does not exist'});

        bcrypt.compare(password, user.password).then(isMatch =>{
            if(!isMatch) return res.status(400).json({msg: 'Invalid credentials'});
            jwt.sign( {id: user.id, admin: user.admin}, config.get('jwtSecret'), (err, token)=>{
                if(err) throw err;
       
                if(user.admin){
                    Bill.find().sort({date: -1}).then(bills =>{
                        res.json({token, bills, admin:user.admin, success: true})
                    })
                }else{
                    res.json({name: user.name, admin:user.admin, token, success: true})
                }               
            })
        })
    }) 
});

//create user
router.post('/register', (req, res)=>{
    const {name, email, password, address} = req.body;

    if(!email || !password || !name) return res.status(400).json({msg: 'Please enter all fields'});

    User.findOne({email}).then(user =>{
        if(user) return res.json({success: false})

        const newUser = new User({name, email, password, address});
     
        //create salt & hash
        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(newUser.password, salt, (err, hash)=>{
                if(err) throw err;
                newUser.password = hash;
                newUser.save().then(user =>{
                    jwt.sign( {id: user.id, admin: user.admin}, config.get('jwtSecret'), (err, token)=>{
                        if(err) throw err;
                        res.json({name: user.name, token, success: true})              
                    })
                })
                .catch(err=> res.json({success: false}));
            })
        })
        
    })
})

//get user data
router.get('/user', auth, (req, res)=>{
    User.findById(req.user.id).select('-password -account_details -account_no').populate('cart.item')
    .then(user=>{
        if(user.admin){
            Bill.find().sort({date: -1}).then(bills =>{
                res.json({bills, admin: user.admin, success: true})
            })
        }else{
            res.json(user)
        }    
    })
})

//get all admins
router.get('/admins', (req, res)=>{
    User.find({admin: true}).select(['name', '_id']).then(admins=>{
        res.json(admins);
    })
})

module.exports =  router;