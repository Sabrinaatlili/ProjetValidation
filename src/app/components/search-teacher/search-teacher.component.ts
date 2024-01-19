import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-teacher',
  templateUrl: './search-teacher.component.html',
  styleUrls: ['./search-teacher.component.css']
})
export class SearchTeacherComponent implements OnInit {
searchTeacher!:FormGroup;
teacher:any={};
obj:any={};
teachers:any=[];
speciality!:String;
msgError!:String;
test=false;
  constructor(private formBuilder:FormBuilder,
    private userService :UserService) { }

  ngOnInit(): void {
   
    this.teacher = { speciality: '' };
     console.log(this.teacher);
    
  }
  search(){
   
    this.speciality=this.teacher.speciality
    console.log(this.speciality);
    this.teacher.speciality=this.speciality
    
    this.userService.getTeachersBySpeciality(this.teacher).subscribe((data)=>{ 
      console.log("here is response from BE Get Teachers By Speciality:  ",data.teachers);
     
       if (data.teachers.length==0) {
        this.msgError="Oups  No Teachers With this Speciality";
        
       } else {
        this.teachers=data.teachers
        this.test=true;
       }
     
    });
      
  }
  }

