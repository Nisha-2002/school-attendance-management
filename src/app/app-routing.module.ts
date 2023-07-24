import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AttendanceRecordingComponent } from './attendance-recording/attendance-recording.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { NavComponent } from './admin-dashboard/nav/nav.component';
import { StudentDashComponent } from './parent-dashboard/dash/dash.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { NavComponentTeacher } from './teacher-dashboard/nav/nav.component';
const routes: Routes = [{
  path:"login",
  component: LoginComponent
},
{
  path:"",
  redirectTo: "login",
  pathMatch:"full"
},
{
  path: "teacher-dashboard",
  component: NavComponentTeacher
},
{
  path:"dashboard",
  component: DashboardComponent
},
{
  path:"nav",
  component: NavComponent
},
{
  path:"student-dashboard",
  component: StudentDashComponent
},
{
  path:"admin-dashboard",
  component: NavComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
