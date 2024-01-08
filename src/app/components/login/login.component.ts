import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  user: any = {};
  errorMsg : any;
  constructor( private userService:UserService,
    private router: Router ) { }

  ngOnInit(): void {
  }
  login(){
    
      console.log("here is my function logIn", this.user);
    
      // Condition Pour connaitre le type de login (Email ou Tél )
     
          console.log("here is my function logIn", this.user);
          
          // Appel du service pour envoyer au BE
  
      this.userService.login(this.user).subscribe((data) => {
  
        console.log("Here response from BE ", data.msg, data.token);
        
        
        if (data.token) {
          
          console.log("Here token before decoding  : ", data.token);
        
            // Save token into session Storage
            sessionStorage.setItem("token", data.token);

          let user: any = this.decodeToken(data.token);
            
         
          
          if (user.role == "student") {
            console.log("Here user/token after decoding : ", user);
            this.router.navigate(['dashboardStudent']);
          
          } else if (user.role == "teacher") {
            console.log("Here user/token after decoding : ", user);

            // if (user.status== 'validate') {
            
              this.router.navigate(['dashboardTeacher']);
          //  } else {
          //     this.errorMsg="Teacher not validate";
            // this.router.navigate(['dashboardTeacher']); 
          //  }


          } else if (user.role == "parent") {
            console.log("Here user/token after decoding : ", user);
            this.router.navigate(['dashboardTeacher']); 
          } else {
            console.log("Here user/token after decoding : ", user);
            this.router.navigate(['dashboard']);
          } 
        } else {
          this.errorMsg = data.msg;
        }
  
      });
  
    }
    decodeToken(token: string) {
      return jwt_decode(token);
    }
  }

