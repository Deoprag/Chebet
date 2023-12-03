import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../chebet/service/shared.service';

@Component({
  selector: 'admin-side-nav',
  templateUrl: './admin-side-nav.component.html',
  styleUrls: ['./admin-side-nav.component.css']
})
export class AdminSideNavComponent {
  selectedDashboard: string = 'statistics';

  constructor(private sharedService: SharedService) {
    this.selectDashboard('statistics');
  }

  selectDashboard(dashboard: string) {
    this.selectedDashboard = dashboard;
    this.sharedService.selectDashboard(`${dashboard}-dashboard`);
  }
}
