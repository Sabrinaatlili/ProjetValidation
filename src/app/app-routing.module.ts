import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CoursesComponent } from './components/courses/courses.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { MeetingComponent } from './components/meeting/meeting.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddCoursComponent } from './components/add-cours/add-cours.component';
import { DashboardTeacherComponent } from './components/dashboard-teacher/dashboard-teacher.component';
import { DashboardStudentComponent } from './components/dashboard-student/dashboard-student.component';
import { AffecterStudentComponent } from './components/affecter-student/affecter-student.component';

import { NoteComponent } from './components/note/note.component';
import { DashboardParentComponent } from './components/dashboard-parent/dashboard-parent.component';
import { CoursInfoComponent } from './components/cours-info/cours-info.component';
import { DetailNoteComponent } from './components/detail-note/detail-note.component';
import { UniversityComponent } from './components/university/university.component';
import { SearchTeacherComponent } from './components/search-teacher/search-teacher.component';
import { SearchChildComponent } from './components/search-child/search-child.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { EditTeacherComponent } from './components/edit-teacher/edit-teacher.component';



const routes: Routes = [
// http://localhost:4200: url de base
{path:"",component:HomeComponent},
{path:"login",component:LoginComponent},
{path:"subscription",component:SignupComponent},
{path:"signupAdmin",component:SignupComponent},
{path:"courses",component:CoursesComponent},
{path:"meeting",component:MeetingComponent},
{path:"teachers",component:TeachersComponent},
{path:"admin",component:AdminComponent},
{path:"dashboardTeacher",component:DashboardTeacherComponent},
{path:"dashboardStudent",component:DashboardStudentComponent},
{path:"dashboardParent",component:DashboardParentComponent},
{path:"addCours",component:AddCoursComponent},
{path:"teacher",component:SignupComponent},
{path:"student",component:SignupComponent},
{path:"parent",component:SignupComponent},
{path:"affecterStudent",component:AffecterStudentComponent},
{path:"editUser",component:EditTeacherComponent},
{path:"affecterNote",component:NoteComponent},
{path:"coursInfo/:id",component:CoursInfoComponent},
{path:"detailsNote/:id",component:DetailNoteComponent},
{path:"university",component:UniversityComponent},
{path:"searchTeacherBySpeciality",component:SearchTeacherComponent},
{path:"searchStudentByTel",component:SearchChildComponent},
{path:"userInfo/:id",component:UserInfoComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
