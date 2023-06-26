import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogInfo } from 'src/app/Models/blog.model';
import { UserDetails } from 'src/app/Models/userDetails.model';
import { BlogService } from 'src/app/Services/blog.service';
import { UserService } from 'src/app/Services/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  loginInfoPerson: UserDetails | undefined;
  blogItems: BlogInfo[] = [];
  postInfoOfUser: BlogInfo[] = [];
  message: string = "What's on your mind?";
  demoCode: number = 0;
  button: number = 1;
  //searchResult: string;

  constructor(
    private elementRef: ElementRef,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {/*
    const userDetailsString = sessionStorage.getItem('userDetails');
    const userDetails: UserDetails = JSON.parse(userDetailsString!!);
    if (userDetails) {
      this.loginInfoPerson = userDetails;
    }*/

    this.route.paramMap.subscribe(params => {
      const username = params.get('username');
      if (username) {
        // Call a method to load the user profile using the username
        this.loadUserProfile(username);
      }
    });

    // ...
    // Rest of your code
    // ...
  }

  ngOnDestroy() {
    sessionStorage.setItem('ProfileType', '');
    console.log('PROFILE SCREEN DESTROYED');
    //this.elementRef.nativeElement.remove();
  }

  showFriendList() {
    this.button = 2;
  }

  showTimeline() {
    this.button = 1;
  }

  decodeImage(base64Image: string): string {
    return 'data:image/jpeg;base64,' + base64Image;
  }

  loadUserProfile(username: string) {
    console.log("SENDING USERNAME: "+username);

    this.userService.getUserByUsername(username).subscribe(
      (userDetails: UserDetails) => {
        if (userDetails) {
          sessionStorage.setItem('userPosts',userDetails.userId);
          console.log("FOUND USER: "+userDetails);
          this.loginInfoPerson = userDetails;
        } else {
          console.log('User not found.');
        }
      }
    );
  }
  toggleSearchDropdown() {
    throw new Error('Method not implemented.');
  }

  userProfile(username: string) {
    this.router.navigate(['/profile', username]);
  }
}
