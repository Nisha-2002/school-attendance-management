import { ChangeDetectorRef, Component, ViewChild, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Chart, Color } from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/userService.service';



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
  selector: 'app-student-dash',
  templateUrl: './student-dash.component.html',
  styleUrls: ['./student-dash.component.css']
})


export class StudentDashComponent {

single:any[]
  dateClass: (date: Date) => string;
  constructor(private http: HttpClient,private userService:UserService,private cdr: ChangeDetectorRef) {
    
  }


  @ViewChild('calendar') calendar: any; // Add this line
  startDate:Date;
  endDate:Date;
  userId:string;
  absentDays:Date[]=[];
  studentData:StudentData;

  // dateClass:(date: Date) => string;

  ngOnInit() {
    console.log(this.absentDays);
    
    this.userService.userId$.subscribe((userId)=>{
      this.userId=userId;
    })
  
    const apiUrl = `http://192.168.137.35:8080/students/user11`;

    this.http.get<StudentData>(apiUrl).subscribe(
      (response) => {
        this.studentData = response;
        console.log('Student data received:', response);
        this.single = [
          {
            name: 'Number Of Days Present',
            value: this.studentData.days_present
          },
          {
            name: 'Number Of Days Absent',
            value: this.studentData.days_absent
          }
        ];
        console.log(this.studentData.days_absent);
        
      },
      (error) => {
        console.error('Error fetching student data:', error);
      }

      
    );
  }

  ngOnChanges(){
    this.getData();
  }

  isSameDate(date1: Date, date2: Date): boolean {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);
    return d1.getTime() === d2.getTime();
  }

  getData() {
    const startDateFormatted = this.formatDate(this.startDate);
    const endDateFormatted = this.formatDate(this.endDate);
    console.log(startDateFormatted);
    console.log(endDateFormatted);

    const apiUrl = `http://192.168.137.35:8080/attendance?startDate=${startDateFormatted}&endDate=${endDateFormatted}&userId=user11`;

    this.http.get<Date[]>(apiUrl).subscribe(
      (response) => {
        this.absentDays=response;
        
        console.log('Data received for dates:', response);
        if(this.absentDays){
        this.absentDays = this.absentDays.map((str) => new Date(str) as Date);
        this.absentDays = this.removeDuplicateDates(this.absentDays);
        }
        
        this.dateClass = (date: Date): string => {
          const currentDate = new Date();
           if (this.absentDays && this.isDateInArray(date, this.absentDays)) {
            return 'red-class'; // CSS class name for absent dates
          } else if((date<=this.endDate && date>=this.startDate && date<=new Date())) {
            return 'green-class'; // CSS class name for other dates
          }
          else 
          {
            return '';
          }
        };
        this.cdr.detectChanges(); // Manually trigger change detection
        console.log(this.absentDays);
        this.calendar.updateTodaysDate();
      
      },
      (error) => {
        console.error('Error fetching data for absentDays:', error);
      }
    );
  }


  isDateInArray(date: Date, array: Date[]): boolean {
    return array.some(d => this.isSameDate(d, date));
  }
  

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }
  
  removeDuplicateDates(dates: Date[]): Date[] {
    return dates.filter((date, index, self) =>
      index === self.findIndex(d => this.isSameDate(d, date))
    ); }

  private breakpointObserver = inject(BreakpointObserver);

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Statistics', cols: 1, rows: 1,cardContents:[] },
          { title: 'Student Details', cols: 1, rows: 1,cardContents:[] },
          { title: 'Calendar', cols: 1, rows: 1,cardContents:[] },
          { title: 'Graphs and Charts', cols: 1, rows: 1,cardContents:[] }
        ];
      }

      return [
        { title: 'Statistics', cols: 2, rows: 1,cardContents:["Abcd"] },
        { title: 'Student Details', cols: 1, rows: 1,cardContents:["Efgh"] },
        { title: 'Calendar', cols: 1, rows: 1,cardContents:["ijkkl"] },
        { title: 'Graphs and Charts', cols: 2, rows: 1,cardContents:["mnop"] }
      ];
    })
  );
}
