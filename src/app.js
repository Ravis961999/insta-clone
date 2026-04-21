const express=require("express")
const cookieParser=require("cookie-parser")
const postrouter=require("./routes/post.route")
const app=express()
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
const authrouter=require("./routes/auth.route")
app.use("/api/auth",authrouter)
app.use("/api/post",postrouter)


module.exports=app