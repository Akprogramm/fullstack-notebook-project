const mongoose=require("mongoose");

mongoURI="mongodb://localhost:27017/notebook";

const connecttomongoose=()=>{
    mongoose.connect(mongoURI,()=>{
    console.log("connect to mongo successfully");
    });
}
  
module.exports=connecttomongoose;