import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  userTypes = ['parent', 'teacher', 'admin'];

  constructor(private router: Router) {
    this.loginForm = new FormGroup({
      userType: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    if (this.loginForm.valid) {
      const userType = this.loginForm.get('userType')?.value;
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      // Perform authentication and validation here
      // Example: You can send a request to the server to verify credentials
      
      // Redirect to the respective user's dashboard
      switch (userType) {
        case 'parent':
          this.router.navigate(['/parent-dashboard']);
          break;
        case 'teacher':
          this.router.navigate(['/teacher-dashboard']);
          break;
        case 'admin':
          this.router.navigate(['/admin-dashboard']);
          break;
        default:
          // Handle invalid user type
          break;
      }
    }
  }
}
