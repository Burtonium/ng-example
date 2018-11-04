import { Component, EventEmitter, Output } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Post } from '../post';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})

export class PostFormComponent {
  private postsCollection: AngularFirestoreCollection<Post>;
  
  constructor(private afs: AngularFirestore) {
    this.postsCollection = afs.collection<Post>('posts');
  }
  
  model = new Post();
  
  @Output() newPostEmitter = new EventEmitter<Post>();
  
  questions = [
    'How was your day?',
    'What brings you here?',
    'Who is your daddy and what does he do?',
    'But how do you feel?',
    'What did the fox say?'
  ];
  
  random = Math.random();
  
  get randomQuestion() {
    return this.questions[Math.floor(this.random * this.questions.length)];
  }
  
  async onSubmit(form) {
    if(form.valid) {
      const postPromise = this.postsCollection.add({ 
        username: this.model.username,
        content: this.model.content,
        createdAt: new Date() 
      });
      form.reset();
      
      const post = await postPromise;
      const postData = new Post((await post.get()).data());
      this.newPostEmitter.emit(postData);
    }
  }
}
