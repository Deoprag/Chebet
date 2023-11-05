import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PilotDashboardComponent } from './pilot-dashboard.component';

describe('PilotDashboardComponent', () => {
  let component: PilotDashboardComponent;
  let fixture: ComponentFixture<PilotDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PilotDashboardComponent]
    });
    fixture = TestBed.createComponent(PilotDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
