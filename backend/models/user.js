// import mongoose module
const mongoose= require("mongoose");
// create user schema
const userSchema =mongoose.Schema({
 firstName: String,
 lastName :String,
 email: String,
 pwd: String,
 tel: Number,   
 adr: String, 
 role:String,
 photo: String,
 cv:String,
 speciality: String,
 telStudent: Number,
 status: String,
 courses:
        [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cours'
        } ]

});
// create Match Model
const user = mongoose.model("User", userSchema);
//  export user
module.exports= user;