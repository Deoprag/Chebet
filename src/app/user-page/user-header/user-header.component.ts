import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Transaction } from 'src/app/chebet/model/Transaction';
import { TransactionType } from 'src/app/chebet/model/TransactionType';
import { User } from 'src/app/chebet/model/User';
import { AuthService } from 'src/app/chebet/service/AuthService';
import { TransactionService } from 'src/app/chebet/service/TransactionService';
import { TransactionTypeService } from 'src/app/chebet/service/TransactionTypeService';
import { UserService } from 'src/app/chebet/service/UserService';
import { SharedService } from 'src/app/chebet/service/shared.service';


@Component({
  selector: 'user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css'],
  providers: [MessageService, AuthService]
})

export class UserHeaderComponent implements OnInit{
  user!: User;
  transaction!: Transaction;
  items!: MenuItem[] | any;
  value!: number;
  depositSidebar: boolean = false;
  isAdmin: boolean = false;
  withdrawSidebar: boolean = false;
  transactionTypes!: TransactionType[];
  paymentOptions: any[] = [
    { name: 'PIX', value: 1 },
    { name: 'Débito', value: 2 },
    { name: 'Crédito', value: 3 }
  ];
  @Output() selectedEvent = new EventEmitter<string>();

  constructor(private userService: UserService, private messageService: MessageService, private router: Router, private sharedService: SharedService, private transactionService: TransactionService, private transactionTypeService: TransactionTypeService){}

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Erro!', detail: message });
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: message });
  }

  showWarn(message: string) {
    this.messageService.add({ severity: 'warn', summary: 'Ops...', detail: message });
  }

  updateUser() {
    const token = localStorage.getItem('token');
    this.transactionTypes = this.transactionTypeService.getTransactionTypes();
    var sub = '';

    if (token) {
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      sub = tokenData.sub;

      this.userService.findByUsername(sub).subscribe(
        (user: User | undefined) => {
          if (user) {
            this.user = user;
          }
        },
        (error: any) => {
          console.error('Erro ao buscar o usuário:', error);
        }
      );
    }
  }

  ngOnInit() {
    this.select('bets');
    this.updateUser();
    const token = localStorage.getItem('token');
    var tokenData = JSON.parse(atob(token!.split('.')[1]));

    this.items = [
      {
        label: 'Apostar',
        icon: 'pi pi-money-bill',
        command: () => {
            this.select('bets')
        }
      },
      {
          label: 'Depositar',
          icon: 'pi pi-plus',
          command: () => {
            this.changeDepositSidebar();
          }
        },
        {
          label: 'Sacar',
          icon: 'pi pi-minus',
          command: () => {
            this.changeWithdrawSidebar();
          }
      },
      {
          label: 'Perfil',
          icon: 'pi pi-user-edit',
          command: () => {
              this.select('edit-user')
          }
      },
      {
          label: 'Extrato',
          icon: 'pi pi-book',
          command: () => {
              this.select('transactions')
          }
      },
      {
        label: 'Trocar Menu',
        icon: 'pi pi-arrow-right-arrow-left',
        command: () => {
            this.router.navigate(['/admin-dashboard']);
        },
        visible: tokenData.role === 'admin' ? true : false
      },
      {
        separator: true
      },
      {
          label: 'Sair',
          icon: 'pi pi-sign-out',
          command: () => {
            localStorage.removeItem('token');
            this.router.navigate(['/main-content']);
        }      
      }
    ];
  }

  changeDepositSidebar() {
    this.depositSidebar = !this.depositSidebar;
  }

  changeWithdrawSidebar() {
    this.withdrawSidebar = !this.withdrawSidebar;
  }

  select(option: string) {
    this.sharedService.updateSelected(option);
  }

  addDeposit(value: any) {
    this.transaction = new Transaction;
    this.transaction.transactionType = this.transactionTypes[0];
    this.transaction.user = this.user;
    this.transaction.value = value;

    if(value > 0) {
      this.transactionService.register(this.transaction)
      .subscribe(
        (response: any) => {
          this.showSuccess("Valor depositado com sucesso!");
          this.updateUser();
          this.changeDepositSidebar();
        },
        (error) => {
          if(error.status === 0) {
            this.showError("Erro desconhecido, tente novamente mais tarde.");
          } else {
            this.showError(error.error.message);
          }
        }
        );
      } else {
        this.showWarn("O valor mínimo para deposito é de R$1,00");
      }
  }

  addWithdraw(value: any) {
    this.transaction = new Transaction;
    this.transaction.transactionType = this.transactionTypes[1];
    this.transaction.user = this.user;
    this.transaction.value = value;

    this.transactionService.register(this.transaction)
        .subscribe(
          (response: any) => {
            this.showSuccess("Valor sacado com sucesso!");
            this.updateUser();
            this.changeWithdrawSidebar();
          },
          (error) => {
            if(error.status === 0) {
              this.showError("Erro desconhecido, tente novamente mais tarde.");
            } else {
              this.showError(error.error.message);
            }
          }
        );
  }
}