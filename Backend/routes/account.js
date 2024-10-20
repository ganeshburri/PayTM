const express = require("express");
const authUser = require("../middlewares/authUser");
const Account = require("../models/account.js");
const { transferSchema } = require("../utils/zodSchemas.js");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/balance",authUser,async(req,res)=>{
    const account = await Account.findOne({userId: req.userId});
    res.json({
        balance: account.balance
    });
})

router.post("/transfer",authUser,async(req,res)=>{
    const session = await mongoose.startSession();
    const { success } = transferSchema.safeParse(req.body);
    if(!success){
        return res.status(400).json({
            msg: "Invalid inputs!"
        });
    }
    //Start the transaction
    await session.startTransaction();
    const {to, amount} = req.body;
    const toAccount = await Account.findOne({userId: to}).session(session);
    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            msg: "Invalid Account"
        });
    }
    const fromAccount = await Account.findOne({userId: req.userId}).session(session);
    if(!fromAccount || fromAccount.balance<amount){
        await session.abortTransaction();
        return res.status(400).json({
            msg: "Insufficient Balance!"
        })
    }
    await Account.findByIdAndUpdate(fromAccount,{$inc: {balance:-amount}}).session(session);
    await Account.findByIdAndUpdate(toAccount,{$inc: {balance:amount}}).session(session);
    //Commit the transaction
    await session.commitTransaction();
    res.json({
        msg: "Transfer successful"
    });
})

module.exports = router;