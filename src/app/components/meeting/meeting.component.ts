import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {
  teachers:any=[];
  constructor(private userService :UserService) { }
 
  ngOnInit(): void {
    this.userService.getAllTeachersValidate().subscribe((data)=>{ 
      console.log("here is response from BE ",data.teachers);
      
      this.teachers=data.teachers});
      
  }
  

}
