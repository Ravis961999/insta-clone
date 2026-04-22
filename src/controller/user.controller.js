const followmodel=require("../models/follow.model")
const usermodel = require("../models/user.model")

async function followusercontroller(req,res) {

    const followerusername=req.user.username
    const followeusername=req.params.username

    if(followerusername===followeusername){
        return res.status(400).json({
            message:"you cannot follow yourself"
        })
    }

    const alreadyfollow=await followmodel.findOne({
        follower:followerusername,
        followe:followeusername,
    })

    
    if(alreadyfollow){
        return res.status(400).json({
            message:`you are already following ${followeusername}`,
            alreadyfollow
        })
    }

    const userexists = await usermodel.findOne({
        username:followeusername
    })
    if(!userexists){
        return res.status(404).json({
            message:"user not found"
        })
    }


    
    const followRecord =await followmodel.create({
        follower:followerusername,
        followe:followeusername
    })
    res.status(201).json({
        message:`you are now following ${followeusername}`,
        follow :followRecord
    })
    
}

async function unfollowusercontroller(req,res) {
    const followerusername=req.user.username
    const followeusername=req.params.username
    
    const isuserfollowing=await followmodel.findOne({
        follower:followerusername,
        followe:followeusername
    })

    if(!isuserfollowing){
        return res.status(200).json({
            message:`you are not following ${followeusername}`
        })
    }

    await followmodel.findByIdAndDelete(isuserfollowing._id)

    res.status(200).json({
        message:`you have unfollowed ${followeusername}`
    })
}



module.exports={followusercontroller,unfollowusercontroller}