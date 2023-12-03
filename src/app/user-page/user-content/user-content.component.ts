import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { AuthService } from 'src/app/chebet/service/AuthService';
import { SharedService } from 'src/app/chebet/service/shared.service';

@Component({
  selector: 'user-content',
  templateUrl: './user-content.component.html',
  styleUrls: ['./user-content.component.css'],
  providers: [AuthService]
})
export class UserContentComponent implements OnInit, OnDestroy {
  private intervalSubscription!: Subscription;
  @Input() selected: string = '';
  
  constructor(private authService: AuthService, private router: Router, private sharedService: SharedService) {}

  ngOnInit() {
    this.intervalSubscription = interval(5000).subscribe(() => {
      this.checkAuthentication();
    });
    this.sharedService.selected$.subscribe(selected => {
      this.selected = selected;
    });
  }

  ngOnDestroy() {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  checkAuthentication() {
    var isUserLoggedIn = !this.authService.isTokenExpired();
  
    if(isUserLoggedIn) {
      this.router.navigate(['/user-content'])
    } else {
      this.router.navigate(['/main-content'])
    }
    }
}
