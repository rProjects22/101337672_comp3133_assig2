import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    // Make an HTTP POST request to your backend API endpoint for login
    return this.http.post<any>('http://localhost:3000/api/auth/login', { username, password });
  }

  signup(userData: any): Observable<any> {
    // Make an HTTP POST request to your backend API endpoint for signup
    return this.http.post<any>('http://localhost:3000/api/auth/signup', userData);
  }
}
