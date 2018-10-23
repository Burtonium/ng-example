import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  posts: Observable<any[]>;
  
  constructor(db: AngularFirestore) {
    this.posts = db.collection('posts').valueChanges();
  }
}
