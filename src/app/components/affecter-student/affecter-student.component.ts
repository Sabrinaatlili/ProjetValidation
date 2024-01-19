import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-affecter-student',
  templateUrl: './affecter-student.component.html',
  styleUrls: ['./affecter-student.component.css']
})
export class AffecterStudentComponent implements OnInit {
  students: any=[];
  idStudent: any;
  courses: any=[];
  cours:any={}
  student:any={}
  idCours: any;
  msgError:any;
  affecterForm!:FormGroup;
  obj:any={};
  constructor(private coursService: CoursService,
    private userService : UserService,
    private router : Router) { }

  ngOnInit(): void {
 

    // Get all Students pour afficher dans select option

this.userService.getAllStudents().subscribe((data) => { this.students = data.students })
 // Get all couses pour afficher dans select option

  this.coursService.getAllCoursesToAffecte().subscribe((data) => { this.courses = data.courses })

  }
  
  affecter(){
   
    this.cours.coursId=this.idCours;
    this.student.studentId=this.idStudent;
    this.obj ={
      coursId :this.cours.coursId,
      studentId:this.student.studentId }

    this.coursService.affecterStudents(this.obj).subscribe((result)=>
    {
            console.log(result.msg);
          });
   
  }

  selectStudent(evt: any) {
    console.log("Here is event : ", evt.target.value);
    this.idStudent = evt.target.value;

  }
  selectCours(evt: any) {
    console.log("Here is event : ", evt.target.value);
    this.idCours = evt.target.value;

  }
}
