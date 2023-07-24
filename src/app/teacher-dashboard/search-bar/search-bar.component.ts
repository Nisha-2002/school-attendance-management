import { Component, OnInit } from '@angular/core';
import { HttpCallsService } from 'src/app/services/http/http-calls.service';
import { HomeserviceService } from 'src/app/services/others/homeservice.service';

@Component({
  selector: 'app-teacher-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class TeacherSearchBarComponent implements OnInit{
  constructor(private HttpCallService:HttpCallsService,public homeService:HomeserviceService ){}
  public adminAttendance!:any;
  searchTerm = '';
  options: string[] = [];
  filteredOptions: string[] = [];
  present:number=0;
  rollNo:number=0;
  absent:number=0;
  percentage:number=0;
  ngOnInit(): void {
    this.HttpCallService.teacherStudentList("user4","11A").subscribe(data=>{
      this.adminAttendance=data;
      console.log(data);
      
      this.adminAttendance.forEach((element: any)=> {
        
        
        console.log(element[1]);
        
        this.options.push(element[1])
        
      });
    })
    
  }
  filterOptions(): void {
    this.filteredOptions = this.options.filter(option =>
      option.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  search(){
    console.log(this.searchTerm);
    
      this.homeService.studentDetials("User11 ")
  }
  }
