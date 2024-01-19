// import mongoose module
const mongoose= require("mongoose");
// create cours schema
const noteSchema =mongoose.Schema({
 note: Number,
 evaluation :String,

 studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    } ,
    coursId:
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cours'
        } ,


});
// create Cours Model
const note = mongoose.model("Note", noteSchema);
//  export cours
module.exports= note;