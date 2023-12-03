import { Injectable } from '@angular/core';
import { TransactionType } from '../model/TransactionType';

@Injectable({
  providedIn: 'root'
})
export class TransactionTypeService {
  getTransactionTypes() {
    return [
      { name: 'Deposito' },
      { name: 'Saque'},
      { name: 'Aposta' },
      { name: 'Pagamento' }
    ];
  }
}
