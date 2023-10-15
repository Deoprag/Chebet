import { Injectable } from '@angular/core';
import { Gender } from '../domain/Gender';

@Injectable({
  providedIn: 'root'
})
export class GenderService {
  getGenders() {
    return [
      { name: 'Masculino', code: 'M' },
      { name: 'Feminino', code: 'F' },
      { name: 'Outro', code: 'O' }
    ];
  }

  getGender(genderCode: string): Gender | null {
    const genders = this.getGenders();
    const foundGender = genders.find(g => g.code === genderCode.toUpperCase());
  
    return foundGender || null;
  }
}
