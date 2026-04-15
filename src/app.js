const express=require("express")
const cookieParser=require("cookie-parser")
const app=express()
app.use(express.json())
app.use(cookieParser())
const authrouter=require("./authentication/auth.route")
app.use("/api/auth",authrouter)

module.exports=app