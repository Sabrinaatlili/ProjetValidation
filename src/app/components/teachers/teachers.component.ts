import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  @Input() teacherInput: any;
  imgTeacher!:String;
   constructor() { }

  ngOnInit(): void {
    //  this.imgTeacher=this.teacherInput.photo
  //  console.log(this.imgTeacher);
   

    
  }
 
  
  }


