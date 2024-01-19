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
    getOneUser(id:any){
  
    return this.httpClient.get<{ user: any }>(this.userUrl+"/one");
}
getOneUserById(id:any){
  
  return this.httpClient.get<{ user: any }>(`${this.userUrl}/oneById/${id}`);
}
getTeacherById(id:any){
  return this.httpClient.get<{ teacher: any }>(`${this.userUrl}/${id}`);
}
getStudentrById(id:any){
  return this.httpClient.get<{ student: any }>(`${this.userUrl}/student/${id}`);
}
Validate(id:any){
  
  return this.httpClient.get<{ isUpdated: boolean }>(`${this.userUrl}/validateTeacher/${id}`);
 
  }
  getAllTeachers(){
  
    return this.httpClient.get<{ teachers: any }>(this.userUrl+"/teachers");
}
getAllTeachersValidate(){
  
  return this.httpClient.get<{ teachers: any }>(this.userUrl+"/teachersValidate");
}
// get Teachers By Speciality
getTeachersBySpeciality(teacher: any){
  
  return this.httpClient.post<{ teachers: any}>(this.userUrl+"/teachersBySpeciality",teacher);
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
      formData.append("photo",photo);
      formData.append("status",user.status);
      
    } else if (user.role==="student") {
       formData.append("photo",photo);
    } else if(user.role==="parent"){
       formData.append("telStudent",user.telStudent);
    }
       
    return this.httpClient.post<{ msg: any }>(this.userUrl +"/signup", formData);
  }

  editProfile(user:any){
    return this.httpClient.put<{ isUpdated: any }>(this.userUrl, user);
  }
  delete(id:any){
    return this.httpClient.delete<{msg:any}>(`${this.userUrl}/${id}`);
  }
  getMycourses(id:any){
  
    return this.httpClient.get<{ user: any }>( `${this.userUrl+"/myCourses"}/${id}`);
  }
   
  searchChildByTel(user:any){
    return this.httpClient.post<{student:any}>(this.userUrl+"/searchChild",user)
  }


}
