// login.service.ts
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoginInfo } from '../Models/login.model';
import { tap } from 'rxjs/operators';
import { UserDetails } from '../Models/userDetails.model';
import { BlogInfo } from '../Models/blog.model';
import { CommentInfo } from '../Models/comment.model';



@Injectable({
  providedIn: 'root'
})
export class BlogService {
  baseUrl = 'https://localhost:7053/api/blogs';

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<BlogInfo[]> {

    return this.http.get<BlogInfo[]>(`${this.baseUrl}/all`).pipe(
      tap(response => {
        //console.log('Blog Details Response:', response); // Log the blog details response
      }),
      catchError(error => {
        console.log('Blog Details Error:', error);
        return throwError('Failed to retrieve blog details.');
      })
    );
  }

  getUserBlogs(userId: string): Observable<BlogInfo[]> {
    const params = new HttpParams().set('userId', userId); // Create query parameters

    return this.http.get<BlogInfo[]>(`${this.baseUrl}/all/user`, { params }).pipe(
      tap(response => {
        console.log('Blog Details for User Response:', response); // Log the blog details response
      }),
      catchError(error => {
        console.log('Blogs retrieveal Error:', error);
        return throwError('Failed to retrieve blogs.');
      })
    );
  }

  getComments(blogId: string): Observable<CommentInfo[]> {
    const params = new HttpParams().set('blogId', blogId); // Create query parameters

    return this.http.get<CommentInfo[]>(`${this.baseUrl}/blog/comments`, { params }).pipe(
      tap(response => {
        //console.log('Blog Comments Response:', response); // Log the blog details response
      }),
      catchError(error => {
        console.log('Blog Comments Error:', error);
        return throwError('Failed to retrieve blog comments.');
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
    //console.log("body: "+ JSON.stringify(body));

    return this.http.post(`${this.baseUrl}/create`, body, { headers }).pipe(
      tap(response => {
        //console.log('Create Blog Response:', response); // Log the create blog response
      }),
      catchError(error => {
        console.log('Create Blog Error:', error);
        return throwError('Failed to create blog.');
      })
    );
  }

  likeBlog(userId: string, blogId: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'bearer ' + token
    });

    const body = {
      userId: userId,
      blogId: blogId,
    };
    console.log("body: "+ JSON.stringify(body));

    return this.http.post(`${this.baseUrl}/blog/like`, body, { headers }).pipe(
      tap(response => {
        console.log('Like Blog Response:', response); // Log the like blog response
      }),
      catchError(error => {
        console.log('Like Blog Error:', error);
        return throwError('Failed to Like blog.');
      })
    );
  }

  commentOnBlog(userId: string, blogId: string,username: string, commentText:string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'bearer ' + token
    });

    const body = {
      userId: userId,
      blogId: blogId,
      username: username,
      commentText: commentText,
    };
    console.log("body: "+ JSON.stringify(body));

    return this.http.post(`${this.baseUrl}/blog/comment`, body, { headers }).pipe(
      tap(response => {
        console.log('Like Blog Response:', response); // Log the like blog response
      }),
      catchError(error => {
        console.log('Like Blog Error:', error);
        return throwError('Failed to Like blog.');
      })
    );
  }


  
}
