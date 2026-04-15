const express=require("express")
const authrouter=express.Router()
const usermodel=require("../models/user.model")
const crypto=require("crypto")
const jwt=require("jsonwebtoken")

authrouter.post("/singup",async(req,res)=>{
    const {username,email,password,bio,profile_image}=req.body

    const userexists=await usermodel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(userexists){
        return res.status(409).json({message:userexists.username===username?"username already exist":"email already exist"})
    }

    const hashpassword= crypto.createHash("md5").update(password).digest("hex")

    const user = await usermodel.create({
        username,email,password:hashpassword,bio,profile_image
    })

    const token= jwt.sign({
        id:user._id,
        email:user.email
    },process.env.JWT_SECRET,{expiresIn:"1d"})

    res.cookie("jwt_token",token)

    res.status(201).json(
        {message:"user created successfully",
            user,
            token
        }
    )


})