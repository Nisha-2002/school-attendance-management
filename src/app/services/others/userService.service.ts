import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userIdSubject = new Subject<string>();
  userId$ = this.userIdSubject.asObservable();

  setUserId(userId: string) {
    this.userIdSubject.next(userId);
  }
}