const jwt = require("jsonwebtoken");
const jwt_secret = "thisisasecret";

const fetchuser=(req,res,next)=>{
 const token=req.header('auth-token');

 if(!token){
    res.status(400),json({error: "sorry some error has occured"});
 }

 try{
  const data=jwt.verify(token,jwt_secret);
   req.us=data.user;
   console.log("data : ",data);
   next();
 }
  catch(error){
    res.status(400).json({error: "sorry some error has occured catch"});
    console.log("error is : ",error);
  }
   
}

module.exports=fetchuser;