import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SharedService {
  private selectedDashboardSubject = new BehaviorSubject<string>(''); // Inicialmente, nenhum painel selecionado
  selectedDashboard$: Observable<string> = this.selectedDashboardSubject.asObservable();

  selectDashboard(dashboard: string) {
    this.selectedDashboardSubject.next(dashboard);
  }
}