import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../model/Transaction';
import { Observable } from 'rxjs';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(private http: HttpClient) { }
  
  findAllByUser(user: User): Observable<Transaction[]> {
    const url = `http://localhost:8080/api/transaction/${user.id}`;
    return this.http.get<Transaction[]>(url).pipe();
  }

  register(transaction: Transaction) {
    var transaction_type = transaction.transactionType.name;
    var value = transaction.value;
    var user_id = transaction.user.id;

    const url = `http://localhost:8080/api/transaction/`;
    return this.http.post(url, {
      transaction_type,
      value,
      user_id
    });
  }

  delete(transaction: Transaction) {
    const url = `http://localhost:8080/api/transaction/${transaction.id}`;
    return this.http.delete(url);
  }
}
