import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainContentComponent } from './main-content/main-content.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { ChampionshipService } from './service/championshipService';
import { SignupComponent } from './signup/signup.component';
import { MainHeaderComponent } from './main-header/main-header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    MainFooterComponent,
    MainContentComponent,
    MainHeaderComponent
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
