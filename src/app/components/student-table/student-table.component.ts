import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {
  students:any=[];
  constructor(private userService :UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.userService.getAllStudents().subscribe((data)=>{ 
      console.log("here is response from BE ",data.students);
      
      this.students=data.students})
      }
  
  goToEdit(id: any){

    this.router.navigate([`editUser/${id}`]);
  }
  goToDelete(id: any){}
  goToDisplay(id: any){
    this.router.navigate([`userInfo/${id}`]);
  }

}
