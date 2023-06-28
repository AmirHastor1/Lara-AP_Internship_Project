import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NewsFeedService } from 'src/app/Services/News-Feed.service';
import { NewsFeedItem } from 'src/app/Models/news-feed-item.model';
import { BlogService } from 'src/app/Services/blog.service';
import { BlogInfo } from 'src/app/Models/blog.model';
import { DateFormatPipe } from 'src/app/pipes/dateFormat.pipe';
import { Router,ActivatedRoute } from '@angular/router';
import { UserDetails } from 'src/app/Models/userDetails.model';
import { CommentInfo } from 'src/app/Models/comment.model';
import { UserService } from 'src/app/Services/user.service';


@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css'],
  providers: [DateFormatPipe]
})
export class NewsFeedComponent implements OnInit {
  @Input() refreshHeader: EventEmitter<void> = new EventEmitter<void>();

  infoPerson: UserDetails | undefined;
  blogItems: BlogInfo[] = [];
  blogComments: CommentInfo[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalItems: number = 0;
  fileToUploadPost: File | null = null;
  darkThemeOn: boolean = true;


  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private userService: UserService,
    private newsfeedService: NewsFeedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userDetailsString = sessionStorage.getItem('userDetails');
    const userDetails: UserDetails = JSON.parse(userDetailsString!!);
    this.darkThemeOn= userDetails.darkTheme;

    this.refreshHeader.subscribe(() => {
      const userDetailsString = sessionStorage.getItem('userDetails');
      const userDetails: UserDetails = JSON.parse(userDetailsString!!);
        this.darkThemeOn=!this.darkThemeOn;
        console.log("Refreshed news-feed");
    });

    this.route.paramMap.subscribe(params => {
      const username = params.get('username');
      if (username) {
        // Call a method to load the user profile using the username
        this.loadUserPosts(username);
        this.getBlogItems(this.currentPage);
      }
    });

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
            //console.log('Comment added successfully:', response);
            this.getComments(blogId); // Refresh the comments for the blog
            //this.getBlogItems(this.currentPage);

            //this.postInfoDemo.blogComments += 1;

            //this.getBlogItems(this.currentPage);

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
            //console.log('Like processed successfully:', response);
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

          this.blogComments = response;
      },
      (error) => {
        console.log('Error fetching comments for blog:', error);
      }
    );
  }

  getBlogItems(page: number): void {
    // Calculate the starting index of the items for the current page
    const startIndex = (page - 1) * this.itemsPerPage;
    var check = sessionStorage.getItem('userPosts')
    if(check=="all"){
      this.blogService.getBlogs().subscribe(
        (response: BlogInfo[]) => {
          this.totalItems = response.length;
          //console.log(response);
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
    }else{
      this.blogService.getUserBlogs(check!!).subscribe(
        (response: BlogInfo[]) => {
          this.totalItems = response.length;
          //console.log(response);
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
  }
    
  decodeImage(base64Image: string): string {
    return 'data:image/jpeg;base64,' + base64Image;
  }

  loadUserPosts(username: string) {
    console.log("SENDING USERNAME: "+username);

    this.userService.getUserByUsername(username).subscribe(
      (userDetails: UserDetails) => {
        if (userDetails) {
          //sessionStorage.setItem('userPosts',userDetails.userId);
          //console.log("FOUND USER: "+userDetails);
          this.infoPerson = userDetails;
        } else {
          console.log('User not found.');
        }
      }
    );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.getBlogItems(this.currentPage);
  }
}
