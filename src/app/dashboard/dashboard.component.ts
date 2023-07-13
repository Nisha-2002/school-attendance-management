import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  totalStudents = 100;
  presentStudents = 75;
  absentStudents = 25;
  selectedDate: Date = new Date();
}
