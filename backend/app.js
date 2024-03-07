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
// Config Multer Photo-CV Student
const storageConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        let path = 'backend/images';
        if (file.mimetype.startsWith('image/')) {
            path = 'backend/images'; // Images go to the images directory
        } else {
            path = 'backend/files'; // Non-image files go to the files directory
        }

        // if (req.body.role == "teacher") {

        //     pathImg='backend/images';
        //   let  path = 'backend/files' ;

        // }

        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, path, path)
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
// Config Multer image Cours
const storageConfigCours = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        let path = 'backend/images';

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
        const imgNameCours = name + '-' + Date.now() + '-crococoder-' + '.' + extension;
        cb(null, imgNameCours);
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
const Note = require("./models/note");
const { log } = require("console");
// ************** BUSNISS LOGIC ***************
//  Busniss Logic : Get One users By Email or Tél
app.get("/users/one", (req, res) => {
    console.log("Here  into BL : Get All users");

    User.findOne({ tel: req.body.tel, email: req.body.email }).then((doc) => { res.json({ user: doc }) });
});
//  Busniss Logic : Get One users By Email or Tél
app.get("/users/oneById/:id", (req, res) => {
    console.log("Here  into BL : Get All users");

    User.findById(req.params.id).then((doc) => { res.json({ user: doc }) });
});
//  Busniss Logic : Get All users
app.get("/users", (req, res) => {
    console.log("Here  into BL : Get All users");
    // res.json({teams: teamsData});
    User.find().then((users) => { res.json({ users: users }) });
});
//  Busniss Logic :  Validate Teacher
app.get("/users/validateTeacher/:id", (req, res) => {
    console.log("Here  into BL : Validate Teacher");

    User.updateOne({ _id:req.params.id  },{status: "validate"}).then((updateResponse) => {
        console.log("Here response after update", updateResponse);
        if (updateResponse.nModified == 1) {
            res.json({ isUpdated: true });
        } else {
            res.json({ isUpdated: false });
        }
    })
});
//  Busniss Logic : Get All Teachers Validate
app.get("/users/teachersValidate", (req, res) => {
    console.log("Here  into BL : Get All Teachers");

    User.find({ role: "teacher", status: "validate" }).then((users) => { res.json({ teachers: users }) });
});
//  Busniss Logic : Get All Teachers By Speciality
app.post("/users/teachersBySpeciality", (req, res) => {
    console.log("Here  into BL : Get All Teachers By Speciality");
    console.log(req.body);

    User.find({ role: "teacher", status: "validate", speciality:req.body.speciality }).then((users) => {
     
        res.json({ teachers: users }) 
   
        });
});
//  Busniss Logic : Get All Teachers
app.get("/users/teachers", (req, res) => {
    console.log("Here  into BL : Get All Teachers");

    User.find({ role: "teacher" }).then((users) => { res.json({ teachers: users }) });
});
//  Busniss Logic : Get All Students
app.get("/users/students", (req, res) => {
    console.log("Here  into BL : Get All Students");

    User.find({ role: "student" }).then((users) => { res.json({ students: users }) });
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
            req.body.photo = `http://localhost:3000/images/${req.files['photo'][0].filename}`;
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                pwd: req.body.pwd,
                tel: req.body.tel,
                status: req.body.status,
                cv: req.body.cv,
                adr: req.body.adr,
                role: req.body.role,
                speciality: req.body.speciality,
                photo: req.body.photo,
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
            User.findOne({ tel: req.body.telStudent, role: "student" }).then((doc) => {
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
    let username;
    const login = req.body.login;
    if (login.includes('@')) {

        // L'entrée est un e-mail
        username = { email: login };
    } else {
        // L'entrée est un numéro de téléphone
        username = { tel: login };
    }


    User.findOne(username).then(

        (doc) => {
            console.log("Here  is the object after searching it by email or Tél: ", doc);
            if (!doc) {
                res.json({ msg: "Please check your Email" })
            } else {
                if ((doc.role == "teacher") && (doc.status == "not validate")) {
                    res.json({ msg: " Teacher not validate   !!!!" });
                } else {
                    result = doc;
                    bcrypt.compare(req.body.pwd, doc.pwd).then((pwdCompare) => {
                        console.log("Here  is the result of pwdCompare : ", pwdCompare);
                        if (pwdCompare) {
                            // If the user is valid, generate a JWT token
                            const token = jwt.sign({
                                fName: result.firstName,
                                lName: result.lastName,
                                status: result.status,
                                role: result.role,
                                tel: result.tel,
                                id: result._id
                            },
                                secretKey, {
                                    expiresIn: '1h'
                            });

                            res.json({ msg: "welcome", token: token })

                        } else {
                            res.json({ msg: "Please check your Pwd" })
                        }
                    })
                }

            }

        })
});
// Busniss Logic Add Cours
app.post("/cours", multer({ storage: storageConfigCours }).single("img"), (req, res) => {

    console.log("Here  into BL : Add cours", req.body);
    req.body.img = `http://localhost:3000/images/${req.file.filename}`;
    const cours = new Cours({
        name: req.body.name,
        description: req.body.description,
        dure: req.body.dure,
        teacher: req.body.teacher,
        img: req.body.img
    });
    console.log("Here Cours after create instance of Model Cours : ", cours);
    cours.save((err, doc) => {
        if (err) {
            res.json({ msg: "Error" });
        } else {

            res.json({ msg: "Cours Added with success" });
        }
    });

});

//  Busniss Logic : Get All courses with teacher info
app.get("/cours/oneTeacher/:id", (req, res) => {
     let tab1 =[];
    console.log("Here  into BL : Get All Courses to One teacher");


    Cours.find({ teacher: req.params.id }).populate("teacher").then((docs) => {
       
        
        console.log("Here cours with info : ", docs);
        res.json({ courses: docs})
    });
});

//  Busniss Logic : Get All courses with teacher info
app.get("/users/myCourses/:id", (req, res) => {
    console.log("Here  into BL : Get my Courses  ");
    console.log(req.params.id);

    User.findById(req.params.id).populate("courses").then((doc) => {
        console.log("Here after searching Student", doc);
        res.json({ user: doc })
    })


});

//  Busniss Logic : Get All courses 
app.get("/cours", (req, res) => {
    console.log("Here  into BL : Get All Courses");

    Cours.find().populate("teacher").then((docs) => {
        console.log("Here cours with info : ", docs);
        res.json({ courses: docs })
    });
});
//  Busniss Logic : Get All courses 
app.get("/cours/toAffecte", (req, res) => {
    console.log("Here  into BL : Get All Courses");

    Cours.find().then((docs) => {
        console.log("Here cours with info : ", docs);
        res.json({ courses: docs })
    });
});

// Get Teachear by ID
app.get("/users/:id", (req, res) => {
    console.log("Here  into BL : Get  Teacher By ID");
    User.findOne({ _id: req.params.id, role: "teacher" }).then((doc) => { res.json({ teacher: doc }) });
});
// Get student by ID
app.get("/users/student/:id", (req, res) => {
    console.log("Here  into BL : Get  Teacher By ID");
    User.findOne({ _id: req.params.id, role: "student" }).populate("courses").populate("notes").then((doc) => { res.json({ student: doc }) });
});
//  Busniss Logic : delete User (Teacher, Student, Parent)
app.delete("/users/:id", (req, res) => {
    console.log("Here  into BL : delete User");
    User.deleteOne({ _id: req.params.id }).then((deletedResponse) => {
        console.log("Here respose after Delete User", deletedResponse);
        if (deletedResponse.deletedCount == 1) {
            res.json({ msg: "User has been deleted" })
        } else {
            res.json({ msg: "User has not deleted" })
        }

    });
});
// Affecter Students To Courses
app.post("/cours/affecteStudents", (req, res) => {

    console.log("Here  into BL : Affecte Students", req.body);

    User.findById(req.body.studentId).then((student) => {

        Cours.findById(req.body.coursId).then((cours) => {

            if (!(student && cours)) {
                res.json({ msg: "Student et Cours not Found " });

            } else {
                cours.students.push(req.body.studentId);
                cours.save()
                student.courses.push(cours._id);
                student.save()
                res.json({ msg: "Cours et Student affected with success" })

            }
        })
    })

});
//Add note to Student in one Cours
app.post("/notes", (req, res) => {

    console.log("Here  into BL : Add Note", req.body);

    Cours.findById({ _id: req.body.coursId }).populate("students").then((cours) => {


        User.findById({_id:req.body.studentId}).then((student) => {

            
            
            if ((student && cours)) {

                const note = new Note({
                    note: req.body.note,
                    evaluation: req.body.evaluation,
                    coursId: cours._id,
                    studentId: student._id,
                })
                note.save((err, doc) => {
                        if (err) {
                            res.json({ msg: "failed to add note" })
                        } else {
                        
                            student.notes.push(doc._id);
                            student.save();
                            res.json({ msg: "Note is affected to student with success" })
                        }
                    });


               
            } else {
                res.json({ msg: "Student et/ou  Cours not Found " });

            }
        })

    });
});

// Get all Notes
app.get("/notes", (req, res) => {
    console.log("Here  into BL : Get  All Notes");
   
    Note.find().then((docs)=>{
         console.log(docs);
        res.json({ notes: docs })
    })
 });
 // Get Note By id
app.get("/notes/myNote/:id", (req, res) => {
    console.log("Here  into BL : Get  Note By Id");


    Note.findById(req.params.id).populate("coursId").populate("teacher").then((doc) => {
        console.log("Here B searching Student", doc);
        if (!doc) {
            res.json({ msg: "No Note Affected" })
        } else {
            res.json({ note: doc })
        }

       

    })
  });

// Get ALL Cours By Id
app.get("/cours/oneStudent", (req, res) => {

   
    console.log("Here  into BL : Get All Courses affected to One student : ");

    Cours.find().then((docs) => {
        console.log(docs);

        res.json({ courses: data })
    });
});
//  Busniss Logic : Get  Cours By Id
app.get("/cours/:id", (req, res) => {
    console.log("Here  into BL : Get  Cours By ID");

    Cours.findById(req.params.id).populate("students").then((doc) => { res.json({ cours: doc }) });
});
// Get ALL Students from courses teacher connected By Id
app.get("/cours/students", (req, res) => {

    console.log("Here  into BL : Get All Courses affected to One student : ");

    Cours.find({ teacher: req.body.id }).populate("teacher").then((docs) => {
        console.log(docs);

        res.json({ courses: data })
    });
});

//  Busniss Logic : Get All  stusents Cours
app.get("/cours/studentsByCours", (req, res) => {
    console.log("Here  into BL : Get All Students");
    console.log(req.body.idCours);
    Cours.find(req.body.idCours).then((doc) => { res.json({ students: doc.students }) });
});

//  Busniss Logic : university Api
app.post("/universities",(req,res)=>{
    console.log("here into BL",req.body);
   let apiUrl ="http://universities.hipolabs.com/search" 
   axios.get(apiUrl, { params: {  country: req.body.country } })
   .then((response) => {
       console.log("here API response", response.data);
       if (response.data.length > 0) {
        const firstUniversity = response.data[0];
      
        const universitiesToSend = {
            name: firstUniversity.name,
            country: firstUniversity.country,
            domains: firstUniversity.domains
        }
      
        res.json({ result: universitiesToSend });
       
       }
     
   })
})
// Search child By tél
app.post("/users/searchChild",(req,res)=>{
    console.log("Here into BL : Search child By tél :", req.body.telEnfant);
    console.log("Tel Child :", req.body.telEnfant);

    User.findOne({tel: req.body.tel,role:"student"}).populate("courses").populate("notes").then((doc)=>{
          console.log("Réponse de la base de données:", doc);
     res.json({student : doc})
    })

});
// business logic : Get Note To Parent
app.post("/notes/noteParent",(req,res)=>{
    console.log("here to business logic : get note Parent",req.body);
    console.log(req.body.idCours);
    console.log(req.body.idUser);

    Note.findOne({courId:req.body.idCours, studentId:req.body.idUser}).then((doc) => 
    {
        console.log(doc);
        res.json({ note: doc });
    })
});
//  Busniss Logic : Edit Profile User
app.put("/users", (req, res) => {
    console.log("Here  into BL : Edit User");
    let newUser = req.body;
    log
      User.updateOne({ _id: req.body._id }, newUser).then((updateResponse) => {
        console.log("Here response after update", updateResponse);
        if (updateResponse.nModified == 1) {
            res.json({ isUpdated: true });
        } else {
            res.json({ isUpdated: false });
        }
    })
});


//make app importable from another files
module.exports = app; 