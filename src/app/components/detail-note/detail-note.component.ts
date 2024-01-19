import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detail-note',
  templateUrl: './detail-note.component.html',
  styleUrls: ['./detail-note.component.css']
})
export class DetailNoteComponent implements OnInit {
  cours: any = {};
  id!: any;
  students: any = [];
  idCours: any;
  idNote: any;
  idUser: any;
  user: any = {};
  note: any = {};
  notes: any = [];
  teacher: any = {};
  msgError!: string;
  constructor(private coursService: CoursService,
    private noteService: NoteService,
    private userService: UserService,
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {

    let token = sessionStorage.getItem("token");
    this.user = this.decodeToken(token);
    this.idUser = this.user.id;

    this.idCours = sessionStorage.getItem("idCours")

    console.log(this.idCours);
    console.log(this.idUser);

    // Get Note By IdStudent
    this.userService.getStudentrById(this.idUser).subscribe((result) => 
    {
      console.log("Here response from BE : ", result.student);

          this.notes = result.student.notes;
          console.log(this.notes);
      // ******************
          
          // **************
          if (this.notes.length==0) {
            this.msgError="Student doesnt have a note yet "
          } else {

            for (let i = 0; i < this.notes.length; i++) {

              if (this.notes[i].coursId == this.idCours) {
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
          
          
          ;
       })

       
      // End og NgOnInit 
  }

  decodeToken(token: any) {
    return jwt_decode(token);
  }
}
