// import express application
const express = require("express");
// import body-parser module
const bodyParser = require("body-parser");
// import bcrypt
const bcrypt = require("bcrypt");
// import Axios
const axios = require("axios");
// import mongoose 
const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/educationDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// import multer (sert à upload des fichiers) 
const multer = require("multer");
// import path 
const path = require("path");

// import jwt jsonwebtoken
const jwt = require('jsonwebtoken');
// import express session
const session = require('express-session');
//create a express application 
const app = express();
app.use(bodyParser.json());
// pour qu'on peut Récupérer des objet froms requests 
app.use(bodyParser.urlencoded({ extended: true }));
// Security configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
    );
    res.setHeader(

        "Access-Control-Allow-Methods",

        "GET, POST, DELETE, PATCH, PUT"

    );

    next();

});
// Configuration path
app.use('/images', express.static(path.join('backend/images')));
app.use('/files', express.static(path.join('backend/files')));
const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'application/pdf': 'pdf',
}
const storageConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        let path = 'backend/images';
        if (req.body.role == "teacher") {
            path = 'backend/files';
        }

        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, path)
    },
    // fileName
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
            extension;
        cb(null, imgName);
    }
});
// // Cofig express-session 
const secretKey = 'your-secret-key';
app.use(session({
    secret: secretKey,
    resave: false, // Ajoutez cette ligne pour définir l'option resave
    saveUninitialized: true
}));

// **************Data Base Simulation***************
// Importer les Models 
const User = require("./models/user");
const Cours = require("./models/cours");
const user = require("./models/user");

// ************** BUSNISS LOGIC ***************
//  Busniss Logic : Get One users By Email or Tél
app.get("/users/one", (req, res) => {
    console.log("Here  into BL : Get All users");

    User.findOne({tel: req.body.tel , email: req.body.email}).then((doc) => { res.json({ user: doc }) });
});
//  Busniss Logic : Get All users
app.get("/users", (req, res) => {
    console.log("Here  into BL : Get All users");
    // res.json({teams: teamsData});
    User.find().then((users) => { res.json({ users: users }) });
});
//  Busniss Logic : Get All Teachers
app.get("/users/teachers", (req, res) => {
    console.log("Here  into BL : Get All Teachers");
   
    User.find({role:"teacher"}).then((users) => { res.json({ teachers: users }) });
});
//  Busniss Logic : Get All Students
app.get("/users/students", (req, res) => {
    console.log("Here  into BL : Get All Students");
   
    User.find({role:"student"}).then((users) => { res.json({ students: users }) });
});
//  Busniss Logic : signup
app.post("/users/signup", multer({ storage: storageConfig }).fields([{ name: "photo", maxCount: 1 }, { name: "cv", maxCount: 1 }]), (req, res) => {
    console.log("Here  into BL : signup ", req.body);
 
    bcrypt.hash(req.body.pwd, 8).then((cryptPwd) => {
        console.log("Here  crypted Pwd", cryptPwd);
        req.body.pwd = cryptPwd;

        if (req.body.role == "student") {
            req.body.photo = `http://localhost:3000/images/${req.files['photo'][0].filename}`;
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                pwd: req.body.pwd,
                tel: req.body.tel,
                photo: req.body.photo,
                adr: req.body.adr,
                role: req.body.role,
            });
            user.save((err, doc) => {
                if (err) {
                    res.json({ msg: " Failed" });
                } else {
                    res.json({ msg: " Added with successs" });
                }
            });

        } else if (req.body.role == "teacher") {
            req.body.cv = `http://localhost:3000/files/${req.files['cv'][0].filename}`;
            
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                pwd: req.body.pwd,
                tel: req.body.tel,
                status:req.body.status,
                cv: req.body.cv,
                adr: req.body.adr,
                role: req.body.role,
                speciality: req.body.speciality
            });
            user.save((err, doc) => {
                if (err) {
                    res.json({ msg: " Failed" });
                } else {
                    res.json({ msg: " Added with successs" });
                }
            });
                    }

        else if (req.body.role == "parent") {
        User.findOne({ tel: req.body.telStudent, role:"student" }).then((doc) =>{
                   if (!doc) {
                            res.json({ msg: " Please Verif your tel Child" });
                            }
                            else {
                                const user = new User({
                                    firstName: req.body.firstName,
                                    lastName: req.body.lastName,
                                    email: req.body.email,
                                    pwd: req.body.pwd,
                                    tel: req.body.tel,
                                    adr: req.body.adr,
                                    role: req.body.role,
                                    telStudent: req.body.telStudent
                    
                                });
                                user.save((err, doc) => {
                                    if (err) {
                                        res.json({ msg: " Failed" });
                                    } else {
                                        res.json({ msg: " Added with successs" });
                                    }
                                });
                            }
            });
           


        } else if (req.body.role == "admin") {

            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                pwd: req.body.pwd,
                tel: req.body.tel,
                adr: req.body.adr,
                role: req.body.role,


            });
            user.save((err, doc) => {
                if (err) {
                    res.json({ msg: " Failed" });
                } else {
                    res.json({ msg: " Added with successs" });
                }
            });
        }


    });

});
//  Busniss Logic : Login
app.post("/users/login", (req, res) => {

    // déclarer une variable pour sauvegatder un objet
    let result;
    console.log("Here  into BL : Login ", req.body);

    User.findOne({ $or: [{ email: req.body.email} ,{tel: req.body.tel }] }).then(

        (doc) => {
            console.log("Here  is the object after searching it by email or Tél: ", doc);

            if (!doc) {
                res.json({ msg: "Please check your Email or Tél !!!!" });

            } else {
                result = doc;
                bcrypt.compare(req.body.pwd, doc.pwd).then((pwdCompare) => {
                    console.log("Here  is the result of pwdCompare : ", pwdCompare);
                    if (pwdCompare) {
                        // If the user is valid, generate a JWT token
                        const token = jwt.sign({ 
                            fName: result.firstName, 
                            lName: result.lastName, 
                            status:result.status,
                            role: result.role, 
                            tel:result.tel, 
                            id: result._id },
                             secretKey, {expiresIn:   '1h'
                        });

                        res.json({ msg: "welcome", token: token })

                    } else {
                        res.json({ msg: "Please check your Pwd" })
                    }
                })
            }
            //   affecter obj à une variable result pour l'afficher hors arrow function

        })
});
// Busniss Logiv Add Cours
app.post("/cours", (req, res) => {
   
    console.log("Here  into BL : Add cours", req.body);
    
            const cours = new Cours({
                name: req.body.name,
                description: req.body.description,
                dure: req.body.dure,
                teacher: req.body.teacher,
            });
            console.log("Here Cours after create instance of Model Cours : ", cours);
            cours.save((err, doc) => {
                if (err) {
                    res.json({ msg: "Error" });
                } else {
                    
                    res.json({ msg: "Cours Added with success" });
                }
                });
        }
     
    );
