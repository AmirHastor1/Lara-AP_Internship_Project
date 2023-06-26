import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { interval, Observable,Subscription, take  } from 'rxjs';
import { LoginInfo } from 'src/app/Models/login.model';
//import { RequestService } from 'src/app/Service/request.service';
import { LoginService } from 'src/app/Services/Login.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/Services/notification.service';
import { NotificationInfo } from 'src/app/Models/notification.model';
import { UserDetails } from 'src/app/Models/userDetails.model';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  dropdownVisible = false;

  showNotificationDropdown = false;
  numberOfNotifications=0;
  latestNotifications: NotificationInfo[] = [];
  timerTime: number=0;
  


  @Input() loginInfoForHeader : LoginInfo | undefined;
  @Input() requestCount: number = 0;
  @Output() currentPageEmitter : EventEmitter<number> = new EventEmitter();
  @Output() logoutStatusEmitter : EventEmitter<boolean> = new EventEmitter();
  @Output() searchContentEmitter : EventEmitter<LoginInfo[]> = new EventEmitter();
  token = sessionStorage.getItem('token');
  private timerSubscription: Subscription | undefined;
  private timerStarted = false;

  constructor(private loginService: LoginService,
     private router: Router,
    private notificationService: NotificationService) { }
  
  currentPage : number=1;

  ngOnInit(): void {
    const timerTimeStr = sessionStorage.getItem('timer');
    this.timerTime = timerTimeStr ? parseInt(timerTimeStr, 10) : 0;

    
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
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
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
  loginInfo : LoginInfo[] = [];
  findFriendInfo: LoginInfo [] = [];
  search : string = "";
  clickOnSearch(){
    this.search.trim();
    this.search = this.search.substring(0, this.search.length).toLowerCase();
    if (this.search.length==0) return;
    this.findFriendInfo = [];

    this.loginInfo = JSON.parse(sessionStorage.getItem('loginInfo') || '{}') as LoginInfo[];
    
    for (var i = 0; i < this.loginInfo.length; i++){
      //var name = this.loginInfo[i].name;
      var name = "proba"
      name = name.substring(0, name.length).toLowerCase();
      if (name.includes(this.search)){
        this.findFriendInfo.push(this.loginInfo[i]);
      }
    }

    this.searchContentEmitter.emit(this.findFriendInfo);
    this.currentPageEmitter.emit(5);
  }

}
