const mongoose=require("mongoose")

const postschema=new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    img_url:{
        type:String,
        required:[true,"image is required"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"user is required"]
    }
})

const postmodel=mongoose.model("post",postschema)
module.exports=postmodel