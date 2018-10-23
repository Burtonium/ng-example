import { Component, OnInit } from '@angular/core';
import { Post } from '../post';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})

export class PostFormComponent implements OnInit {
  model = new Post();
  questions = [
    'How was your day?',
    'What brings you here?',
    'Who is your daddy and what does he do?',
    'But how do you feel?'
  ];
  
  random = Math.random();
  
  get randomQuestion() {
    return this.questions[Math.floor(this.random * this.questions.length)];
  }
  
  ngOnInit() {
  }
  
  onSubmit() {
    
  }

}
