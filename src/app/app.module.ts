import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  DappAngularLibModule,
  GlobalVariables,
} from '@scalingparrots/dapp-angular-lib';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {firebaseConfig} from "./firebaseconfig";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DappAngularLibModule,
    HttpClientModule,

    // Firebase imports
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // for firestore
  ],
  providers: [GlobalVariables],
  bootstrap: [AppComponent],
})
export class AppModule {
}
