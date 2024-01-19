import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';
import { NoteService } from 'src/app/services/note.service';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  students: any=[];
  courses: any=[];
  idStudent: any;
  idCours: any;
  msgError!:string;
  cours:any={}
  course:any
  obj:any={}
  student:any={}
  idTeacher:any;
  user:any={};
    note:any={};
  constructor(private noteService: NoteService,
    private coursService: CoursService,
    private userService : UserService,
    private router : Router) { }

  ngOnInit(): void {
 
    let token= sessionStorage.getItem("token");
     this.user= this.decodeToken(token);
    this.idTeacher=this.user.id;
  
    // Get all cours bt teacher connected pour afficher dans select option
    this.coursService.getAllCoursesOfOneTeacher(this.idTeacher).subscribe((data) => { 
      
      this.courses = data.courses;

      console.log(this.courses);
           
      } );
     
    
   }
 
selectStudent(evt: any) {
    console.log("Here is event : ", evt.target.value);
    this.idStudent = evt.target.value;
   
  }
  selectCours(evt: any) {
    console.log("Here is event : ", evt.target.value);
    this.idCours = evt.target.value;


    this.coursService.getCoursById(this.idCours).subscribe((data) => { 
      
      this.students = data.cours.students;

      console.log(this.students);
  
    } );
    

   
  }

  
  affecterNote(){

    this.note.coursId=this.idCours;

    this.note.studentId=this.idStudent;
    

    this.noteService.addNote(this.note).subscribe((result)=>
    {
            console.log(result.msg);
          });
  }

  // déclaration Decodage token
  decodeToken(token: any) {
    return jwt_decode(token);
  }
}
