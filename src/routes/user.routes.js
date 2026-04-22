const express=require("express")
const usercontroller=require("../controller/user.controller") 
const {identifyuser}=require("../middleware/auth.middleware")

const userrouter=express.Router()


/*
* @route POST /api/users/follow/:useerid
* @discription follow a user
* @access private
*/

userrouter.post("/follow/:username",identifyuser,usercontroller.followusercontroller)

/*
*@route POST /api/user/unfollow/:username
*@discription unfollow a user
*@access private

*/


userrouter.post("/unfollow/:username",identifyuser,usercontroller.unfollowusercontroller)

module.exports=userrouter;