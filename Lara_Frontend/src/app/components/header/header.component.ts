import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { interval, Observable,Subscription, take  } from 'rxjs';
import { LoginInfo } from 'src/app/Models/login.model';
//import { RequestService } from 'src/app/Service/request.service';
import { LoginService } from 'src/app/Services/Login.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/Services/notification.service';
import { NotificationInfo } from 'src/app/Models/notification.model';
import { UserDetails } from 'src/app/Models/userDetails.model';
import { UserService } from 'src/app/Services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  dropdownVisible = false;
  searchDropdownVisible = false;

  showNotificationDropdown = false;
  numberOfNotifications=0;
  latestNotifications: NotificationInfo[] = [];
  timerTime: number=0;
  darkThemeOn: boolean = true;


  @Input() loginInfoForHeader : LoginInfo | undefined;
  @Input() requestCount: number = 0;
  @Input() refreshHeader: EventEmitter<void> = new EventEmitter<void>();
  @Input() refreshColor: EventEmitter<void> = new EventEmitter<void>();
  @Input() refreshNotifications: EventEmitter<void> = new EventEmitter<void>();


  @Output() currentPageEmitter : EventEmitter<number> = new EventEmitter();
  @Output() logoutStatusEmitter : EventEmitter<boolean> = new EventEmitter();
  @Output() searchContentEmitter : EventEmitter<string> = new EventEmitter();
  token = sessionStorage.getItem('token');
  private timerSubscription: Subscription | undefined;
  private timerStarted = false;
  
  

  constructor(private loginService: LoginService,
  private userService: UserService,
  //private profileComponent: ProfileComponent,
  private router: Router,
  private notificationService: NotificationService) { }
  
  currentPage : number=1;
  userId:string="";
  username:string=""
  profilePicture :string="";
  notificationsOn :boolean=false;

  ngOnInit(): void {
    

    document.addEventListener('click', this.onDocumentClick.bind(this));

    const userDetailsString = sessionStorage.getItem('userDetails');
    const userDetails: UserDetails = JSON.parse(userDetailsString!!);
    this.notificationsOn=userDetails.notificationsOn;
    this.darkThemeOn=userDetails.darkTheme;

    console.log("Header Loaded! Notifications: "+this.notificationsOn);

    this.refreshColor.subscribe(() => {
        this.darkThemeOn=!this.darkThemeOn;
    });
    this.refreshNotifications.subscribe(() => {
      this.notificationsOn=!this.notificationsOn;
    });
    this.refreshHeader.subscribe(() => {
      //Update profile picture when user changes it in profile screen
      const userDetailsString = sessionStorage.getItem('userDetails');
      const userDetails: UserDetails = JSON.parse(userDetailsString!!);
      
      if(userDetails.profilePicture)
        this.profilePicture=userDetails.profilePicture
    });

    if(userDetails)
      this.profilePicture = userDetails.profilePicture || '';
    this.userId=userDetails.userId;
    this.username=userDetails.username;

    const timerTimeStr = sessionStorage.getItem('timer');
    this.timerTime = timerTimeStr ? parseInt(timerTimeStr, 10) : 0;

    //this.loadUserDetails();
    this.loadLatestNotifications();

    if (this.timerTime>1) {
      this.startNotificationTimer();
      this.timerStarted = true;
    }
  }

  notificationInfo: NotificationInfo = {
    userId: '',
    notificationDate: '',
    notificationText: '',
    notificationSeen: false
  };

  newsFeed(){
    this.router.navigate(['/home']);
  }

  userProfile(){
    sessionStorage.setItem('userPosts',this.userId); 
    this.router.navigate(['/profile', this.username]);
  }

  toggleDropdown() {
    console.log("notifications: "+this.notificationsOn);
    if(this.notificationsOn==true)
      this.dropdownVisible = !this.dropdownVisible;
  }
  toggleSearchDropdown() {
    this.searchDropdownVisible = !this.searchDropdownVisible;
  }

  toggleNotificationDropdown() {
    this.showNotificationDropdown = !this.showNotificationDropdown;
    if (this.showNotificationDropdown) {
      this.loadLatestNotifications();
    }
  }

  loadLatestNotifications() {
    const userDetailsString = sessionStorage.getItem('userDetails');
    const userDetails: UserDetails = JSON.parse(userDetailsString!!);
    const userId = userDetails.userId;
    this.notificationService.getLatestNotifications(userId!!)
      .subscribe(
        notifications => {
          this.latestNotifications = notifications;
          if(this.timerTime>1)
            this.numberOfNotifications=this.latestNotifications.length;
          
      
        },
        error => {
          console.error('Failed to retrieve notifications:', error);
        }
      );
  }   

  /*loadUserDetails(): void {
    const userDetailsString = sessionStorage.getItem('userDetails');
    this.userDetails = userDetailsString
      ? JSON.parse(userDetailsString)
      : undefined;
    this.profilePicture = this.userDetails?.profilePicture;
  }*/

  startNotificationTimer() {
    const timer = interval(1000).pipe(take(30)); // 30-second timer

    this.timerSubscription = timer.subscribe({
      next: () => {
        if(this.timerTime>1){
          this.timerTime -= 1;
        }
        if(this.timerTime==1)
          this.numberOfNotifications=0;
      },
      complete: () => {
      }
    });
  }
  ngOnDestroy(): void {
    console.log("HEADER DESTROYED "+this.timerTime);
    // Unsubscribe from the onDocumentClick
    document.removeEventListener('click', this.onDocumentClick.bind(this));

    // Unsubscribe from the timer subscription when the component is destroyed
    sessionStorage.setItem('timer',this.timerTime.toString())
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  logOutbuttonClicked(){
    //this.logoutStatusEmitter.emit(true);
    this.loginService.logout(this.token!!).subscribe(
      () => {
        console.log('Logout in successfully:');
        //sessionStorage.clear();
        this.router.navigate(['/login']);
      },
      error => {
        // Display error message to the user
        //this.token
        alert(error + this.token);
      }
    );
  }

  // this is for searching
  //findFriendInfo: UserDetails [] = [];
  search : string = "";
  searchResult : string = "";
  clickOnSearch(){/*
    this.search.trim();
    this.search = this.search.substring(0, this.search.length).toLowerCase();
    if (this.search.length==0) return;
    */ 
  }
  getUserByUsername(search: string) {
    //if(!this.searchDropdownVisible)
      this.userService.getUserByUsername(search).subscribe(
        (userDetails: UserDetails) => {
          if (userDetails) {
            // Emit the userDetails to the parent component
            this.searchResult = userDetails.username;
            //Save user from Search Results for later use
            sessionStorage.setItem('userSearchResult', JSON.stringify(userDetails));
            sessionStorage.setItem('ProfileType', 'searchResult');
            sessionStorage.setItem('userPosts', userDetails.userId)
            if(!this.searchDropdownVisible)
              this.toggleSearchDropdown();
          } else {
            console.log('User not found.');
          }
        },
        (error) => {
          console.log('Error retrieving user:', error);
        }
      );
      //else
       // this.toggleSearchDropdown();
  }

  openUserProfile(){
    //if (this.router.url.endsWith('/profile')) {
      this.router.navigateByUrl(`/profile/${this.search}`);
    //} else {
    //  this.router.navigate(['/profile']);
    //}
  }

  //dropdown will disappear when user click away from it
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
      if (!target.closest('.dropdown')) {
      this.dropdownVisible = false;
      this.searchDropdownVisible = false;
    }
  }


  decodeImage(base64Image: string): string {
    return 'data:image/jpeg;base64,' + base64Image;
  }

}
