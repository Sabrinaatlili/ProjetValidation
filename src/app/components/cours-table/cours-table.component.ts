import { Component, OnInit } from '@angular/core';
import { CoursService } from 'src/app/services/cours.service';
import jwt_decode from 'jwt-decode';

import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cours-table',
  templateUrl: './cours-table.component.html',
  styleUrls: ['./cours-table.component.css']
})
export class CoursTableComponent implements OnInit {
  courses:any=[];
  idCours:any;
  id:any;
  user:any={};

  constructor(private coursService: CoursService,
    private userService : UserService,
    private router : Router) { }

  ngOnInit(): void {
    
    let token= sessionStorage.getItem("token");
    let user: any = this.decodeToken(token);
    this.id=user.id;

    console.log(user.id);
    // check role of user connected
if (user.role=="admin") {
  this.coursService.getAllCourses().subscribe((data)=>{ 
    console.log("here is response from BE Get All Courses ",data.courses);
    
    this.courses=data.courses})
} else if (user.role=="teacher") {
  this.coursService.getAllCoursesOfOneTeacher(this.id).subscribe((data)=>{ 
    console.log("here is response from BE Get All Courses ",data.courses);
    
    this.courses=data.courses})
} else if (user.role=="student") {
  this.userService.getMycourses(this.id).subscribe((data)=>{ 
    console.log("Here is response from BE Get All My Courses ",data.user);
    
    this.courses=data.user.courses;
  
  })
} else {
  
}
      

  }
  decodeToken(token: any) {
    return jwt_decode(token);
  }
  edit(idCours:number){}
  delete(idCours:number){}
  
  display(idCours:number){
  
      this.router.navigate([`coursInfo/${idCours}`])

  }
 

}
