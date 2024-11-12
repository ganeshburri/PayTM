const express = require('express');
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const {userSigninSchema, userSignupSchema, userUpdateSchema} = require("../utils/zodSchemas.js");
const User = require("../models/user.js");
const router = express.Router();
const authUser = require("../middlewares/authUser.js");
const Account = require("../models/account.js");
const wrapAsync = require("../utils/wrapAsync.js");

router.post("/signup", wrapAsync(async (req,res)=>{
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
    const userAccount = new Account({
        userId : userId,
        balance: Math.floor((Math.random()*10000) + 1)
    })
    await userAccount.save();
    const token = jwt.sign({userId},secret);
    res.json({
        msg: "User created successfully",
        token
    });
}))

router.post("/signin", wrapAsync(async(req,res)=>{
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
}))

router.patch("/me",authUser, wrapAsync(async(req,res)=>{
    const { success } = userUpdateSchema.safeParse(req.body);
    if (!success){
        return res.status(411).json({
            msg: "Invalid inputs!"
        })
    }
    if(req.body.password){
        const user = await User.findById(req.userId);
        if(user)
            req.body.password = await user.createHash(req.body.password);
    }
    await User.findByIdAndUpdate(req.userId,req.body,{ new: true, runValidators: true });
    res.json({
        msg: "Updated successfully"
    })
}))

router.get("/bulk", wrapAsync(async(req,res)=>{
    const filter = req.query.filter || "";
    const searchQuery = {
                $or: [
                    { firstName: { $regex: filter, $options: "i" } },
                    { lastName: { $regex: filter, $options: "i" } },
                ]
            }
    const users = await User.find(searchQuery, "email firstName lastName _id");
    res.json({
        users
    })
}))

router.get("/verify",authUser,wrapAsync(async(req,res)=>{
    const user = await User.findById(req.userId);
    if(!user){
        return res.json({
            success: false
        })
    }
    res.json({
        success: true
    })
}))

module.exports = router;