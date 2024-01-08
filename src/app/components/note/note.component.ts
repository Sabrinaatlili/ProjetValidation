import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';
import { UserService } from 'src/app/services/user.service';

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
  note:any={};
  constructor(private coursService: CoursService,
    private userService : UserService,
    private router : Router) { }

  ngOnInit(): void {
    
    // Get all Students pour afficher dans select option

this.userService.getAllStudents().subscribe((data) => { this.students = data.students })
// Get all couses pour afficher dans select option

this.coursService.getAllCourses().subscribe((data) => { this.courses = data.courses })
 }
  
  selectStudent(evt: any) {
    console.log("Here is event : ", evt.target.value);
    this.idStudent = evt.target.value;

  }
  selectCours(evt: any) {
    console.log("Here is event : ", evt.target.value);
    this.idCours = evt.target.value;

  }
  affecterNote(){}

}
