import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
   // déclaration du @destinataire 
 noteUrl: string="http://localhost:3000/notes";

  constructor(private httpClient: HttpClient) { }

  addNote(obj:any){
     return this.httpClient.post<{msg:any}>(this.noteUrl,obj);
  }

  getMyNote(idNote:any){
    return this.httpClient.get<{ note: any,msg: any }>(`${this.noteUrl+"/myNote"}/${idNote}`);
  }

  getNoteChildToParent(obj:any){
    return this.httpClient.post<{ note:any }>(this.noteUrl+"/noteParent",obj)
   }
}
