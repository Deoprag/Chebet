import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private selectedDashboardSubject = new BehaviorSubject<string>('');
  selectedDashboard$: Observable<string> = this.selectedDashboardSubject.asObservable();
  private selectedSubject = new BehaviorSubject<string>('');
  selected$ = this.selectedSubject.asObservable();

  selectDashboard(dashboard: string) {
    this.selectedDashboardSubject.next(dashboard);
  }

  updateSelected(selected: string) {
    this.selectedSubject.next(selected);
  }
}