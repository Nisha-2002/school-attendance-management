import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormControl, FormGroup, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './admin-dashboard/nav/nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DashComponent } from './dash/dash.component';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AdminDashComponent } from './admin-dashboard/dash/dash.component';
import { CalendarComponent } from './reusable-components/calendar/calendar.component';
import { ChartComponent } from './reusable-components/chart/chart.component';
import { NumberCardsComponent } from './reusable-components/number-cards/number-cards.component';
import { SearchBarComponent } from './reusable-components/search-bar/search-bar.component';
import { StudentCardComponent } from './reusable-components/student-card/student-card.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { AttendanceRecordingComponent } from './teacher-dashboard/attendance-recording/attendance-recording.component';
import { StudentDashComponent } from './parent-dashboard/dash/dash.component';
import { GlobalService } from './services/others/global.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AttendanceRecordingComponent,
    DashboardComponent,
    NavComponent,
    DashComponent,
    StudentDashComponent,
    AdminDashComponent,
    CalendarComponent,
    ChartComponent,
    NumberCardsComponent,
    SearchBarComponent,
    StudentCardComponent

  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    AgGridModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatToolbarModule,
    MatMenuModule,
    HttpClientModule,
    MatCheckboxModule,
    NgxChartsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatExpansionModule 

  ],
  providers: [GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
