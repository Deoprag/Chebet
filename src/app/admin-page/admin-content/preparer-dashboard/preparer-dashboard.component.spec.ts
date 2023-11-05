import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreparerDashboardComponent } from './preparer-dashboard.component';

describe('PreparerDashboardComponent', () => {
  let component: PreparerDashboardComponent;
  let fixture: ComponentFixture<PreparerDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreparerDashboardComponent]
    });
    fixture = TestBed.createComponent(PreparerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
