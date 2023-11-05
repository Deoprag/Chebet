import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceDashboardComponent } from './race-dashboard.component';

describe('RaceDashboardComponent', () => {
  let component: RaceDashboardComponent;
  let fixture: ComponentFixture<RaceDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RaceDashboardComponent]
    });
    fixture = TestBed.createComponent(RaceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
