const connecttomongoose=require("./db");
const express=require("express");
const cors=require("cors");
const app=express();
const port=5000;
connecttomongoose();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{

 res.send("hello world"); 
});

app.use("/api/auth",require("./routes/auth")); 
app.use("/api/notes",require("./routes/notes"));

app.listen(port,()=>{
    console.log('server is listening on port 5000');
});  