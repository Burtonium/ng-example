import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { PostFormComponent } from './post-form/post-form.component';
import { PostsComponent } from './posts/posts.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { TimeAgoPipe } from 'time-ago-pipe';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    PostFormComponent,
    PostsComponent,
    TimeAgoPipe,
    LoadingSpinnerComponent
  ],
  imports: [
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFontAwesomeModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
