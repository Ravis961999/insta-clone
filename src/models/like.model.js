const mongoose=require("mongoose")


const likeschema= new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post",
        required:[true,"post is required"]
    },
    user:{
        type:String,
        required:[true,"username is required for creating a like"],
    }
},{
    timestamps:true
})

likeschema.index({post:1,user:1},{unique:true})

const likemodel=mongoose.model("like",likeschema)

module.exports=likemodel