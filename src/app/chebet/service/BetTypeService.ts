import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BetTypeService {
  getBetTypes() {
    return [
      { code: 'SimpleVictory', name: 'Vitória Simples'},
      { code: 'BrokenCar', name: 'Carro Quebrado' },
      { code: 'SimplePosition', name: 'Posição Simples'},
      { code: 'AverageTime', name: 'Tempo Médio'},
      { code: 'HeadToHead', name: '1 Contra 1'}
    ];
  }
}
