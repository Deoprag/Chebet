import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { RippleModule } from 'primeng/ripple';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { SignupComponent } from './signup/signup.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { TableModule } from 'primeng/table';
import { ChampionshipService } from './service/championshipService';

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    LoginComponent,
    SignupComponent,
    MainFooterComponent
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
    InputMaskModule,
    RippleModule,
    TableModule
  ],
  providers: [DialogService, ChampionshipService],
  bootstrap: [AppComponent]
})
export class AppModule { }
