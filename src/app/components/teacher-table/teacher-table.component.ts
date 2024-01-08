import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teacher-table',
  templateUrl: './teacher-table.component.html',
  styleUrls: ['./teacher-table.component.css']
})
export class TeacherTableComponent implements OnInit {
  teachers:any=[];
  newStatus:String="validate";

    constructor(private userService :UserService,
      private router:Router) { }

  ngOnInit(): void {
    this.userService.getAllTeachers().subscribe((data)=>{ 
      console.log("here is response from BE ",data.teachers);
      
      this.teachers=data.teachers})
      }
 

  goToEdit(id:any){
    this.router.navigate([`editTeacher/${id}`]);
   
  }
  goToDelete(id:any){}
  goToDisplay(id:any){}
 
  valider(id:number){
    // sessionStorage.setItem("idTeacher",id)
 this.router.navigate([`validateTeacher/${id}`]);
      

    }
  }