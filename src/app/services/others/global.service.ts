import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  // Define your global variable here
  user_PROFILE_IDENTIFIER: any;
  USER_NAME:any;
  user_IDENTIFIER:any;
  constructor() { }
}