import { Component, OnInit } from '@angular/core';
import { HttpCallsService } from 'src/app/services/http/http-calls.service';


@Component({
  selector: 'app-teacher-number-cards',
  templateUrl: './number-cards.component.html',
  styleUrls: ['./number-cards.component.css']
})
export class TeacherNumberCardsComponent implements OnInit  {
  constructor(private HttpCallService:HttpCallsService ){}
  public adminAttendance!:any;
  totalAttendance = 0;
  presentAttendance = 0;
  absentAttendance = 0;
  percentageAttendance = 0;
  totalStudents=0;
  presentStudents=0;
  absentStudents=0;
  presentPercentage=0;

  ngOnInit(): void {
    let currentDate: string;
    const date = new Date();
    const year = date.getFullYear();
    const month = this.addLeadingZero(date.getMonth() + 1);
    const day = this.addLeadingZero(date.getDate());

    currentDate = `${year}-${month}-${day}`;
  

  
    this.HttpCallService.teacherAttendance("user2",9,'2023-07-01').subscribe(data=>{
      console.log(data);
      
      this.adminAttendance=data;
      this.totalStudents=this.adminAttendance.totalStudents;
      this.presentStudents=this.adminAttendance.presentStudents;
      this.absentStudents=this.adminAttendance.absentStudents;
      this.presentPercentage=this.adminAttendance.presentPercentage;
    })
  }
  addLeadingZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
    
}

