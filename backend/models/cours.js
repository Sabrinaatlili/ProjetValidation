// import mongoose module
const mongoose= require("mongoose");
// create cours schema
const coursSchema =mongoose.Schema({
 name: String,
 description :String,
 dure: String,
 img:String,
 teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    } ,
    students:[ 
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        }] ,
    note :{ type: mongoose.Schema.Types.ObjectId,
            ref: 'Note'
          }


});
// create Cours Model
const cours = mongoose.model("Cours", coursSchema);
//  export cours
module.exports= cours;