import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionshipDashboardComponent } from './championship-dashboard.component';

describe('ChampionshipDashboardComponent', () => {
  let component: ChampionshipDashboardComponent;
  let fixture: ComponentFixture<ChampionshipDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChampionshipDashboardComponent]
    });
    fixture = TestBed.createComponent(ChampionshipDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
