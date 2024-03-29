import { Component, OnInit } from '@angular/core';
import { HttpCallsService } from '../http-calls.service';
import { HomeserviceService } from '../shared-service/homeservice.service';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.css']
})

export class StudentCardComponent implements OnInit {
  constructor(private HttpCallService:HttpCallsService,public homeService:HomeserviceService ){}
  
  ngOnInit(): void {
    
  }
  
  downloadReport(): void {
    console.log('Download report for:', this.homeService.student.name);
    // Add logic for downloading the attendance report
  }

  editAttendance(): void {
    console.log('Edit attendance for:', this.homeService.student.name);
    // Add logic for editing the student's attendance
  }

  viewAttendanceReport(): void {
    console.log('View attendance report for:', this.homeService.student.name);
    // Add logic for viewing the attendance report
  }
 
 }
 
