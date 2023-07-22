import { Injectable } from '@angular/core';
import { HttpCallsService } from '../http/http-calls.service';

@Injectable({
  providedIn: 'root'
})
export class HomeserviceService {

  constructor(private HttpCallService:HttpCallsService ) { }
  public studentDetailing!:any;
  student: Student={
    name: "",
  class: "",
  rollNumber: "",
  classTeacher: "",
  totalDays:"",
  present:"",
  absent:"",
  percentage:""
  };
  studentDetials(id:String){
    this.HttpCallService.studentDetail(id).subscribe(
      data=>{
        this.studentDetailing=data;
        this.student.name=(`${this.studentDetailing.first_name} ${this.studentDetailing.middle_name} ${this.studentDetailing.last_name}`);
        this.student.rollNumber=this.studentDetailing.class_roll_no;
        this.student.class=this.studentDetailing.class_ID;
        this.student.classTeacher=this.studentDetailing.teacherName;
        this.student.present=this.studentDetailing.days_present;
        this.student.absent=this.studentDetailing.days_absent;
        this.student.percentage=this.studentDetailing.percentage;
      }
          
      
    )
  }

}
interface Student {
  name: string;
  class: string;
  rollNumber: string;
  classTeacher: string;
  totalDays:string;
  present:string;
  absent: string;
  percentage:string;
 }