import { Component, OnInit } from '@angular/core';
import { NewsFeedService } from 'src/app/Services/News-Feed.service';
import { NewsFeedItem } from 'src/app/Models/news-feed-item.model';
import { BlogService } from 'src/app/Services/blog.service';
import { BlogInfo } from 'src/app/Models/blog.model';
import { DateFormatPipe } from 'src/app/pipes/dateFormat.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css'],
  providers: [DateFormatPipe]
})
export class NewsFeedComponent implements OnInit {
  blogItems: BlogInfo[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalItems: number = 0;
  fileToUploadPost: File | null = null;

  constructor(
    private blogService: BlogService,
    private newsfeedService: NewsFeedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBlogItems(this.currentPage);
  }

  postInfoDemo: BlogInfo = {
    userId: '',
    username: '',
    blogImage: '',
    blogDescription: '',
    blogLikes: 0,
    blogComents: 0,
    blogDate: '',
  };

  createAPost(): void{
    this.router.navigate(['/create-post']);
  }

  getBlogItems(page: number): void {
    // Calculate the starting index of the items for the current page
    const startIndex = (page - 1) * this.itemsPerPage;

    this.blogService.getBlogs().subscribe(
      (response: BlogInfo[]) => {
        this.totalItems = response.length;

        // Extract the items for the current page using Array.slice()
        this.blogItems = response.slice(
          startIndex,
          startIndex + this.itemsPerPage
        );
      },
      (error) => {
        console.log('Error fetching blog items:', error);
      }
    );
  }

  decodeImage(base64Image: string): string {
    return 'data:image/jpeg;base64,' + base64Image;
  }

  
  

  onPageChange(page: number): void {
    this.currentPage = page;
    this.getBlogItems(this.currentPage);
  }
}
