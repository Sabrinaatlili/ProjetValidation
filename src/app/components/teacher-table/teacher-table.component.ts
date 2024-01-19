import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teacher-table',
  templateUrl: './teacher-table.component.html',
  styleUrls: ['./teacher-table.component.css']
})
export class TeacherTableComponent implements OnInit {
  teachers: any = [];
  newStatus: String = "validate";
  errorMsg!: String;

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.userService.getAllTeachers().subscribe((data) => {
      console.log("here is response from BE ", data.teachers);

      this.teachers = data.teachers
    })
  }
  goToEdit(id: any) {
    this.router.navigate([`editUser/${id}`]);

  }
  goToDelete(id: any) {
  
    this.userService.delete(id).subscribe((response) => {
      console.log("Here response from BE ", response.msg);
      
    })
    this.router.navigate(['admin']);
  }
  goToDisplay(id: any) { 
    this.router.navigate([`userInfo/${id}`]); 

  }

  valider(id: any) {
    this.userService.Validate(id).subscribe((response) => {
      // console.log("teacher is validate", result.isUpdated);
      if (response.isUpdated) {
        this.router.navigate(['admin'])
      }
              
      })
   
  }
}