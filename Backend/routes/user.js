const express = require('express');
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const {userSigninSchema, userSignupSchema} = require("../utils/zodSchemas.js");
const User = require("../models/user.js");
const router = express.Router();

router.post("/signup",async (req,res)=>{
    const userData = userSignupSchema.safeParse(req.body);
    if(!userData.success){
        return res.status(400).json({
            msg: "Invalid inputs"
        })
    }
    const result = await User.findOne({email: userData.data.email});
    console.log(result)
    if(result){
        return res.status(400).json({
            msg: "User already exists!"
        })
    }
    const newUser = new User({
        email: userData.data.email,
        firstName: userData.data.firstName,
        lastName: userData.data.lastName,
    });
    const hashedPassword = await newUser.createHash(userData.data.password);
    newUser.password = hashedPassword;
    await newUser.save();
    const userId = newUser._id;
    const token = jwt.sign({userId},secret);
    res.json({
        msg: "User created successfully",
        token
    });
})

router.post("/signin",async(req,res)=>{
    const userData = userSigninSchema.safeParse(req.body);
    if(!userData.success){
        return res.status(400).json({
            msg: "Invalid inputs"
        })
    }
    const user = await User.findOne({email: userData.data.email});
    console.log(user)
    if(!user){
        return res.status(400).json({
            msg: "User not found!"
        })
    }
    const isValid = await user.validatePassword(userData.data.password,user.password);
    console.log(isValid);
    if(isValid){
        const userId = user._id;
        const token = jwt.sign({userId},secret);
        return res.json({
            token
        });
    }
    res.status(411).json({
        msg: "Incorrect Password!"
    });
})

module.exports = router;