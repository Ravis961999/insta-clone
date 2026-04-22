const express=require("express")
const cookieParser=require("cookie-parser")

const app=express()
app.use(express.json())
app.use(cookieParser())


/*  require routes*/
const authrouter=require("./routes/auth.route")
const postrouter=require("./routes/post.route")
const userrouter=require("../src/routes/user.routes")


/* use routes*/
app.use("/api/auth",authrouter)
app.use("/api/post",postrouter)
app.use("/api/user",userrouter)

module.exports=app