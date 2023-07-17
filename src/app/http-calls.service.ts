import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpCallsService {

  constructor(private http:HttpClient) { }
  studentDetail(userid:String){
  return this.http.get(`http://192.168.137.35:8080/students/${userid}`)
  }
  adminAttendance(userid:String,date:String){
    return this.http.get(`http://192.168.137.35:8080/admin/attendance-summary?userId=${userid}&date=${date}`)
  }
  adminStudentList(userid:String){
    return this.http.get(`http://192.168.137.35:8080/admin/get-student-names?userId=${userid}`)
  }

}
