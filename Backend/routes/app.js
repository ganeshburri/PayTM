const express = require('express');
const router = express.Router();
const userRouter = require("./user.js");
const accountRouter = require("./account.js");

router.use("/users",userRouter);
router.use("/account",accountRouter);
router.get("/",(req,res)=>{
    res.json({
        msg:"working"
    })
})

module.exports = router;