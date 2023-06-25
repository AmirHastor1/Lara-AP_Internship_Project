// login.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginInfo } from 'src/app/Models/login.model';
import { LoginService } from 'src/app/Services/Login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginInfo: LoginInfo[] = [];
  email: string = '';
  password: string = '';
  username: string = '';

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

    this.loginService.login(this.email, this.password).subscribe(
      token => {
        // Save the JWT token for later use (e.g., in local storage)
       // this.loginSuccess.emit({ email: this.email, password: this.password });
       sessionStorage.setItem('token', token);
        this.setUserDetails(token);
        
        console.log('Logged in successfully:', token);
        this.router.navigate(['/home']);
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
          sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
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
      password: this.password
    }).subscribe(
      () => {
        // Registration success, perform any additional actions if needed
        console.log('Registration successful');
      },
      error => {
        // Display error message to the user
        alert(error);
      }
    );
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
