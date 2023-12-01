import { Component } from '@angular/core';
import { AuthService } from '../../chebet/service/AuthService';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { SharedService } from '../shared.service';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  providers: [AuthService, SharedService]
})
export class AdminDashboardComponent {
  isUserLoggedIn = !this.authService.isTokenExpired();
  isAdmin = this.authService.isAdmin();
  selectedDashboard: string = 'statistics-dashboard';

  constructor(private authService: AuthService, private router: Router, private sharedService: SharedService) {}
  
  ngOnInit() {
    interval(5000).subscribe(() => {
      this.checkAuthentication();
    });
    this.sharedService.selectedDashboard$.subscribe((dashboard) => {
      this.selectedDashboard = dashboard;
    });
  }

  checkAuthentication() {
    this.isUserLoggedIn = !this.authService.isTokenExpired();
    this.isAdmin = this.authService.isAdmin();

    if(this.isUserLoggedIn && this.isAdmin) {
      this.router.navigate(['/admin-dashboard'])
    } else if (this.isUserLoggedIn && !this.isAdmin) {
      this.router.navigate(['/user-content'])
    } else {
      this.router.navigate(['/main-content'])
    }
  }
}
