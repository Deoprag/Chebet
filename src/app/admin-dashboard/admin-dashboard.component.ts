import { Component } from '@angular/core';
import { AuthService } from '../service/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  providers: [AuthService]
})
export class AdminDashboardComponent {
  isUserLoggedIn = !this.authService.isTokenExpired();
  isAdmin = this.authService.isAdmin();
  
  constructor(private authService: AuthService, private router: Router) { }
  
  ngOnInit() {
    if(this.isUserLoggedIn && this.isAdmin) {
      this.router.navigate(['/admin-dashboard'])
    } else if (this.isUserLoggedIn && !this.isAdmin) {
      this.router.navigate(['/edit-user'])
    } else {
      this.router.navigate(['/main-content'])
    }
  }
}