//  Busniss Logic : Get All courses
app.get("/cours", (req, res) => {
    console.log("Here  into BL : Get All Courses");
  
    Cours.find().populate("teacher").then((docs) => { 
        console.log("Here cours with info : ", docs);
        res.json({ courses: docs }) });
});
//  Busniss Logic : Validate Teacher
app.put("/users/validateTeachers", (req, res) => {
    console.log("Here  into BL : Validate Teacher");

    let newStatus = req.body.status;
    
    User.updateOne({_id: req.body._id },newStatus).then((updateResponse) => {
        console.log("Here response after update", updateResponse);
        if (updateResponse.nModified == 1) {
            res.json({ isUpdated: true })
        } else {
            res.json({ isUpdated: false })
        }
    })
});
// Get Teachear by ID
app.get("/users/:id", (req, res) => {
    console.log("Here  into BL : Get  Teacher By ID");
       User.findOne({_id:req.params.id, role:"teacher"}).then((doc) =>{ res.json({ teacher: doc })});
});

app.post("/cours/affecteStudents", (req, res) => {
   
    console.log("Here  into BL : Affecte Students", req.body);

     User.findById({_id:req.body.studentId}).then((student)=>{

    Cours.findById({_id:req.body.coursId}).then((cours)=>{

    if (!student && !cours) {

        res.json({msg: "Student et Cours not Found "});

    } else {

        cours.students.push(req.body.studentId);

        cours.save()

         student.courses.push(req.body.coursId);

         student.save()
         res.json({msg: "Cours et Student affected with success"})

     
    }

    })

 })

  }
     
    );

//make app importable from another files
module.exports = app; 