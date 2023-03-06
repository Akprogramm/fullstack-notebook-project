const express = require("express");
const router = express.Router();
const User = require("../modules/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const jwt_secret = "thisisasecret";
const jwt = require("jsonwebtoken");

const fetchuser=require("../middleware/fetchuser");


router.get("/",(req,res)=>{
    obj={
        a: "thios",
        number: 34
    }

    res.json(obj);

}); 



//create a user 
router.post("/createuser", [
    body('name', "invalid name by ak").isLength({ min: 3 }),
    body('email', "invalid email by ak").isEmail(),
    body('password', "invalid password by ak").isLength({ min: 5 })],
    async (req, res) => {

        var success=false;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // console.log(req.body);


        try {

            let user = await User.findOne({ email: req.body.email });

            if (user) {
                return res.status(400).json({success: success, error: "sorry user with this email already exists" });
            }

            const salt = await bcrypt.genSalt(10);
            const secpass = await bcrypt.hash(req.body.password, salt);

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secpass,
                date: req.body.date
            })

            const data = {
                user:{
                id: user.id
                }
            };

            const token = jwt.sign(data, jwt_secret);
            console.log(token);
            success=true;
            res.json({success: success,authtoken: token });

        }
        catch (error) {
            console.log(error.message);
            res.send("some error has occured");
        }
    });


//login a user
router.post("/login",[
    body('email', "plz enter a valid email by ak").isEmail(),
    body('password', "plz enter a valid password for this email").exists()],         
 async(req, res) => {
    
    var success=false;
    const {email,password}=req.body;

    try {
        
    const user = await User.findOne({ email });
    // console.log(user);

    if(!user){
        console.log("sorry ther is no user with this email and password");
        // console.log(email,password);
        return res.send("no no no");
    }

    const data={
        user:{
        id: user.id
        }
    };

    const checkPassword=await bcrypt.compare(password,user.password);
    // console.log("password is :",checkPassword);

    if(!checkPassword){
     return res.send({success: success,error: "sorry password does ot match"});
    }

    let authtoken=jwt.sign(data,jwt_secret);
    success=true;
    res.send({success: success,authtoken: authtoken});

 
    // console.log("success : ",success);
    // else{
    //     res.send("sorry wrong password");
    // }

}
catch (error) {
    console.log(error.message);
    res.send("some error has occured catch");
}

});


//get logedin user details
router.post("/getuserdata",fetchuser,async(req,res)=>{
 const userID=req.us.id;   
 const user= await User.findById(userID).select("-password");;
 res.send(user);
 console.log("complete : ",userID);
});
 

module.exports = router;