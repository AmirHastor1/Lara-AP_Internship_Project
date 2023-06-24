import { Component, OnInit } from '@angular/core';
import { NewsFeedService } from 'src/app/Services/News-Feed.service';
import { NewsFeedItem } from 'src/app/Models/news-feed-item.model';
import { BlogService } from 'src/app/Services/blog.service';
import { BlogInfo } from 'src/app/Models/blog.model';
import { DateFormatPipe } from 'src/app/pipes/dateFormat.pipe';

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
    private newsfeedService: NewsFeedService
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

  handlerFileInputPost(event: any): void {
    this.fileToUploadPost = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.postInfoDemo.blogImage = event.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  createPost(): void {
    // Check if file is selected for upload
    if (this.fileToUploadPost) {
      // Convert the file to base64 and set it in the blog item
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.postInfoDemo.blogImage = event.target.result;
        this.uploadPost();
      };
      reader.readAsDataURL(this.fileToUploadPost);
    } else {
      // No file selected, directly upload the post
      this.uploadPost();
    }
  }

  uploadPost(): void {
    // Perform the post upload logic
    // Use the `this.postInfoDemo` object to access the post data
    // and `this.fileToUploadPost` for the file data (if applicable)
    // Reset the form or perform any additional actions
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.getBlogItems(this.currentPage);
  }
}
