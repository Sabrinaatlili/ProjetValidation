import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  @Input() teacherInput: any;
   constructor() { }

  ngOnInit(): void {
   
  }
  
  }


