const jwt = require('jsonwebtoken');
const config = require('config');
const e = require('express');

function isAdmin(req, res, next){
    if(req.user.admin){
        next();
    }else{
        res.status(400).json({msg: 'Unauthorized'})
    }
}

module.exports = isAdmin;