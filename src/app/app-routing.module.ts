import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-page/admin-dashboard/admin-dashboard.component';
import { MainContentComponent } from './main-page/main-content/main-content.component';
import { UserContentComponent } from './user-page/user-content/user-content.component';

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
  { path: 'user-content',
    component: UserContentComponent
  },
  { 
    path: 'admin-dashboard', 
    component: AdminDashboardComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
