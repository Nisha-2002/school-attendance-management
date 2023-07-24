import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCallsService } from '../services/http/http-calls.service';
import { GlobalService } from '../services/others/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  responseData:any;
  loginForm: FormGroup;
  userTypes = ['parent', 'teacher', 'admin'];

  constructor(private globalService: GlobalService,private router: Router, private httpService:HttpCallsService) {
    this.loginForm = new FormGroup({
      userID: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() { 
    if (this.loginForm.valid) {
      const userid = this.loginForm.get('userID')?.value;
      const password = this.loginForm.get('password')?.value;

      // Perform authentication and validation here
      // Example: You can send a request to the server to verify credentials
      console.log("INSIDE")
      // Redirect to the respective user's dashboard
      this.httpService.login(userid, password)
        .subscribe(
          (resp)=>{
            console.log(resp)
            this.responseData=resp
            if(!this.responseData){
              alert("Invalid credentials. Please try again.")
              return
            }
            this.globalService.USER_NAME=this.responseData.USER_NAME;
            this.globalService.user_IDENTIFIER=this.responseData.USER_IDENTIFIER;
            this.globalService.user_PROFILE_IDENTIFIER=this.responseData.user_PROFILE_IDENTIFIER;
            console.log("STORED:",this.globalService.user_IDENTIFIER,
                this.globalService.USER_NAME)
            switch (this.responseData.user_PROFILE_IDENTIFIER) {
              case 4:
                this.router.navigate(['/student-dashboard']);
                break;
              case 3:
                this.router.navigate(['/teacher-dashboard']);
                break;
              case 2:
                this.router.navigate(['/admin-dashboard']);
                break;
              default:
                // Handle invalid user type
                break;
            }
          }
          
        )
      
    }
  }
}
