import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChebetHeaderComponent } from './chebet-header.component';

describe('ChebetHeaderComponent', () => {
  let component: ChebetHeaderComponent;
  let fixture: ComponentFixture<ChebetHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChebetHeaderComponent]
    });
    fixture = TestBed.createComponent(ChebetHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
