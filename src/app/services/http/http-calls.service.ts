import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginComponent } from 'src/app/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class HttpCallsService {

  constructor(private http: HttpClient) { }

  getTeacherInfo(teacherId:string){
    
    let returnedData:any=this.http.get(`http://localhost:8080/getTeacherInfo/${teacherId}`)
    console.log("RETURN", returnedData)
    return returnedData
  }
  getClassInfo(teacherId:string, classId:string)
  {
    const params = new HttpParams()
    .set('teacherId', teacherId)
    .set('classId', classId)
    return this.http.get(`http://localhost:8080/getClassInfo/teacherId=${teacherId}&classId=${classId}`)
  }
  getAbsentDates(studentid:string)
  {
    return this.http.get(`http://localhost:8080/student/${studentid}`)
  }

  getClassInfoDate(teacherId:string, classId:string, from:string, to:string)
  {
    const params = new HttpParams()
    .set('teacherId', teacherId)
    .set('classId', classId)
    .set('from', from)
    .set('to', to);
    return this.http.get(`http://localhost:8080/getClassInfoDate/`, {params})
  }

  postAttendanceDay(date:string, classID:string, studentIDs:any){
    console.log(typeof(date), typeof(classID), studentIDs)
    

    return this.http.post(`http://localhost:8080/addAttendance/${date}/${classID}`, studentIDs )
  }
  studentDetail(userid:String){
    return this.http.get(`http://localhost:8080/students/${userid}`)
    }
    adminAttendance(userid:String,date:String){
      return this.http.get(`http://localhost:8080/admin/attendance-summary?userId=${userid}&date=${date}`)
    }
    teacherAttendance(userId:string,grade:number,date:string)
    {
      return this.http.get(`http://localhost:8080/admin/attendance-summary?userId=${userId}&grade=${grade}&date=${date}`)
    }
    adminStudentList(userid:String){
      return this.http.get(`http://localhost:8080/admin/get-student-names?userId=${userid}`)
    }
    teacherStudentList(userid:String,classId:string)
    {
      return this.http.get(`http://localhost:8080/getClassInfo/teacherId=${userid}&classId=${classId}`)
    } 
   login(userId:String, password:String){
    let data:any={
      "USER_IDENTIFIER": userId,
      "PASSWORD": password
    }
    return this.http.post(`http://localhost:8080/Validation`,data)
    }
}
  
