import { Component, OnInit } from '@angular/core';
import { CoursService } from 'src/app/services/cours.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses:any=[];
  constructor(private coursService :CoursService) { }

  ngOnInit(): void {
    this.coursService.getAllCourses().subscribe((data)=>{ 
      console.log("here is response from BE ",data.courses);
      
      this.courses=data.courses});
  }

}
