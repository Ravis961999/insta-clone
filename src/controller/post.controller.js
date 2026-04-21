const postmodel=require("../models/post.model")
const Imagekit=require("@imagekit/nodejs")
const {toFile}=require("@imagekit/nodejs")
// const { Folders } = require("@imagekit/nodejs/resources.js")
const jwt=require("jsonwebtoken")

const imagekit= new Imagekit({
    privateKey:process.env.Imagekit_private_key
})

async function createpostcontroller(req,res) { 
    console.log(req.body,req.file);
    
    const file= await imagekit.files.upload({
    file:await toFile(Buffer.from(req.file.buffer),'files'),
    fileName:'test',
    folder:'posts'
})


//  const decodedtoken=jwt.verify(token,process.env.jwt_secret)
// console.log(decodedtoken);

const post=await postmodel.create({
    caption:req.body.caption,
    img_url:file.url,
    user:req.user.id
})


    res.status(201).json({
        message:"post created successfully",
        post
    })
    // res.send(file)
}
// async function createpostcontroller(req,res) {
//     console.log(req.body,req.file);}

async function getpost(req,res){

     const userId=req.user.id
     const post = await postmodel.find({
        user:userId
     })
     return res.status(200).json({
        message:"post fetched successfully",
        post
     })

}


async function getpostDetails(req,res){

    const userid=req.user.id
    const {postid}=req.params

    const post = await postmodel.findById(postid)
    if(!post){
        return res.status(404).json({
            message:"post not found"
        })
    }
    console.log(post.user);
    
    
    const isvaliduser=post.user.toString() ===userid

    if(!isvaliduser){
        return res.status(403).json(
            {
                message:"forbiddden content"
            }
        )
    }
    return res.status(200).json({
         message:"post details fetched successfully",
         post
    })


}

module.exports={createpostcontroller,getpost,getpostDetails};