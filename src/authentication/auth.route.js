const express=require("express")
const authrouter=express.Router()
const controller=require("../controller/auth.controller")



authrouter.post("/singup",controller.singup)


authrouter.post("/login",controller.login)

module.exports=authrouter