import { Component } from '@angular/core';
import { AuthService } from '../../chebet/service/AuthService';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { SharedService } from '../../chebet/service/shared.service';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  providers: [AuthService, SharedService]
})
export class AdminDashboardComponent {
  private intervalSubscription!: Subscription;
  isUserLoggedIn = !this.authService.isTokenExpired();
  isAdmin = this.authService.isAdmin();
  selectedDashboard: string = 'statistics-dashboard';

  constructor(private authService: AuthService, private router: Router, private sharedService: SharedService) {}
  
  ngOnInit() {
    this.checkAuthentication();
    this.intervalSubscription = interval(5000).subscribe(() => {
      this.checkAuthentication();
    });
    this.sharedService.selectedDashboard$.subscribe((dashboard) => {
      this.selectedDashboard = dashboard;
    });
  }

  ngOnDestroy() {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
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
