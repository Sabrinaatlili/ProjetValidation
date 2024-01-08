import { Component, OnInit } from '@angular/core';
import { CoursService } from 'src/app/services/cours.service';

@Component({
  selector: 'app-cours-table',
  templateUrl: './cours-table.component.html',
  styleUrls: ['./cours-table.component.css']
})
export class CoursTableComponent implements OnInit {
  courses:any=[];
  constructor(private coursService: CoursService) { }

  ngOnInit(): void {
    this.coursService.getAllCourses().subscribe((data)=>{ 
      console.log("here is response from BE Get All Courses ",data.courses);
      
      this.courses=data.courses})
      

  }
  edit(){}
  delete(){}
  display(){}
 

}
