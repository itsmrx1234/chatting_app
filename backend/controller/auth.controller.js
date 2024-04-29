import bcrptjs from 'bcrptjs'
import User from '../model/User.model.js';
import jsonwebtoken from '../utils/jsonwebtoken.js';
export const login= async(req,res)=>{
    try {
        const {username,password}=req.body;
        const user=await User.findOne({username});
        if(!user) return res.status(403).json({error:"username doesn't exist"});
        const 
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:"Internal server error"});
    }
}
export const logout=(req,res)=>{
    res.send("hello");
}
export const signup=async(req,res)=>{
    try {
        const {fullname,username,password,confirmPassword}=req.body;
        if(password!=confirmPassword)
            return res.status(403).json({error:"passwords doesn't match"});
        const user=await User.findOne({username});
        if(user){
            return res.status(403).json({error:"username already exists"});
        }
        const salt=await bcrptjs.genSalt(10);
        const hashedPassword=await bcrptjs.hash(password,salt);
        const boyProfile=`https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfile=`https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser= new User({
            fullname,
            username,
            hashedPassword,
            gender,
            profilepic:gender==="male"?boyProfile:girlProfile
        });
        jsonwebtoken(newUser._id,res);
        await newUser.save();
        res.status(201).json({
            _id:newUser._id,
            fullname:newUser.fullname,
            username:newUser.username,
            gender:newUser.gender,
            profilepic:newUser.profilepic
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:"Internal server error"});
    }
}