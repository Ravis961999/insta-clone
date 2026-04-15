const mongoose=require("mongoose")

const userschema=new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username already exist"],
        required:[true,"username is required"]
    },
    email:{
        type:String,
        unique:[true,"user already exist"],
        required:[true,"email is required"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    bio:String,
    profile_image:{
        type:String,
        default:"https://ik.imagekit.io/raravivi/default-image.jpg"
    }
})

const usermodel=mongoose.model("user",userschema)