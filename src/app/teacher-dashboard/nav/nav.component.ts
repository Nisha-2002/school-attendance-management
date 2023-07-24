import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { GlobalService } from 'src/app/services/others/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-teacher',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponentTeacher implements OnInit {
  ngOnInit(): void {
    if(this.gs.user_PROFILE_IDENTIFIER!=3){
      console.log("Problem")
      this.router.navigate(['/login']);
    }
  }
  constructor(public gs:GlobalService, public router: Router){
    
  }
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    searchTerm = '';

  onSearchInput(): void {
    console.log('Search term:', this.searchTerm);
    // Add your search logic here
  }

  clearSearch(): void {
    this.searchTerm = '';
  }
  logout(){
    this.gs.destroyAll()
    this.router.navigate(['/login'])
  }
}
