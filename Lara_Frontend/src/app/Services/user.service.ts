// login.service.ts
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoginInfo } from '../Models/login.model';
import { tap } from 'rxjs/operators';
import { UserDetails } from '../Models/userDetails.model';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'https://localhost:7053/api/users';

  constructor(private http: HttpClient) { }

  getUserByUsername(username: string): Observable<UserDetails> {
    const params = new HttpParams().set('username', username); // Create query parameters with the email
  
    return this.http.get<UserDetails>(`${this.baseUrl}/search`, { params }).pipe(
      tap(response => {
        console.log('User Details Response:', response); // Log the user details response
      }),
      catchError(error => {
        console.log('User Details Error:', error);
        return throwError('Failed to retrieve user details.');
      })
    );
  }

  
}
