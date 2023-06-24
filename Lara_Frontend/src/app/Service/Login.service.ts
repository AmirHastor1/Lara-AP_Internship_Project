// login.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoginInfo } from '../Models/login.model';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = 'https://localhost:7053/api/users/api';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<string> {
    const body = { email, password };
    console.log('Login Request:', body); // Log the login request body
  
    return this.http.post(`${this.baseUrl}/login`, body, { responseType: 'text' })
      .pipe(
        tap(response => {
          console.log('Login Response:', response); // Log the login response
        }),
        map(response => response.trim()), // Trim any leading/trailing whitespace from the response
        catchError(error => {
          let errorMessage = 'Invalid email or password.';
          
          if (error.status === 200) {
            // If the response status is 200, consider it a successful login
            errorMessage = 'Login was successful, but an error occurred while processing the response.';
          }
          
          console.log('Login Error:', error);
          return throwError(errorMessage);
        })
      );
  }

  register(loginInfo: LoginInfo): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/register`, loginInfo)
      .pipe(
        catchError(error => {
          // Handle error here, display error message to the user
          console.log('Registration Details==', loginInfo);
          console.log('Registration Error:', error);
          return throwError('Registration failed. Please try again.');
        })
      );
  }
}
