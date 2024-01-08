import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css']
})
export class EditTeacherComponent implements OnInit {

    validateForm!:FormGroup;
    cvPreview: any;
    teacher:any={};
    id!:any;
    test=true;
    errorMsg!: String;
  
    constructor(private userService: UserService,
    private router: Router,
    private activatedRoute : ActivatedRoute) { }
  
    ngOnInit(): void {
      this.id= this.activatedRoute.snapshot.paramMap.get("id");
       
  
      this.userService.getTeacherById(this.id).subscribe((data)=>{
        console.log("Here is Response from BE: ",);
        this.teacher=data.teacher;
      })
    }
  
    
  
    Edit(){
    
    }
  }

