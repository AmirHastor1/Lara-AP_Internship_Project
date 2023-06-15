import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { MainBodyPartComponent } from './components/main-body-part/main-body-part.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PostComponent } from './components/post/post.component';
import { StoryReelComponent } from './components/story-reel/story-reel.component';
import { FriendListComponent } from './components/friend-list/friend-list.component';
import { MessageComponent } from './components/message/message.component';
import { CookieService } from 'ngx-cookie-service';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchResultComponent } from './components/search-result/search-result.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    MainBodyPartComponent,
    SidebarComponent,
    PostComponent,
    StoryReelComponent,
    FriendListComponent,
    MessageComponent,
    ProfileComponent,
    SearchResultComponent,
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
