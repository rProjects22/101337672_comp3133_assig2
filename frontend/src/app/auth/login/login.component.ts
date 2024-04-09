import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formData: any = {}; // Object to store form data

  constructor(private authService: AuthService) {} // Inject the authentication service

  onSubmit(): void {
    // Call the login method from your authentication service and pass the form data
    this.authService.login(this.formData.username, this.formData.password)
      .subscribe(
        response => {
          // Handle successful login
          console.log('Login successful:', response);
          // Optionally, you can redirect the user to another page
        },
        error => {
          // Handle login error
          console.error('Login failed:', error);
          // Optionally, display an error message to the user
        }
      );
  }
}
