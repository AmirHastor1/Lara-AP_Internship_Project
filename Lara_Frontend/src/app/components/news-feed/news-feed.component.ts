import { Component, OnInit } from '@angular/core';
import { NewsFeedService } from 'src/app/Services/News-Feed.service';
import { NewsFeedItem } from 'src/app/Models/news-feed-item.model';
import { BlogService } from 'src/app/Services/blog.service';
import { BlogInfo } from 'src/app/Models/blog.model';
import { DateFormatPipe } from 'src/app/pipes/dateFormat.pipe';
import { Router } from '@angular/router';
import { UserDetails } from 'src/app/Models/userDetails.model';
import { CommentInfo } from 'src/app/Models/comment.model';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css'],
  providers: [DateFormatPipe]
})
export class NewsFeedComponent implements OnInit {
  blogItems: BlogInfo[] = [];
  blogComments: CommentInfo[] = [];
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
  selectedBlogId: string | null = null;


  postInfoDemo: BlogInfo = {
    blogId: '',
    userId: '',
    username: '',
    blogImage: '',
    blogDescription: '',
    blogLikes: 0,
    blogComments: 0,
    blogDate: '',
  };

  createAPost(): void{
    this.router.navigate(['/create-post']);
  }
  addComment(blogId: string) {
    const userDetailsString = sessionStorage.getItem('userDetails');
    const userDetails: UserDetails = JSON.parse(userDetailsString!!);
    const token = sessionStorage.getItem('token');
    const userId = userDetails.userId;
  
    if (token && userId && blogId) {
      const commentText = this.postInfoDemo.blogDescription;
      const username = userDetails.username;
  
      this.blogService.commentOnBlog(userId, blogId, username, commentText, token)
        .subscribe(
          (response) => {
            // Handle success response here
            console.log('Comment added successfully:', response);
            this.getComments(blogId); // Refresh the comments for the blog
            this.postInfoDemo.blogDescription = ''; // Clear the comment textarea
          },
          (error) => {
            console.log('Error adding comment:', error);
            // Handle error response here
          }
        );
    } else {
      console.log('Token or userId or blogId not found');
      // Handle the case where the token or userId is not found in session storage
    }
  }
  likeUpdate(blog: BlogInfo){
    const userDetailsString = sessionStorage.getItem('userDetails'); // Retrieve the stored userDetails as a string
    const userDetails: UserDetails = JSON.parse(userDetailsString!!); // Convert the string back to an object

    const token = sessionStorage.getItem('token');
    const userId = userDetails.userId  
    if (token && userId && blog.blogId) {
      this.blogService.likeBlog(userId, blog.blogId, token)
        .subscribe(
          (response) => {
            // Handle success response here
            console.log('Like processed successfully:', response);
            this.getBlogItems(this.currentPage);
            // Reset the form or perform any other necessary actions
          },
          (error) => {
            console.log('Error liking post:', error);
            // Handle error response here
          }
        );
    } else {
      console.log('Token or userId or blogId not found');
      // Handle the case where the token or userId is not found in session storage
    }
  }

  getComments(blogId: string): void {
    this.selectedBlogId = blogId;
  
    this.blogService.getComments(blogId).subscribe(
      (response: CommentInfo[]) => {
        // Update the comments for the selected blog post
        // You can store the comments in the corresponding BlogInfo object or create a separate property to hold them
        // For example, if you update the BlogInfo model to include a comments property:
        //const selectedBlog = this.blogItems.find((blog) => blog.blogId === this.selectedBlogId);
        //if (selectedBlog) {
          this.blogComments = response;
        //}
      },
      (error) => {
        console.log('Error fetching comments for blog:', error);
      }
    );
  }

  getBlogItems(page: number): void {
    // Calculate the starting index of the items for the current page
    const startIndex = (page - 1) * this.itemsPerPage;

    this.blogService.getBlogs().subscribe(
      (response: BlogInfo[]) => {
        this.totalItems = response.length;
        console.log(response);
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
