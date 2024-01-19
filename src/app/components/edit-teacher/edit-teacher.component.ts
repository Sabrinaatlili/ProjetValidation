import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css']
})
export class EditTeacherComponent implements OnInit {

    validateForm!:FormGroup;
    cvPreview: any;
    newObj:any={};
    id!:any;
    test=true;
    errorMsg!: String;
    user:any={};
    userConnected:any={};
  
    constructor(private userService: UserService,
    private router: Router,
    private activatedRoute : ActivatedRoute) { }
  
    ngOnInit(): void {

        // Save token into session Storage
              
      let token= sessionStorage.getItem("token");
      this.userConnected= this.decodeToken(token);
      console.log(this.userConnected);
      this.id=this.userConnected.id;
      
   
  
      this.userService.getOneUserById(this.id).subscribe((data)=>{
        console.log("Here is Response from BE: ",);
        this.user=data.user;
      })

  
      
    }
  
    Edit(){
      console.log("Here is User to edit :",this.newObj);
    this.userService.editProfile(this.newObj).subscribe((result)=>{
      if (result.isUpdated) {
        this.router.navigate(['admin'])
      } else {
        this.errorMsg= "Error in Editing"
      }
    })
  }

  decodeToken(token: any) {
    return jwt_decode(token);
  }
  
    
    }


