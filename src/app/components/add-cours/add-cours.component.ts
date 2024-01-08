import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-add-cours',
  templateUrl: './add-cours.component.html',
  styleUrls: ['./add-cours.component.css']
})
export class AddCoursComponent implements OnInit {
  cours:any={};
  addCoursForm!: FormGroup;
  teacher:any={};
  teachers: any = [];
  msgError:any;

  constructor(private coursService: CoursService,
       private router : Router) { }

  ngOnInit(): void {

  }
  // Déclaration Méthode AddCours
  
  addCours(){
    console.log("here is my function add Cours", this.cours);

  let token= sessionStorage.getItem("token");
  let user: any = this.decodeToken(token);
  this.cours.teacher=user.id;

   this.coursService.addCours(this.cours).subscribe((result) => {
    console.log('Here is result of add Cours from BE : ', result.msg);
      });
      this.router.navigate(['dashboardTeacher']);
}
// déclaration Decodage token
  decodeToken(token: any) {
    return jwt_decode(token);
  }
}
