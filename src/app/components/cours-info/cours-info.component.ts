import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';
import { NoteService } from 'src/app/services/note.service';
@Component({
  selector: 'app-cours-info',
  templateUrl: './cours-info.component.html',
  styleUrls: ['./cours-info.component.css']
})
export class CoursInfoComponent implements OnInit {
  cours:any={};
  id!:any;
  students:any=[];
  idCours:any;
  user:any={};
  note:any={};
  notes:any=[];

  constructor(private activateRoute:ActivatedRoute,
    private coursService: CoursService,
    private noteService: NoteService,
    private router :Router
    ) { }

  ngOnInit(): void {
    let token= sessionStorage.getItem("token");
    this.user = this.decodeToken(token);
    let idUser=this.user.id

    // Get Cours By ID
    this.id=this.activateRoute.snapshot.paramMap.get("id");


    this.coursService.getCoursById2(this.id).subscribe((result) => { 
      console.log("Here response from BE : ",result.cours);
      this.cours = result.cours 
      this.students=this.cours.students;
     
    this.idCours=this.cours._id;
    sessionStorage.setItem("idCours", this.idCours)
    });


   



  }
  delete(idCours:any){}

  DisplayNote(idCours:any){

    this.router.navigate([`detailsNote/${idCours}`])
  }
 decodeToken(token: any) {
    return jwt_decode(token);
  }
  coursColor(a:string){
   
    return "red"

}
goToEdit(){}
  goToDelete(){}
  goToDisplay(){}


}
