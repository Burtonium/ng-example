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
import { ScrollableDirective } from './scrollable.directive';
import { PaginationService } from './pagination.service';

@NgModule({
  declarations: [
    AppComponent,
    PostFormComponent,
    PostsComponent,
    TimeAgoPipe,
    LoadingSpinnerComponent,
    ScrollableDirective
  ],
  imports: [
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFontAwesomeModule
  ],
  providers: [AngularFirestore, PaginationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
