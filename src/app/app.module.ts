import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainContentComponent } from './main-content/main-content.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { ChampionshipService } from './service/ChampionshipService';
import { SignupComponent } from './signup/signup.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { FormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminSideNavComponent } from './admin-side-nav/admin-side-nav.component';
import { AdminContentComponent } from './admin-content/admin-content.component';
import { ChampionshipDashboardComponent } from './championship-dashboard/championship-dashboard.component';
import { CarDashboardComponent } from './car-dashboard/car-dashboard.component';
import { PilotDashboardComponent } from './pilot-dashboard/pilot-dashboard.component';
import { TeamDashboardComponent } from './team-dashboard/team-dashboard.component';

export function jwtOptionsFactory() {
  return {
    tokenGetter: () => {
      return localStorage.getItem('token');
    },
    allowedDomains: ['localhost:8080'],
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    MainFooterComponent,
    MainContentComponent,
    MainHeaderComponent,
    EditUserComponent,
    AdminDashboardComponent,
    AdminHeaderComponent,
    AdminSideNavComponent,
    AdminContentComponent,
    ChampionshipDashboardComponent,
    CarDashboardComponent,
    PilotDashboardComponent,
    TeamDashboardComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ToastModule,
    DialogModule,
    DynamicDialogModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    InputMaskModule,
    RippleModule,
    TableModule,
    CalendarModule,
    HttpClientModule,
    DropdownModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
      },
    }),
  ],
  providers: [DialogService, ChampionshipService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
