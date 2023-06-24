import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { LoginInfo } from 'src/app/Models/login.model';
//import { RequestService } from 'src/app/Service/request.service';
import { LoginService } from 'src/app/Services/Login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  @Input() loginInfoForHeader : LoginInfo | undefined;
  @Input() requestCount: number = 0;
  @Output() currentPageEmitter : EventEmitter<number> = new EventEmitter();
  @Output() logoutStatusEmitter : EventEmitter<boolean> = new EventEmitter();
  @Output() searchContentEmitter : EventEmitter<LoginInfo[]> = new EventEmitter();
  token = sessionStorage.getItem('token');

  constructor(private loginService: LoginService, private router: Router) { }
  // this for calling a function multiple times
  /*

  numbers = interval(1000);

  currentPage : number;
  constructor(private requestService: RequestService) {
    this.currentPage = 1;
    this.requestService.getAllRequestInfo().subscribe((info) =>{
      for (var i=0; i<info.length;i++){
        if (info[i].requestPersonId == this.loginInfoForHeader?.id){
          this.requestCount++;
        }
      }
    });
  
    
  }
  */
  currentPage : number=1;

  ngOnInit(): void {
    
  }

  homePageActive(){
    this.currentPage = 1;
    this.currentPageEmitter.emit(1);
  }

  friendPageActive(){
    this.currentPage = 2;
    this.currentPageEmitter.emit(2);
  }

  messagePageActive(){
    this.currentPage = 3;
    this.currentPageEmitter.emit(3);
  }

  uesrProfile(){
    sessionStorage.setItem('userCheck',"yes");
    this.currentPage = 4;
    this.currentPageEmitter.emit(4);
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
