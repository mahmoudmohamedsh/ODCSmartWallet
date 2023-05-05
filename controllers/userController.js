const {validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

exports.signup = (req,res,next)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const  error = new Error('validation faild');
        error.statuscode = 422;
        error.data = errors.array();
        console.log(error.data);
        throw error;
    }

    const email = req.body.email;
    const password = req.body.password;
    const userName = req.body.userName;

    bcrypt.hash(password.toString(),12).then(hashedPw => {
        const user = new User({
            email:email,
            password:hashedPw,
            name:userName});
        return user.save();

    }).then(result=>{
        res.status(201).json({message:'user created successfully',userId:result._id});
    }).catch(err =>{
        if(!err.statusCode){
            err.statusCode =500; 
        }
        next(err);
    })
}

exports.signin = (req,res,next)=>{

}