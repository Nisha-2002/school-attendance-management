import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn:"root"})

export class LoginService{
    private data: any;

    constructor(private http: HttpClient) {
    //   this.usersUrl = 'http://localhost:8080/users/user11';
    }
    

    ngOnInit(): void {
        this.http.get('http://localhost:8080/users/data').subscribe(response => {
          this.data = response;
        });
      }
}