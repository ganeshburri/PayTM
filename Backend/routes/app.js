const express = require('express');
const router = express.Router();
const userRouter = require("./user.js");

router.use("/users",userRouter);
router.get("/",(req,res)=>{
    res.json({
        msg:"working"
    })
})

module.exports = router;