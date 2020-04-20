import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AngularFireStorageModule} from 'angularfire2/storage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDLXmfWdLxa48jgB5PV9Q0t0IwUNOs0dWc",
      authDomain: "videostreaming-5c1bc.firebaseapp.com",
      projectId: "videostreaming-5c1bc",
      storageBucket: "videostreaming-5c1bc.appspot.com"
    }),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
