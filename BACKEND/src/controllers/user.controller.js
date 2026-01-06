import httpStatus from "http-status"
import bcrypt , {hash} from "bcrypt";
import {User} from "../models/user.model.js";
import {Meeting} from "../models/meeting.model.js";
import crypto from "crypto";

const login = async(req, res)=>{
    const {username , password}=req.body;
    if(!username || !password){
        return res.status(404).json({message : "Please provide valid username and password"});
    }
    try{
        const user = await User.findOne({username});
        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({message: "User not registered"});
        }
        let ispassword =await bcrypt.compare(password , user.password)
        if(ispassword){
            let token = crypto.randomBytes(20).toString("hex");
            user.token=token;
            await user.save();
            return res.status(httpStatus.OK).json({token : token});
        }else{
            return res.status(httpStatus.UNAUTHORIZED).json({message: "Wrong Password"});
        }
    }catch(err){
        res.status(500).json({message : `Something went wrong ${err}`});
    }
}

const register = async (req , res)=>{
    const {name , username , password}=req.body;
    try{
        const existingUser =await User.findOne({username});
        if(existingUser){
            return res.status(httpStatus.CONFLICT).json({message : "Username not available"});
        }
        const hashedPassword = await bcrypt.hash(password , 10 );
        const newUser = new User({
            name:name,
            username:username,
            password:hashedPassword
        });
        await newUser.save();
        res.status(httpStatus.CREATED).json({message : "New user created"});
    }catch(err){
        res.json({message : `Something went wrong ${err}`});
    }
}

const getUserHistory = async (req , res)=>{
    const {token} = req.query;
    try{
        const user=await User.findOne({token : token});
        const meetings = await Meeting.find({user_id : user.username});
        res.json(meetings);
    }catch(e){
        res.json({message:`Something went wrong ${e}`})
    }
}

const addToHistory =async(req , res)=>{
    const {token , meetingCode}= req.body;
    try{
        const user = await User.findOne({token : token});
        const newMeeting = new Meeting({
            user_id : user.username,
            meetingCode : meetingCode  

        })
        await newMeeting.save();
        res.status(httpStatus.CREATED).json({message : "Added code to History"})


    }catch(err){
        res.json({message:`Something went wrong ${e}`})
    }
}

export {login , register , getUserHistory , addToHistory};