const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
});

userSchema.methods.createHash = async(actualPassword)=>{
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(actualPassword,salt);
}

userSchema.methods.validatePassword = async(enteredPassword,passwordHash)=>{
    return await bcrypt.compare(enteredPassword,passwordHash);
}

const User = mongoose.model("User",userSchema);

module.exports = User;