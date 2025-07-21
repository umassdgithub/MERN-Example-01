const express =require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const cors = require("cors")
const User = require("./model/User")


dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())


app.post("/api/auth/register",async (req,res)=>{

    
    try
    {const {username, email, password} = req.body
    let user = await User.findOne({username})
    if(user) return res.status(401).json({"msg":"user already exists!"})
    const salt = await bcrypt.genSalt(10)   
    const hashedPassword = await bcrypt.hash(password, salt)
    user = new User({username,email,password:hashedPassword})
    user.save()
    const token = await jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"2h"})
    res.status(200).json({id:user._id,token})
    }
    catch(err){
        console.log(err)
        res.status(500).json({"msg":"error adding the user"})
    }
})

app.post("/api/auth/login", async (req,res)=>
    {
    const {username, password} = req.body
    
   try {
    let user = await User.findOne({username})
    if(!user) return res.status(401).json({"msg":"user not found, or wrong password!"})

    const isMatched = await bcrypt.compare(password,user.password)
    if(!isMatched) return res.status(401).json({"msg":"user not found, or wrong password!"})
    const token = await jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"2h"})
    res.status(200).json({id:user._id,token})}
    catch(err){
        res.status(401).json({"msg":"error connecting to database"})
    } 
})


app.get("/",(req,res)=>{
    return res.json({"msg":"connected to database"})
})

const verifyToken =(req,res,next)=>{
    const authorizationHeader = req.headers.authorization;
    
    if(!authorizationHeader|| !authorizationHeader.startsWith("Bearer ")) return res.status(401).json({"msg":"token is missing"})
    const token = authorizationHeader.split(" ")[1];
    const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
    req.user=decodedToken
    
    next()
}

app.get("/api/profile",verifyToken,async(req,res)=>{
    try{
        const userProfile = await User.findOne({_id:req.user.id}).select("-password")
       
        return res.json({"decodedUser":req.user,"profileData":JSON.stringify(userProfile)})
    }
    catch(err){
        console.log(err)
        res.status(401).json({"msg":"error loading user profile data!"})
    }
    
})






async function startServer(){


    try  {  await mongoose.connect(process.env.MONGODB_URI)
        app.listen(process.env.PORT,()=>{
            console.log(`Server running on http://localhost:${process.env.PORT}`)
        })}
    catch(err){
        console.log(err)
    }
}
startServer()
