
const jwt =require("jsonwebtoken")


async function identifyuser(req,res,next){

 const token=req.cookies.jwt_token

 if(!token){
    return res.status(401).json({
        message:"user not logged in"
    })
 }

 let decodedtoken=null


 try{
    decodedtoken=jwt.verify(token,process.env.JWT_SECRET)
    // console.log('Decoded token:', decodedtoken);
 }
 catch(e){
    console.log('JWT verify error:', e.message);
    return res.status(401).json({
        message:"user not logged in"
    })
 }
   req.user=decodedtoken
 next()

}

module.exports={identifyuser}


 