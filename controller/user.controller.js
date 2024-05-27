const { TopologyDescription } = require('mongodb');
const User = require('../model/User');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userController = {}

userController.createUser = async (req,res)=>{
    try{
        const {email, name, password} = req.body;
        const user = await User.findOne({email});
        if (user) {
            throw new Error("User already exist")
        }
        // 
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password,salt)      
        const newUser = new User({ email, name, password: hash});
        await newUser.save();
        res.status(200).json({ status: 'User created successfully.' });

    }catch(error){
        res.status(400).json({ status: 'Internal Server Error' });
    }
}

userController.loginWithEmail = async (req,res) =>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(user){
            const isMatch = bcrypt.compareSync(password,user.password);
            console.log("isMatch", isMatch);
            if(isMatch){
                const token = user.generateToken();
                console.log("Token: ", token);
                console.log(token);
                return res.status(200).json({status: "success", user, token})
            }
        }
        throw new Error("Email or Password is not matched")

    }catch(error){
        res.status(400).json({status: "fail", message: error.message})
    }
}


module.exports = userController;