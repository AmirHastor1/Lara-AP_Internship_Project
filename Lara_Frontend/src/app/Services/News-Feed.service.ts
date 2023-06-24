import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsFeedItem } from '../Models/news-feed-item.model';

@Injectable({
  providedIn: 'root'
})
export class NewsFeedService {
  baseUrl = 'https://localhost:7053/api/news-feed';

  constructor(private http: HttpClient) { }

  getNewsFeed(page: number, itemsPerPage: number): Observable<{ items: NewsFeedItem[], totalItems: number }> {
    const params = { page: page.toString(), itemsPerPage: itemsPerPage.toString() };
    return this.http.get<{ items: NewsFeedItem[], totalItems: number }>(`${this.baseUrl}/get-news-feed`, { params });
  }
}