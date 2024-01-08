import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  // déclaration du @destinataire 
userUrl: string="http://localhost:3000/users";

  constructor(private httpClient: HttpClient) { }
  
  login(user:any){
    return this.httpClient.post<{msg : any, token:string}>(this.userUrl +"/login", user);
  }
   
  getAllUsers(){
  
      return this.httpClient.get<{ users: any }>(this.userUrl);

  }
  
  getOneUser(){
  
    return this.httpClient.get<{ user: any }>(this.userUrl+"/one");
}
getTeacherById(id:any){
  return this.httpClient.get<{ teacher: any }>(`${this.userUrl}/${id}`);
}
Validate(obj:any){
  
  return this.httpClient.put<{ isUpdated: any }>(this.userUrl+"/validateTeachers",obj);
 
  }
  getAllTeachers(){
  
    return this.httpClient.get<{ teachers: any }>(this.userUrl+"/teachers");
}
getAllStudents(){
  
  return this.httpClient.get<{ students: any }>(this.userUrl+"/students");
}

  signup(user:any, photo:File, cv:File){
    let formData= new FormData;
    formData.append("firstName",user.firstName);
    formData.append("lastName",user.lastName);
    formData.append("tel",user.tel);
    formData.append("adr",user.adr);
    formData.append("email",user.email);
    formData.append("pwd",user.pwd);
    formData.append("role",user.role);
    

    if (user.role==="teacher") {
      formData.append("speciality",user.speciality);
      formData.append("cv",cv);
      formData.append("status",user.status);
      
    } else if (user.role==="student") {
       formData.append("photo",photo);
    } else if(user.role==="parent"){
       formData.append("telStudent",user.telStudent);
    }
       
    return this.httpClient.post<{ msg: any }>(this.userUrl +"/signup", formData);
  }

  editProfile(user:any){
    return this.httpClient.put(this.userUrl, user);
  }
 
}
