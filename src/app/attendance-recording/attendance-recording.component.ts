
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import {OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';

import {Component, Injectable} from '@angular/core';
import {DateAdapter, MatNativeDateModule} from '@angular/material/core';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import {MatInputModule} from '@angular/material/input';


import {
  MatDateRangeSelectionStrategy,
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DatePipe } from '@angular/common';
import { first } from 'rxjs';
import { HttpCallsService } from '../services/http/http-calls.service';
import { HttpResponse } from '@angular/common/http';

export class Student {
  uid: string="";
  name: string="";
  present: boolean=false;
}
@Injectable()
export class FiveDayRangeSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D> {
  constructor(private _dateAdapter: DateAdapter<D>) {}

  selectionFinished(date: D | null): DateRange<D> {
    return this._createFiveDayRange(date);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this._createFiveDayRange(activeDate);
  }

  private _createFiveDayRange(date: D | null): DateRange<D> {
    if (date) {
      const start = this._dateAdapter.addCalendarDays(date, -3);
      const end = this._dateAdapter.addCalendarDays(date, 3);
      return new DateRange<D>(start, end);
    }

    return new DateRange<D>(null, null);
  }
}

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-attendance-recording',
  templateUrl: './attendance-recording.component.html',
  styleUrls: ['./attendance-recording.component.css'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: FiveDayRangeSelectionStrategy,
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class AttendanceRecordingComponent implements OnInit{
  ngOnInit(): void {
    this.httpService.getTeacherInfo("user4")
      .subscribe((data: any)=>{
        this.classOptions=data
      })
  }
  constructor(private httpService: HttpCallsService){

  }
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  private gridApi!: GridApi;

  showTable = false;
  selectedClass: string="";
  selectedSection: string="";
  public filterSelection: string="";
  selectedDate: any=new Date();
  selectedWeek: Date=new Date();
  //selectedMonth: Date=new Date();
  classOptions: string[] = [];
  //sectionOptions: string[] = ['Section A', 'Section B', 'Section C'];
  filterOptions: string[] = ['By Day', 'By Week','By Month'];
  columnDefs: ColDef[]=[ { field: 'uid',headerName: 'uid' },
  { field: 'name',headerName: 'name' },];
  
//   columnDefs: ColDef[] = [
//     { field: 'uid' },
//     { field: 'name' },
//     { field: 'present' },
//    // { field: 'price' }
// ];
public defaultColDef: ColDef = {
  editable: true,
  sortable: true,
  filter: true,
  resizable: true,
  //wrapHeaderText: true,
  //autoHeaderHeight: true,
  floatingFilter: true,
};
downloadReport() {
  this.gridApi.exportDataAsCsv();
}
checkboxRenderer(params: any) {
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = params.value;

  input.addEventListener('change', (event) => {
    const target = event.currentTarget as HTMLInputElement;
    params.setValue(target.checked);
  });

  return input;
}
  studentData: any[] = []

  gridOptions: GridOptions = {
    alignedGrids: []
  };
  datepipe: DatePipe = new DatePipe('en-US')
  onGridReady = (params:any) => {
    // Following line to make the currently visible columns fit the screen  
   params.api.sizeColumnsToFit();
   this.gridApi = params.api;
  //  let names:string[]=params.api.columnapi.getColumns()
  //  console.log(names)
    
 
 };
 recordAttendance(){
  var columnName = 'name'; // Replace 'columnName' with the name of your desired column
  var colDefs = this.gridApi.getColumnDefs()
  colDefs?.forEach((col)=>{
    var columnData:any []=[];
    console.log(col.headerName)
    if(col.headerName!="uid" && col.headerName!="name"){
      this.gridApi.forEachNode( (node) => {
        
        if(col.headerName && node.data[col.headerName]==false)
        {console.log(node.data[col.headerName])
        console.log("what",node.data["uid"])
        if(col.headerName)
        columnData.push(parseInt(node.data["uid"],10));
        var parts = col.headerName.split("-");
        var day = parts[0];
        var month = parts[1];
        var year = parts[2];
        var convertedDate = year + "-" + month + "-" + day;
        console.log(convertedDate)
        if(convertedDate){
          let studentIds={
            "studentIDs": columnData
          }
          //let studentIDS = JSON.stringify(studentIds);
          console.log(studentIds)
          if(studentIds.studentIDs.length!=0){
            console.log("Sending data")
            this.httpService.postAttendanceDay(convertedDate, this.selectedClass, studentIds)
            .subscribe((res)=>{console.log("Response:",res)})
          
          }
          //console.log(response.subscribe)
        }
        
      }
  
      }
      );
     
    //console.log("Absentees:",columnData)
    }
   
  })
  alert("Recorded successfully")
 }

  search() {
    
    //console.log(this.filterSelection)
    if(this.selectedClass!="" && this.filterSelection!=""){
      this.studentData=[]
      this.httpService.getClassInfo("user6", this.selectedClass)
      .subscribe((data)=>{
        const students_list = Object.values(data)
        for(var student in students_list){
          console.log(students_list[student][0],
            students_list[student][1])
            this.studentData.push({uid:students_list[student][0],
            name:students_list[student][1]})
        }

        // this.studentData = [
      //   { uid: '1', name: 'John Doe'},
      //   { uid: '2', name: 'Jane Smith'},
      //   { uid: '3', name: 'Mark Johnson' }
      // ];
      console.log("WORKING",this.studentData)
      this.columnDefs=[ { field: 'uid',filter:true,headerName: "uid",},
    { field: 'name',filter: true, headerName: "name"}];
      if(this.filterSelection=="By Day"){
      this.selectedDate = this.datepipe.transform(this.selectedDate, 'dd-MM-YYYY')
      //this.selectedDate=this.selectedDate.format('DD-MMM-YYYY')
      console.log("IN!", this.selectedDate, this.selectedWeek, this.selectedMonth)
      
      this.columnDefs.push({ field: this.selectedDate, headerName: this.selectedDate,cellRenderer: this.checkboxRenderer })
         // { field: 'price' }
      //let students:any[]=this.studentData
      console.log("FIRST:",this.studentData)
      // students.forEach((student)=>{
      //   console.log("IN")
      //     console.log(student)
      //      let date:string=this.selectedDate
      //      this.studentData[student][date]=false
      //     console.log(this.studentData[student])
  
      // })
      for(let i=0;i<this.studentData.length;i++){
        console.log("i am IN")
          console.log(i)
           let date:string=this.selectedDate
           this.httpService.getAbsentDates(this.studentData[i].uid)
            .subscribe((data)=>{
              console.log(date in data)
              if(date in data)
              this.studentData[i][date]=false
              else
              this.studentData[i][date]=true
              console.log("Fetched data:", this.studentData)

            })
           
       //  this.studentData[i][date]=false
      }
        // for(const student of this.studentData){
        //   console.log("i am IN")
        //   console.log(student)
        //    let date:string=this.selectedDate
        //    this.studentData[student][date]=false
        //   console.log(this.studentData[student])
  
        // }
        
        //this.gridApi.refreshCells()
        //document.querySelector('#forceRefresh') as HTMLInputElement

      }
      else if(this.filterSelection=="By Week"){
        let startDate:Date|any = this.range.value.start
        //startDate= this.datepipe.transform(startDate, 'dd-MM-YYYY')
        let endDate:Date|any = this.range.value.end
        //startDate= this.datepipe.transform(startDate, 'dd-MM-YYYY')
              
        var loop = new Date(startDate);
        // this.httpService.getClassInfoDate("user6", this.selectedClass,
        // this.datepipe.transform(startDate, 'dd-MM-YYYY'), endDate.toString())
        // .subscribe((data)=>{
        //   console.log("PLEASE", data)
        // })
        while(loop <= endDate){
          let loop_date: any=this.datepipe.transform(loop, 'dd-MM-YYYY')
          this.columnDefs.push({ field: loop_date, headerName: loop_date,cellRenderer: this.checkboxRenderer })
          for(var student in this.studentData){
            console.log(student)
            this.httpService.getAbsentDates(this.studentData[student].uid)
            .subscribe((data)=>{
              console.log(loop_date in data)
              if(loop_date in data)
              this.studentData[student][loop_date]=false
              else
              this.studentData[student][loop_date]=true
              console.log("Fetched data:", this.studentData)

            })
             //this.studentData[student][loop_date]=false
            console.log(this.studentData[student])
    
          }
          var newDate = loop.setDate(loop.getDate() + 1);
          loop = new Date(newDate);
        }
        
        console.log(startDate)
        console.log(this.selectedWeek)
        this.range = new FormGroup({
          start: new FormControl<Date | null>(null),
          end: new FormControl<Date | null>(null),
        });
      }else if(this.filterSelection=="By Month" && this.selectedMonth.value){
        
        var firstDay = new Date(this.selectedMonth.value.toDate().getFullYear(), this.selectedMonth.value.toDate().getMonth(), 1);
        var lastDay = new Date(this.selectedMonth.value.toDate().getFullYear(), this.selectedMonth.value.toDate().getMonth() + 1, 0);
        console.log("Range", firstDay, lastDay)
              
        var loop = new Date(firstDay);
        // this.httpService.getClassInfoDate("user6", this.selectedClass,
        //             firstDay.toDateString(), lastDay.toDateString())
        //             .subscribe((data)=>{
        //               console.log("PLEASE", data)
        //             })
        while(loop <= lastDay){
          let loop_date: any=this.datepipe.transform(loop, 'dd')
          this.columnDefs.push({ field: loop_date, headerName: loop_date,cellRenderer: this.checkboxRenderer })
          for(var student in this.studentData){
            console.log(student)
            
             this.studentData[student][loop_date]=false
            console.log(this.studentData[student])
    
          }
          var newDate = loop.setDate(loop.getDate() + 1);
          loop = new Date(newDate);
        }
        this.selectedMonth = new FormControl(moment());
  
        
  
      }
        //console.log("The selected month is", this.selectedMonth, this.date.value)
      // Perform search and get attendance data based on selected class, section, and date
      // Set showTable to true to display the table
      this.showTable = true;
      if(this.gridApi){
        console.log(this.gridApi.refreshCells())
        console.log("Something is working")
        //this.gridOptions.rowData(this.studentData)
      }
      // this.gridOptions.resetRowDataOnUpdate(this.studentData)
      // this.gridOptions.api.setRowData(this.studentData)

      //this.gridApi.setrow

        
      })
      
      
    }
    else
    alert("Please select the class and filter")
    
    
  } 
  myFilter = (d: Date): Date|null => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    if(day !== 0 && day !== 6
    ) 
    return d
    return null
}
selectedMonth = new FormControl(moment());

setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
  const ctrlValue = this.selectedMonth.value!;
  ctrlValue.month(normalizedMonthAndYear.month());
  ctrlValue.year(normalizedMonthAndYear.year());
  this.selectedMonth.setValue(ctrlValue);
  datepicker.close();
}



}

