import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  user:any={};
  users:any=[];
   id!:any;
   @Input() teacherInput: any;
   imgTeacher!:String;
  constructor(private userService :UserService,
    private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.paramMap.get("id")
    this.userService.getOneUserById(this.id).subscribe((data)=>{ 
      console.log("here is response from BE ",data.user);
      
      this.user=data.user});
  }

}
