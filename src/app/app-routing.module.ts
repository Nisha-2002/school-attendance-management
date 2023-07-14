import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AttendanceRecordingComponent } from './attendance-recording/attendance-recording.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { NavComponent } from './nav/nav.component';

const routes: Routes = [{
  path:"login",
  component: LoginComponent
},
{
  path: "attendance",
  component: AttendanceRecordingComponent
},
{
  path:"dashboard",
  component: DashboardComponent
},
{
  path:"nav",
  component: NavComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
