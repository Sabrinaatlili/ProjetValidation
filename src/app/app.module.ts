import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { CoursesComponent } from './components/courses/courses.component';
import { VideosComponent } from './components/videos/videos.component';
import { ServicesComponent } from './components/services/services.component';
import { MeetingComponent } from './components/meeting/meeting.component';
import { FactsComponent } from './components/facts/facts.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { AdminComponent } from './components/admin/admin.component';
import { AddCoursComponent } from './components/add-cours/add-cours.component';
import { TeacherTableComponent } from './components/teacher-table/teacher-table.component';
import { StudentTableComponent } from './components/student-table/student-table.component';
import { CoursTableComponent } from './components/cours-table/cours-table.component';
import { DashboardTeacherComponent } from './components/dashboard-teacher/dashboard-teacher.component';
import { ParentTableComponent } from './components/parent-table/parent-table.component';
import { DashboardStudentComponent } from './components/dashboard-student/dashboard-student.component';
import { SingleCoursComponent } from './components/single-cours/single-cours.component';
import { AffecterStudentComponent } from './components/affecter-student/affecter-student.component';
import { ValidateComponent } from './components/validate/validate.component';
import { EditTeacherComponent } from './components/edit-teacher/edit-teacher.component';
import { NoteComponent } from './components/note/note.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CoursesComponent,
    VideosComponent,
    ServicesComponent,
    MeetingComponent,
    FactsComponent,
    SignupComponent,
    LoginComponent,
    TeachersComponent,
    AdminComponent,
    AddCoursComponent,
    TeacherTableComponent,
    StudentTableComponent,
    CoursTableComponent,
    DashboardTeacherComponent,
    ParentTableComponent,
    DashboardStudentComponent,
    SingleCoursComponent,
    AffecterStudentComponent,
    ValidateComponent,
    EditTeacherComponent,
    NoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
