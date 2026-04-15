require("dotenv").config()
const app=require("./src/app")
const ConnectDB=require("./src/config/database")


ConnectDB();
app.listen(3001,()=>{
    console.log("server running on port 3001");
    
})