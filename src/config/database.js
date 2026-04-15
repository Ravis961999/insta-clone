const express=require("express")
const mongoose=require("mongoose")

const dns=require("dns")
dns.setServers(
    [
        '1.1.1.1',
        '8.8.8.8'
    ]
)

function ConnectDB(){
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("connected to database");
    })
}       


module.exports=ConnectDB