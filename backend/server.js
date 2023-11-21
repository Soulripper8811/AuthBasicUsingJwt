import  express  from "express";
import cors from "cors"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import UserModel from "./model/User.js";


const app=express();
app.use(bodyParser.json())
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
dotenv.config()
const SECRET_KEY="HDJADKBSAJKBAS";


// app.get("/get",(req,res)=>{
//     res.send("hellow")
// })


//connection to mongoose

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("connetedd to mongo")
    app.listen(3001,()=>{
        console.log("connectd to server");
    })
}).catch((err)=>{
    console.log(err);
})

app.post("/register",async(req,res)=>{
    try {
        const {username,email,password}=req.body
        const hasedPassword= await bcrypt.hash(password,10)
        const user=new UserModel({
            username,
            email,
            password:hasedPassword
        })
        const existingUser=UserModel.findOne({username})
        if(!existingUser){
            return res.status(300).json({message:"already used try another username."})
        }
        await user.save();
        res.status(200).json({message:"user created succesfully",user})

        
    } catch (err) {
        res.status(400).json({message:err.message})
    }
})

app.get("/user",async(req,res)=>{
    try {
        const user= await UserModel.find();
        res.status(200).json({message:"All user",user})  
    } catch (err) {
        res.status(400).json({message:err.message})  
    }  
})
app.post("/login",async(req,res)=>{
    try {
        const {username,password}=req.body;
        const user=await UserModel.findOne({username})
        const isPassword=await bcrypt.compare(password,user.password)
        if(!user){
            return res.status(300).json({message:"Invalid username"});
        }
        if(!isPassword){
            return res.status(300).json({message:"Invalid password"});
        }
        const token=jwt.sign({userId:user._id},SECRET_KEY,{expiresIn:"1hr"})
        res.status(200).json({message:"login succesful",user})
    } catch (err) {
        res.status(400).json({message:err.message})   
    }
})





