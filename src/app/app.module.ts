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
import { EditTeacherComponent } from './components/edit-teacher/edit-teacher.component';
import { NoteComponent } from './components/note/note.component';
import { DashboardParentComponent } from './components/dashboard-parent/dashboard-parent.component';
import { CoursInfoComponent } from './components/cours-info/cours-info.component';
import { DetailNoteComponent } from './components/detail-note/detail-note.component';
import { UniversityComponent } from './components/university/university.component';
import { SearchTeacherComponent } from './components/search-teacher/search-teacher.component';
import { SearchChildComponent } from './components/search-child/search-child.component';
import { UserInfoComponent } from './components/user-info/user-info.component';

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
    EditTeacherComponent,
    NoteComponent,
    DashboardParentComponent,
    CoursInfoComponent,
    DetailNoteComponent,
    UniversityComponent,
    SearchTeacherComponent,
    SearchChildComponent,
    UserInfoComponent
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
