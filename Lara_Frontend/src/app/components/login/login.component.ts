// login.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginInfo } from 'src/app/Models/login.model';
import { LoginService } from 'src/app/Services/Login.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  fileToUploadPost: File | null = null;
  loginInfo: LoginInfo[] = [];
  email: string = '';
  password: string = '';
  username: string = '';
  profilePicture: string = '';

  @Output() loginSuccess: EventEmitter<LoginInfo> = new EventEmitter();

  constructor(private loginService: LoginService, private router: Router) { }
  

  ngOnInit(): void {
    //this.getAllLoginInfo();
  }

  /*getAllLoginInfo() {
    this.loginService.getAllLoginInfo().subscribe(response => {
      this.loginInfo = response;
    });
  }*/

  loginButtonMain() {
    if (!this.email || !this.password) {
      alert("Please enter your email address and password correctly!");
      return;
    }
    /*
    this.loginService.login(this.email, this.password).subscribe(
      token => {
        // Save the JWT token for later use (e.g., in local storage)
       // this.loginSuccess.emit({ email: this.email, password: this.password });
       sessionStorage.setItem('token', token);
        this.setUserDetails(token);        
        console.log('Logged in successfully:', token);
        sessionStorage.setItem('timer', '8');

        this.router.navigate(['/home']);
      },
      error => {
        // Display error message to the user
        alert(error);
      }
    );
    */

    this.loginService.login(this.email, this.password).subscribe(
      token => {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('timer', '8');
        sessionStorage.setItem('userPosts','all');

        this.setUserDetails(token);
  
        forkJoin({
          userDetails: this.loginService.getUserDetails(token)
          // Add more observables if needed
        }).subscribe(
          ({ userDetails }) => {
            sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
            console.log("User DETAILS Set!");
            this.router.navigate(['/home']);
          },
          error => {
            console.log('Error retrieving user details:', error);
          }
        );
      },
      error => {
        // Display error message to the user
        alert(error);
      }
    );

    this.email = '';
    this.password = '';
  }
  

  setUserDetails(jwt:string){
    this.loginService.getUserDetails(jwt)
      .subscribe(
        userDetails => {
          //userDetails.profilePicture=  'data:image/jpeg;base64,' + userDetails.profilePicture;
          sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
          console.log("User DETAILS Set!" )
          // You can access userDetails properties like userDetails.userId, userDetails.username, etc.
        },
        error => {
          console.log('Error retrieving user details:', error);
        }
      );
  }

  registerButtonMain() {
    // Validate loginInfoPerson properties here before registering
    // ...

    this.loginService.register({
      username: this.username,
      email: this.email,
      password: this.password,
      profilePicture: this.profilePicture
    }).subscribe(
      () => {
        // Registration success, perform any additional actions if needed
        //console.log('Registration successful');
        alert('Registration successful');
        this.registerCheck = 1;
      },
      error => {
        // Display error message to the user
        alert(error);
      }
    );
  }

  handlerFileInputPost(event: any): void {
    this.fileToUploadPost = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.profilePicture = event.target.result.split(',')[1];
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  

  // for registertion 
  registerCheck : number = 1;

  registerButton(){
    this.registerCheck = 0;
  }
  loginButton(){
    this.registerCheck = 1;
  }
}
