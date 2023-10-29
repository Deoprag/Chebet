import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
    formatDate(dataArray: any) {
        const ano = dataArray[0];
        const mes = dataArray[1] - 1;
        const dia = dataArray[2];

        return new Date(ano, mes, dia);
        }
}
