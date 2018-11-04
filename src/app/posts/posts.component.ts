import { Component, OnInit } from '@angular/core';
import { PaginationService } from '../pagination.service';
import { Observable } from 'rxjs';
import { Post } from '../post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})

export class PostsComponent implements OnInit {
  posts: Observable<Post[]>;
  
  constructor(public page: PaginationService) {}
  
  ngOnInit() {
    this.page.init('posts', 'createdAt');
  }
  
  scrollHandler(e) {
    if (e === 'bottom') {
      this.page.more()
    }
  }
}
