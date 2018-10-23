import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Post } from '../post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})

export class PostsComponent implements OnInit {
  posts: Observable<Post[]>;
  
  constructor(db: AngularFirestore) {
    this.posts = db.collection<Post>('posts', ref => ref.orderBy('createdAt', 'desc'))
      .valueChanges();
  }
  
  ngOnInit() {
    
  }
}
