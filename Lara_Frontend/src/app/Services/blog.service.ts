// login.service.ts
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoginInfo } from '../Models/login.model';
import { tap } from 'rxjs/operators';
import { UserDetails } from '../Models/userDetails.model';
import { BlogInfo } from '../Models/blog.model';



@Injectable({
  providedIn: 'root'
})
export class BlogService {
  baseUrl = 'https://localhost:7053/api/blogs';

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<BlogInfo[]> {
    return this.http.get<BlogInfo[]>(`${this.baseUrl}/all`).pipe(
      tap(response => {
        console.log('Blog Details Response:', response); // Log the blog details response
      }),
      catchError(error => {
        console.log('Blog Details Error:', error);
        return throwError('Failed to retrieve blog details.');
      })
    );
  }

  createBlog(userId: string, blogImage: string, blogDescription: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'bearer ' + token
    });

    const body = {
      userId: userId,
      blogImage: blogImage.split(',')[1],
      blogDescription: blogDescription
    };
    console.log("body: "+ JSON.stringify(body));
    console.log("token: "+ token);
    console.log("header: "+JSON.stringify(headers));

    return this.http.post(`${this.baseUrl}/create`, body, { headers }).pipe(
      tap(response => {
        console.log('Create Blog Response:', response); // Log the create blog response
      }),
      catchError(error => {
        console.log('Create Blog Error:', error);
        return throwError('Failed to create blog.');
      })
    );
  }


  
}
