import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  test=true;
  imagePreview: any;
  cvPreview: any;
  path!: string;
  msgError!: string;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {

      this.path = this.router.url;

      this.signupForm = this.formBuilder.group({
        firstName: ["", [Validators.required, Validators.minLength(5)]],
        lastName: ["", [Validators.required, Validators.minLength(5)]],
        adr: ["", [Validators.required, Validators.minLength(5)]],
        tel: ["", [Validators.required, Validators.minLength(8)]],
        email: ["", [Validators.required, Validators.email]],
        pwd: ["", [Validators.required, Validators.minLength(8)]],
        confirmPwd: ["", [Validators.required]]        
      });
        // Appel de la méthode
      this.addControlsBasedOnPath();
    }
    // Déclaration une méthode  pour ajouter des attributs au form selon path
    private addControlsBasedOnPath(): void {

      if (this.path === "/student") {
        this.signupForm.addControl('photo', new FormControl(""));
      } else if (this.path === "/parent") {
        this.signupForm.addControl('telStudent', new FormControl("", [Validators.required, Validators.minLength(8)]));
   
      } else if (this.path === "/teacher") {
        this.signupForm.addControl('speciality', new FormControl("", [Validators.required, Validators.minLength(5)]));
        this.signupForm.addControl('cv', new FormControl(""));
      
         }
    
        
    }

  signup() {
    console.log("here is my function sign up after click ", this.signupForm.value);
    if (this.path == "/student") {
      this.signupForm.value.role = "student"
    } else if (this.path == "/parent") {
      this.signupForm.value.role = "parent"
    } else if (this.path == "/teacher") {
      this.signupForm.value.role = "teacher";
      this.signupForm.value.status = "not validate";
    } else {
      this.signupForm.value.role = "admin"
    } 
       //  form Template Diven Form 
    this.userService.signup(this.signupForm.value, this.signupForm.value.photo, this.signupForm.value.cv).subscribe((result)=>{
      console.log("Here is response from BE ",result.msg);
      this.msgError=result.msg;
                 
    });
    this.router.navigate(['']);

    }
   
    matchPwd(){
      let pwd=this.signupForm.value.pwd;
      let confirmPwd=this.signupForm.value.confirmPwd;
  
      if (confirmPwd!="") {
         this.test=false;
        if (pwd==confirmPwd) {
            this.test=true;
             } else {
             this.test=false;
          } 
        }
  
    }
 
  onImageSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = (fileInput.files as FileList)[0];
    this.signupForm.patchValue({ photo: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }

  onCvSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = (fileInput.files as FileList)[0];
    this.signupForm.patchValue({ cv: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.cvPreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }
}
