const usermodel=require("../models/user.model")
const crypto=require("crypto")
const jwt=require("jsonwebtoken")




 async function singup (req,res){
    const {username,email,password,bio,profile_image}=req.body

    const userexists=await usermodel.findOne({
        $or:[
            {username:username},
            {email:email}
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


}

 async function login(req,res){
    const {username,email,password}=req.body

    const user = await usermodel.findOne({
        $or:[
            {username:username},
            {email: email}
        ]

    })
    if(!user){
        return res.status(404).json({message:username?"username not found":"email not found"})
    }
    const hashpassword=crypto.createHash("md5").update(password).digest("hex")

    if(user.password!==hashpassword){
        return res.status(401).json({message:"invalid password"})
    }

    const token=jwt.sign({
        id:user._id,
        email:user.email
    },process.env.JWT_SECRET,{expiresIn:"1d"})

    res.cookie("jwt_token",token)

    res.status(200).json(
        {
            message:"user login successfully",
            user:{
                username:user.username,
                email:user.email,
                profile:user.profile_image,
                bio:user.bio,


            }
            
        
        }
    )

}

module.exports={
    singup,
    login
}