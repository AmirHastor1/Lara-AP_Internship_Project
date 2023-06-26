import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoginInfo } from '../Models/login.model';
import { tap } from 'rxjs/operators';
import { UserDetails } from '../Models/userDetails.model';
import { BlogInfo } from '../Models/blog.model';
import { CommentInfo } from '../Models/comment.model';
import { NotificationInfo } from '../Models/notification.model';



@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  baseUrl = 'https://localhost:7053/api/notifications';

  constructor(private http: HttpClient) { }

  getLatestNotifications(userId:string): Observable<NotificationInfo[]> {
    const params = new HttpParams().set('userId', userId); // Create query parameters

    return this.http.get<NotificationInfo[]>(`${this.baseUrl}/user/latest`,{params}).pipe(
      tap(response => {
        console.log('Notification Details Response:', response); 
      }),
      catchError(error => {
        console.log('Notification Details Error:', error);
        return throwError('Failed to retrieve notification details.');
      })
    );
  }
}