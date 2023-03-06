const express=require("express");
const router=express.Router();
const fetchuser=require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Note=require("../modules/Notes");
const { response } = require("express");

router.get("/",(req,res)=>{
    res.send("hello ak");
});

//fetchallthenotes
router.get("/fetchallnotes",fetchuser,
async (req,res)=>{

 const note=await Note.find({user: req.us.id});
//  console.log("ght : ",req.us);
//  console.log(note);
 res.send(note);
});


//addanote
router.post("/addnotes",fetchuser,[
    body('title', "invalid title ak").isLength({ min: 3 }),
    body('discription', "invalid discription by ak").isLength({ min: 5 }),
    body('tag', "invalid tag by ak").isLength({ min: 2 })],
    async (req,res)=>{                  
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()});
        }
        
        // const {title,discription,tag}=req.body;
        console.log("req.us : ",req.us);

        const note=new Note({
            user: req.us.id,
            title: req.body.title,
            discription: req.body.discription,
            tag: req.body.tag
        });

        const savedNote = await note.save();
         console.log(savedNote);
        res.json(savedNote);
});


//update the note
 router.put("/updatenote/:id",fetchuser, async (req,res)=>{
    const {title,discription,tag}=req.body;
    const newNote={};

    if(title){newNote.title=title};
    if(discription){newNote.discription=discription};
    if(tag){newNote.tag=tag};

    let note=await Note.findById(req.params.id);
    if(!note){return res.send("sorry no note found")}
//    console.log("noteUser : ",note);
    if(note.user.toString() !== req.us.id){
        return res.status(400).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id,{$set: newNote},{new: true});

    res.send(note);
 });




//Delete note
 router.delete("/deletenote/:id",fetchuser, async (req,res)=>{

    let note=await Note.findById(req.params.id);

    if(!note){return res.send("sorry no note found")}
//    console.log("noteUser : ",note);
    if(note.user.toString() !== req.us.id){
        return res.status(400).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);

    res.json({success :"success note has been deleted ",note: note});
 });



module.exports=router;







