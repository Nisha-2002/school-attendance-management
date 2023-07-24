import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewChild, inject } from '@angular/core';
import { map } from 'rxjs';
import { GlobalService } from '../services/others/global.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/others/userService.service';
import { HttpCallsService } from '../services/http/http-calls.service';

interface StudentData {
  first_name: string;
  middle_name: string;
  last_name: string;
  class_roll_no: string;
  days_present: number;
  days_absent: number;
  percentage: number;
  teacherName: string;
  user_IDENTIFIER: string;
  class_ID: string;
  absentDates: Date[];
  student_id: string;
}



@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})



export class TeacherDashboardComponent {
  classOptions: string[] = [];
  selectedClass: string="";
  private breakpointObserver = inject(BreakpointObserver);
  ngOnInit(): void {
    if(this.gs.user_PROFILE_IDENTIFIER!=3){
      this.router.navigate(['/login']);
    }

    this.httpService.getTeacherInfo(this.gs.user_IDENTIFIER)
      .subscribe((data: any)=>{
        this.classOptions=data
      })
  }
  constructor(public gs:GlobalService, public router: Router,private httpService:HttpCallsService){
   
  }

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Attendance Stats', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Attendance Stats', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );
 
}
