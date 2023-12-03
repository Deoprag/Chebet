import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Transaction } from 'src/app/chebet/model/Transaction';
import { TransactionType } from 'src/app/chebet/model/TransactionType';
import { User } from 'src/app/chebet/model/User';
import { TransactionService } from 'src/app/chebet/service/TransactionService';
import { TransactionTypeService } from 'src/app/chebet/service/TransactionTypeService';
import { UserService } from 'src/app/chebet/service/UserService';

@Component({
  selector: 'transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
  providers: [DatePipe]
})
export class TransactionsComponent {
  transactions!: Transaction[];
  transactionTypes!: TransactionType[];
  user !: User;
  deleteModal: boolean = false;
  clonedTransactions: { [s: string]: Transaction } = {};
  transactionToDelete!: Transaction;
  indexToDelete!: number;

  constructor(private messageService: MessageService, private transactionService: TransactionService, private userService: UserService, private datePipe: DatePipe, private transactionTypeService: TransactionTypeService) {}

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Erro!', detail: message });
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: message });
  }

  showWarn(message: string) {
    this.messageService.add({ severity: 'warn', summary: 'Ops...', detail: message });
  }

  ngOnInit() {
    this.transactionTypes = this.transactionTypeService.getTransactionTypes();
    this.updateUser();
  }

  capitalizeFirstLetter(input: string): string {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }
  
  updateUser() {
    const token = localStorage.getItem('token');
    var sub = '';
    
    if (token) {
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      sub = tokenData.sub;
      
      this.userService.findByUsername(sub).subscribe(
        (user: User | undefined) => {
          if (user) {
            this.user = user;
            this.refreshList();
          }
        },
        (error: any) => {
          console.error('Erro ao buscar o usuário:', error);
        }
      );
    }
  }

  arrayToDate(dateArray: any): Date {
    if (dateArray.length > 4) {
      return new Date(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4], dateArray[5]);
    } else {
      return new Date(0,0,0);
    }
  }

  refreshList() {
    this.transactionService.findAllByUser(this.user).subscribe((transactions) => {
      this.transactions = transactions;
      console.log(this.transactions);
    });
  }

  changeDeleteModal() {
    this.deleteModal = !this.deleteModal;
  }

  deleteBet() {
    this.transactionService.delete(this.transactionToDelete)
    .subscribe(
      (response: any) => {
        this.showSuccess("Apagado com sucesso!");
        this.changeDeleteModal();
        this.refreshList();
        this.transactions[this.indexToDelete] = this.clonedTransactions[this.transactionToDelete.id as unknown as string];
        delete this.clonedTransactions[this.transactionToDelete.id as unknown as string];
      },  
      (error: any) => {
        console.log(error);
        if(error.status === 0) {
          this.showError("Erro desconhecido, tente novamente mais tarde.");
        } else {
          this.showError(error.error.message);
        }
        this.changeDeleteModal();
      }
    );
  }

  onRowDelete(transaction: Transaction, index: number) {
    this.transactionToDelete = transaction;
    this.indexToDelete = index;
    this.changeDeleteModal();
  }
}
