import { Component, OnInit } from '@angular/core';
import { NewsFeedService } from 'src/app/Services/News-Feed.service';
import { NewsFeedItem } from 'src/app/Models/news-feed-item.model';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {
  newsFeedItems: NewsFeedItem[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  constructor(private newsFeedService: NewsFeedService) { }


  ngOnInit(): void {
    /*
    if (this.authService.isLoggedIn()) {
      this.getNewsFeed(this.currentPage);
    } else {
      console.log('User is not logged in. Redirect or show a message.');
    }
    */
  }

  getNewsFeed(page: number): void {
    // Call the news feed service to fetch the data with pagination
    // Replace 'NewsFeedService' with your actual service for fetching news feed data
    this.newsFeedService.getNewsFeed(page, this.itemsPerPage).subscribe(
      (response: { items: NewsFeedItem[], totalItems: number }) => {
        this.newsFeedItems = response.items;
        this.totalItems = response.totalItems;
      },
      (error) => {
        console.log('Error fetching news feed:', error);
      }
    );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.getNewsFeed(this.currentPage);
  }
}