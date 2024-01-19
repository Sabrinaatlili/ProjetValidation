import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { NoteService } from 'src/app/services/note.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-child',
  templateUrl: './search-child.component.html',
  styleUrls: ['./search-child.component.css']
})
export class SearchChildComponent implements OnInit {
  courses:any=[];
  user:any={};
  msgError!:String;
test=false;
student:any={};
childSearchForm!:FormGroup;
cours:any=[];
errorMsg:string="";
courId:any={};
students:any=[]
tel:any;
note:any={}
obj ={
idCours :'',
idUser :''
}
teacher:any={};
idUser:any
notes: any=[]
idNote: any;

  constructor(private router:Router,private userService:UserService, private noteService:NoteService) { }

  ngOnInit(): void {

    this.user={tel:''}
    console.log(this.user);

  }
  
  search(){
    this.tel = this.user.tel;
    this.user.tel=this.tel;
    console.log(this.user);
    
    
  
    this.userService.searchChildByTel(this.user).subscribe((response) =>
     {
      console.log("here response from BE", response.student);
     

        if (response.student) {
          this.notes= response.student.notes
         
          // this.courId = response.student.cour._id
          if (this.notes.length== 0 ) {
            this.errorMsg = 'Student doesnt have a note yet';
          } else {
            // this.notes=response.student.notes;
            this.courses = response.student.courses
             this.test=true;
            // for (let j = 0; j < this.courses.length; j++) {

            //   // for (let i = 0; i < this.notes.length; i++) {
            //     // if (this.courses[j]._id==this.notes[i].coursId) {
            //       this.obj.idCours= this.courses[j]._id;
            //       this.obj.idUser = response.student._id
            //       this.noteService.getNoteChildToParent(this.obj).subscribe((data)=>{
            //         console.log("here response from BE Get note parent",data);
            //         this.note= data.note;
            //         console.log(this.note);
                    
            //       })

            //     // }
                
            //   // }
  
                
            // }
            for (let j = 0; j < this.courses.length; j++) {
               for (let i = 0; i < this.notes.length; i++) {
              
                if (this.courses[j]._id == this.notes[i].coursId ) {
                  this.idNote = this.notes[i]._id;

                  this.noteService.getMyNote(this.idNote).subscribe((data) => 
                  {
                      console.log("Here response from BE : ", data.note);

                      this.note = data.note;

                      this.userService.getTeacherById(this.note.coursId.teacher)
                      .subscribe((data) => 
                          {
                            console.log("Here response from BE : ", data.teacher);
                            this.teacher = data.teacher;
                          });
            
                    });
                  }
                
              }

             
              }
                 
            }
          
        } else {
          this.errorMsg = 'Student not found';
        }
         });
  }
  edit(idCours:number){}
  delete(idCours:number){}
  
  display(idCours:number){
  
      this.router.navigate([`coursInfo/${idCours}`])

  }
}
