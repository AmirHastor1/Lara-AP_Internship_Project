import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginInfo } from 'src/app/Models/login.model';
import { UserDetails } from 'src/app/Models/userDetails.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() loginInfoForHome: LoginInfo | undefined;
  @Output() logoutStatusEmitter : EventEmitter<boolean> = new EventEmitter();
  darkThemeOn: boolean = true;

  constructor() { }

  currentPage: number = 1;
  requestCount : number = 0;
  search : string ="";

  ngOnInit(): void {
    console.log("Home Loaded!")
    sessionStorage.setItem('userPosts',"all"); 

    const userDetailsString = sessionStorage.getItem('userDetails');
    const userDetails: UserDetails = JSON.parse(userDetailsString!!);
    this.darkThemeOn= userDetails.darkTheme;

    // this is initilization function 
  }
  

}
