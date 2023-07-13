import { Component } from '@angular/core';
import { GridApi, GridOptions, ColDef } from 'ag-grid-community';

interface Student {
  name: string;
  present: boolean;
}

@Component({
  selector: 'app-attendance-recording',
  templateUrl: './attendance-recording.component.html',
  styleUrls: ['./attendance-recording.component.css']
})
export class AttendanceRecordingComponent {
  showTable = false;
  selectedClass: string="";
  selectedSection: string="";
  selectedDate: Date=new Date();
  classOptions: string[] = ['Class 1', 'Class 2', 'Class 3'];
  sectionOptions: string[] = ['Section A', 'Section B', 'Section C'];

  columnDefs: ColDef[] = [
    { field: 'name', headerName: 'Name', sortable: true, filter: true },
    {
      field: 'present',
      headerName: 'Present',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      width: 100
    }
  ];

  defaultColDef = {
    flex: 1,
    minWidth: 150,
    editable: true,
    resizable: true
  };

  studentData: Student[] = [
    { name: 'John Doe', present: false },
    { name: 'Jane Smith', present: true },
    { name: 'Mark Johnson', present: false }
  ];

  gridOptions: GridOptions = {
    alignedGrids: []
  };

  onGridReady(params: any) {
    params.api.sizeColumnsToFit();

    // Add the current grid's API to the alignedGrids property
    //this.gridOptions.alignedGrids.push(params.api);
  }

  onFirstDataRendered(params: any) {
    // Call the alignGrids method after the first data rendering to align the columns
    setTimeout(() => {
      params.api.alignGrids();
    }, 0);
  }

  search() {
    // Perform search and get attendance data based on selected class, section, and date
    // Set showTable to true to display the table
    this.showTable = true;
  }
}
