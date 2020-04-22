import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AngularFireStorageModule} from 'angularfire2/storage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AgmCoreModule} from '@agm/core';
import { AgmDirectionModule } from 'agm-direction'; 
@NgModule({
  declarations: [
    AppComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    AngularFireModule.initializeApp({
      apiKey:  "AIzaSyB7hA3gZ7mxroXul7NNLZ_w_r5wdj7sQJg",
      authDomain: "practice-b992b.firebaseapp.com",
      projectId: "practice-b992b",
      storageBucket: "practice-b992b.appspot.com"
      
    }),
    AngularFireStorageModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCq30MeJ0GZZnHyLD9cEe_XJolcvmkjHQ8',
      libraries: ['places']
    }),
    AgmDirectionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
