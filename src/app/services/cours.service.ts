import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursService {
 // déclaration du @destinataire 
 coursUrl: string="http://localhost:3000/cours";
  constructor(private httpClient: HttpClient) { }

  addCours(obj:any,img:File){
    let formData= new FormData;
    formData.append("name",obj.name);
    formData.append("description",obj.description);
    formData.append("dure",obj.dure);
    formData.append("teacher",obj.teacher);
    formData.append("img",img);

    return this.httpClient.post<{msg:any}>(this.coursUrl,formData);
  }
  getAllCourses(){
  
    return this.httpClient.get<{ courses: any }>(this.coursUrl);
}
getAllCoursesOfOneTeacher(id:any){
  
  return this.httpClient.get<{ courses: any}>( `${this.coursUrl+"/oneTeacher"}/${id}`);
}


getAllStudents(id:any){
  
  return this.httpClient.get<{ students: any }>(this.coursUrl+"/students");
}

getAllCoursesToAffecte(){
  
  return this.httpClient.get<{ courses: any }>(  this.coursUrl+"/toAffecte");
}
affecterStudents(obj:any){
  return this.httpClient.post<{msg:any}>(this.coursUrl+"/affecteStudents",obj);

}

getAllCoursesForOneStudent(id:any){
  
  return this.httpClient.get<{ courses: any }>(this.coursUrl+"/OneStudent");
}
getCoursById(id:any){
  return this.httpClient.get<{ cours: any }>(`${this.coursUrl}/${id}`);
}
getCoursById2(id:any){
  return this.httpClient.get<{ cours: any }>(`${this.coursUrl}/${id}`);
}
getAllStudentsSelectedByCours(idCours:any){
  
  return this.httpClient.get<{ students: any }>(this.coursUrl+"/studentsByCours");
}

}
