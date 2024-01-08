import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursService {
 // déclaration du @destinataire 
 coursUrl: string="http://localhost:3000/cours";
  constructor(private httpClient: HttpClient) { }

  addCours(obj:any){
    return this.httpClient.post<{msg:any}>(this.coursUrl,obj);
  }
  getAllCourses(){
  
    return this.httpClient.get<{ courses: any }>(this.coursUrl);
}
affecterStudents(obj:any){
  return this.httpClient.post<{msg:any}>(this.coursUrl+"/affecteStudents",obj);

}


}
