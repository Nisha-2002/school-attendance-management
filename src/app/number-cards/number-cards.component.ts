import { Component, OnInit } from '@angular/core';
import { HttpCallsService } from '../http-calls.service';

@Component({
  selector: 'app-number-cards',
  templateUrl: './number-cards.component.html',
  styleUrls: ['./number-cards.component.css']
})
export class NumberCardsComponent implements OnInit  {
  constructor(private HttpCallService:HttpCallsService ){}
  public adminAttendance!:any;
  totalAttendance = 0;
  presentAttendance = 0;
  absentAttendance = 0;
  percentageAttendance = 0;
  ngOnInit(): void {
    let currentDate: string;
    const date = new Date();
    const year = date.getFullYear();
    const month = this.addLeadingZero(date.getMonth() + 1);
    const day = this.addLeadingZero(date.getDate());

    currentDate = `${year}-${month}-${day}`;
  

  
    this.HttpCallService.adminAttendance("user2",currentDate).subscribe(data=>{
      this.adminAttendance=data;
      this.totalAttendance=this.adminAttendance.totalStudents;
      this.presentAttendance=this.adminAttendance.presentStudents;
      this.absentAttendance=this.adminAttendance.absentStudents;
      this.percentageAttendance=this.adminAttendance.presentPercentage;

    })
  }
  addLeadingZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
    
}

