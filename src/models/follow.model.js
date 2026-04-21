const mongoose=require("mongoose")

const followschema= new mongoose.Schema({
    follower:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"follower is required"]
    },
    followe:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"followee is required"]
    },
    
})
const followmodel=mongoose.model("follow",followschema)
module.exports=followmodel