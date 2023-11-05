import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainContentComponent } from './main-page/main-content/main-content.component';
import { EditUserComponent } from './user-page/edit-user/edit-user.component';
import { AdminDashboardComponent } from './admin-page/admin-dashboard/admin-dashboard.component';
import { CarDashboardComponent } from './admin-page/admin-content/car-dashboard/car-dashboard.component';
import { ChampionshipDashboardComponent } from './admin-page/admin-content/championship-dashboard/championship-dashboard.component';
import { PilotDashboardComponent } from './admin-page/admin-content/pilot-dashboard/pilot-dashboard.component';
import { PreparerDashboardComponent } from './admin-page/admin-content/preparer-dashboard/preparer-dashboard.component';
import { RaceDashboardComponent } from './admin-page/admin-content/race-dashboard/race-dashboard.component';
import { StatisticsDashboardComponent } from './admin-page/admin-content/statistics-dashboard/statistics-dashboard.component';
import { TeamDashboardComponent } from './admin-page/admin-content/team-dashboard/team-dashboard.component';
import { UserDashboardComponent } from './admin-page/admin-content/user-dashboard/user-dashboard.component';
import { Pilot } from './chebet/model/Pilot';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'main-content', 
    pathMatch: 'full'
  },
  { 
    path: 'main-content', 
    component: MainContentComponent 
  },
  { path: 'edit-user',
    component: EditUserComponent
  },
  { 
    path: 'admin-dashboard', 
    component: AdminDashboardComponent,
  },
  // {
  //   path: 'statistics-dashboard',
  //   component: StatisticsDashboardComponent,
  //   outlet: 'adminOutlet',
  // },
  // {
  //   path: 'championship-dashboard',
  //   component: ChampionshipDashboardComponent,
  //   outlet: 'adminOutlet',
  // },
  // {
  //   path: 'pilot-dashboard',
  //   component: PilotDashboardComponent,
  //   outlet: 'adminOutlet',
  // },
  // {
  //   path: 'team-dashboard',
  //   component: TeamDashboardComponent,
  //   outlet: 'adminOutlet',
  // },
  // {
  //   path: 'car-dashboard',
  //   component: CarDashboardComponent,
  //   outlet: 'adminOutlet',
  // },
  // {
  //   path: 'preparer-dashboard',
  //   component: PreparerDashboardComponent,
  //   outlet: 'adminOutlet',
  // },
  // {
  //   path: 'race-dashboard',
  //   component: RaceDashboardComponent,
  //   outlet: 'adminOutlet',
  // },
  // {
  //   path: 'user-dashboard',
  //   component: UserDashboardComponent,
  //   outlet: 'adminOutlet',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
