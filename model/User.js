const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const Schema = mongoose.Schema;
const userSchema = Schema({
    name:{
        type:String,
        require:true
    },
    email: {
        type: String,
        require:true,
    },
    password:{
        type: String,
        require:true
    }
},{timestamps:true})

userSchema.methods.toJSON = function() {
    const obj = this._doc;
    delete obj.password; 
    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;
    return obj;
}


userSchema.methods.generateToken = function() {
   
    const token = jwt.sign({ _id: this._id }, JWT_SECRET_KEY, { expiresIn: '1d' }); 

    return token;
}

const User = mongoose.model("User",userSchema);

module.exports = User;