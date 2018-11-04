import { Component, ViewChild } from '@angular/core';
import { PostsComponent } from './posts/posts.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  @ViewChild(PostsComponent) child: PostsComponent; 
  
  loadNewPost() {
    this.child.loadNewPost();
  }
}
