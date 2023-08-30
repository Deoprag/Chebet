import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    DialogModule,
    DynamicDialogModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    RippleModule
  ],
  providers: [DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
