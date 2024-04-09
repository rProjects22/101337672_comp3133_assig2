import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service'; 

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      // Call the signup method from AuthService to register the user
      this.authService.signup(formData).subscribe(
        response => {
          // Handle successful signup
          console.log('Signup successful:', response);
          // Optionally, redirect the user to another page
        },
        error => {
          // Handle signup error
          console.error('Signup failed:', error);
          // Optionally, display an error message to the user
        }
      );
    }
  }
}
