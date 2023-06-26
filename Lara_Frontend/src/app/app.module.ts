import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { NewsFeedComponent } from './components/news-feed/news-feed.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { DateFormatPipe } from './pipes/dateFormat.pipe';
import { PostCreationComponent } from './components/post-creation/post-creation.component';
import { NotificationDropdownComponent } from './components/notification-dropdown/notification-dropdown.component';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewsFeedComponent,
    HeaderComponent,
    HomeComponent,
    DateFormatPipe,
    PostCreationComponent,
    NotificationDropdownComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
