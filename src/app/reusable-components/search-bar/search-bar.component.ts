import { Component, OnInit } from '@angular/core';
import { HttpCallsService } from 'src/app/services/http/http-calls.service';
import { HomeserviceService } from 'src/app/services/others/homeservice.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit{
  constructor(private HttpCallService:HttpCallsService,public homeService:HomeserviceService ){}
  public adminAttendance!:any;
  searchTerm = '';
  options: string[] = [];
  filteredOptions: string[] = [];
  ngOnInit(): void {
    this.HttpCallService.adminStudentList("user2").subscribe(data=>{
      this.adminAttendance=data;
      this.adminAttendance.forEach((element: any)=> {
        console.log(element.userId);
        
        this.options.push(element.userId)
        
      });
    })
    
  }
  filterOptions(): void {
    this.filteredOptions = this.options.filter(option =>
      option.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  search(){
      this.homeService.studentDetials(this.searchTerm)
  }
  }
