const mongoose = require("mongoose");
const {Schema}= mongoose;

const notesSchema = new Schema({
   
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        require: true
    },
    discription: {
        type: String,
        require: true,
        unique: true
    },
    tag: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: Date.now
    }
});

module.exports=mongoose.model("notes",notesSchema);