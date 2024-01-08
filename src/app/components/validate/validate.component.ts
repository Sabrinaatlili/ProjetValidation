import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.css']
})
export class ValidateComponent implements OnInit {
  validateForm!:FormGroup;
  cvPreview: any;
  teacher:any={};
  idTeacher:any;
  id:any;
  test=true;
  errorMsg!: String;
 
  constructor(private userService: UserService,
  private router: Router,
  private activateRoute : ActivatedRoute) { }
  
    ngOnInit(): void {
      
       this.id = this.activateRoute.snapshot.paramMap.get("id");
    // this.idTeacher= sessionStorage.getItem("idTeacher");
    
       console.log(this.id);
      this.userService.getTeacherById(this.id).subscribe((data)=>{
        console.log("Here is Response from BE: ",data.teacher);
        this.teacher=data.teacher;
      })
    }
    validate(){
      console.log("Here is teacher to validate :",this.validateForm.value);
      console.log(this.validateForm.value);
      
      this.userService.Validate(this.validateForm.value).subscribe((result)=>{
        if (result) {
          this.router.navigate(['/dashboard'])
        } else {
          this.errorMsg= "Error in Editing"
        }
      })
      
    }
    
    
}
