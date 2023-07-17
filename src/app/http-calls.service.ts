import { HttpClient, HttpParams } from '@angular/common/http';
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

  getTeacherInfo(teacherId:string){
    
    let returnedData:any=this.http.get(`http://192.168.43.68:8080/getTeacherInfo/${teacherId}`)
    console.log("RETURN", returnedData)
    return returnedData
  }
  getClassInfo(teacherId:string, classId:string)
  {
    const params = new HttpParams()
    .set('teacherId', teacherId)
    .set('classId', classId)
    return this.http.get(`http://192.168.43.68:8080/getClassInfo/teacherId=${teacherId}&classId=${classId}`)
  }

  getClassInfoDate(teacherId:string, classId:string, from:string, to:string)
  {
    const params = new HttpParams()
    .set('teacherId', teacherId)
    .set('classId', classId)
    .set('from', from)
    .set('to', to);
    return this.http.get(`http://192.168.43.68:8080/getClassInfoDate/`, {params})
  }

  postAttendanceDay(date:string, classID:string, studentIDs:any){
    console.log(typeof(date), typeof(classID), typeof(studentIDs))
    let body={
      studentIDs
    }

    return this.http.post(`http://192.168.43.68:8080/addAttendance/${date}/${classID}`, studentIDs )
  }

}
