import { Component, OnInit, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { GlobalService } from 'src/app/services/others/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class AdminDashComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  ngOnInit(): void {
    if(this.gs.user_PROFILE_IDENTIFIER!=2){
      this.router.navigate(['/login']);
    }
  }
  constructor(public gs:GlobalService, public router: Router){
   
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
