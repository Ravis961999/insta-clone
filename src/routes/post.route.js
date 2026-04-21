const express=require("express")
const postrouter=express.Router()
const postcontroller=require("../controller/post.controller")
const multer=require("multer")
const upload=multer({storage:multer.memoryStorage()})
const {identifyuser}=require("../middleware/auth.middleware")


postrouter.post("/",upload.single("image"),identifyuser,postcontroller.createpostcontroller)
postrouter.get("/",identifyuser,postcontroller.getpost)
postrouter.get("/details/:postid",identifyuser,postcontroller.getpostDetails)

module.exports=postrouter