import { Component, ElementRef, OnDestroy, OnInit,EventEmitter,Output } from '@angular/core';
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
  @Output() refreshHeader: EventEmitter<void> = new EventEmitter<void>();

  token:string ="";
  sessionUser: UserDetails | undefined;
  loginInfoPerson: UserDetails | undefined;
  blogItems: BlogInfo[] = [];
  postInfoOfUser: BlogInfo[] = [];
  fileToUploadPost: File | null = null;
  message: string = "What's on your mind?";
  demoCode: number = 0;
  button: number = 1;
  profilePicture: string="";
  editVisable :boolean = false;
  
  //searchResult: string;

  constructor(
    private elementRef: ElementRef,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    
    this.token= sessionStorage.getItem('token')!!;
    const userDetailsString = sessionStorage.getItem('userDetails');
    const userDetails: UserDetails = JSON.parse(userDetailsString!!);
    this.sessionUser= userDetails;
    
    this.route.paramMap.subscribe(params => {
      const username = params.get('username');
      if (userDetails.username==username) 
        this.editVisable=true;
      if (username) {
        // Call a method to load the user profile using the username
        this.loadUserProfile(username);
      }
    });
  }

  ngOnDestroy() {
    sessionStorage.setItem('ProfileType', '');
    console.log('PROFILE SCREEN DESTROYED');
    //this.elementRef.nativeElement.remove();
  }

  triggerImageUpload() {
    const imageUploadInput = document.getElementById('imageUpload');
    if (imageUploadInput) {
      imageUploadInput.click();
    }
  }

  imageUpload(event: any): void {
    this.fileToUploadPost = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.profilePicture = event.target.result.split(',')[1];
      this.sessionUser!!.profilePicture=this.profilePicture;

      this.userService.updateUser(this.sessionUser!!,this.token).subscribe(
        () => {
          sessionStorage.setItem('userDetails', JSON.stringify(this.sessionUser));
          this.loginInfoPerson!.profilePicture = this.profilePicture; // Assign the updated profile picture
          this.refreshHeader.emit();

          //alert('Update successful');
        },
        error => {
          alert(error);
        }
      );

    };
    reader.readAsDataURL(event.target.files[0]);
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
