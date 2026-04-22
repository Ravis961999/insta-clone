const mongoose=require("mongoose")

const followschema= new mongoose.Schema({
    follower:{
        type:String
        // type:mongoose.Schema.Types.ObjectId,
        // ref:"user",
        // required:[true,"follower is required"]
    },
    followe:{
        type:String
        // type:mongoose.Schema.Types.ObjectId,
        // ref:"users",
        // required:[true,"followee is required"]
    } 
}
)

followschema.index({follower:1,followe:1},{unique:true}) // to ensure that a user cannot follow the same user multiple times
 
const followmodel=mongoose.model("follow",followschema)

module.exports=followmodel