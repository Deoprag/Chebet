import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
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
import { CarDashboardComponent } from './admin-page/admin-content/car-dashboard/car-dashboard.component';
import { ChampionshipDashboardComponent } from './admin-page/admin-content/championship-dashboard/championship-dashboard.component';
import { PilotDashboardComponent } from './admin-page/admin-content/pilot-dashboard/pilot-dashboard.component';
import { PreparerDashboardComponent } from './admin-page/admin-content/preparer-dashboard/preparer-dashboard.component';
import { RaceDashboardComponent } from './admin-page/admin-content/race-dashboard/race-dashboard.component';
import { StatisticsDashboardComponent } from './admin-page/admin-content/statistics-dashboard/statistics-dashboard.component';
import { TeamDashboardComponent } from './admin-page/admin-content/team-dashboard/team-dashboard.component';
import { UserDashboardComponent } from './admin-page/admin-content/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-page/admin-dashboard/admin-dashboard.component';
import { AdminHeaderComponent } from './admin-page/admin-header/admin-header.component';
import { AdminSideNavComponent } from './admin-page/admin-side-nav/admin-side-nav.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChampionshipService } from './chebet/service/ChampionshipService';
import { LoginComponent } from './main-page/login/login.component';
import { MainContentComponent } from './main-page/main-content/main-content.component';
import { MainFooterComponent } from './main-page/main-footer/main-footer.component';
import { MainHeaderComponent } from './main-page/main-header/main-header.component';
import { SignupComponent } from './main-page/signup/signup.component';
import { EditUserComponent } from './user-page/edit-user/edit-user.component';
import { RouterModule } from '@angular/router';
import { SharedService } from './admin-page/shared.service';
import { MultiSelectModule } from 'primeng/multiselect';

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
    ChampionshipDashboardComponent,
    CarDashboardComponent,
    PilotDashboardComponent,
    TeamDashboardComponent,
    PreparerDashboardComponent,
    RaceDashboardComponent,
    UserDashboardComponent,
    StatisticsDashboardComponent,
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
    MultiSelectModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
      },
    }),
    RouterModule,
  ],
  providers: [DialogService, ChampionshipService, MessageService, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
