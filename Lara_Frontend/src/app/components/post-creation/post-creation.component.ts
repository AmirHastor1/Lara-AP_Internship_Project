import { Component } from '@angular/core';
import { BlogService } from 'src/app/Services/blog.service';
import { BlogInfo } from 'src/app/Models/blog.model';
import { Router } from '@angular/router';
import { UserDetails } from 'src/app/Models/userDetails.model';


@Component({
  selector: 'app-post-creation',
  templateUrl: './post-creation.component.html',
  styleUrls: ['./post-creation.component.css']
})
export class PostCreationComponent {
  fileToUploadPost: File | null = null;

  constructor(
    private blogService: BlogService,
    private router: Router,
  ) {}

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
  cancel(): void{
    this.router.navigate(['/home']);
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
    const userDetailsString = sessionStorage.getItem('userDetails'); // Retrieve the stored userDetails as a string
    const userDetails: UserDetails = JSON.parse(userDetailsString!!); // Convert the string back to an object

    const token = sessionStorage.getItem('token');
    const userId = userDetails.userId
    console.log("toke: "+token+ " userId: "+userId)
  
    if (token && userId) {
      this.blogService.createBlog(userId, this.postInfoDemo.blogImage, this.postInfoDemo.blogDescription, token)
        .subscribe(
          (response) => {
            // Handle success response here
            console.log('Post created successfully:', response);
            // Reset the form or perform any other necessary actions
            this.router.navigate(['/home']);
          },
          (error) => {
            console.log('Error creating post:', error);
            // Handle error response here
          }
        );
    } else {
      console.log('Token or userId not found');
      // Handle the case where the token or userId is not found in session storage
    }
  }


}
