import { Component, OnInit } from '@angular/core';
import { User } from '../../../chebet/model/User';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../chebet/service/UserService';
import { Table } from 'primeng/table';

@Component({
  selector: 'user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  providers: [MessageService]
})
export class UserDashboardComponent implements OnInit {

  deleteModal = false;

  registerUserModal = false;

  users!: User[]

  userToDelete!: User;

  indexToDelete!: number;

  clonedUsers: { [s: string]: User } = {};

  constructor(private messageService: MessageService, private userService: UserService) {}

  ngOnInit() {
    this.refreshList();
  }

  refreshList() {
    this.userService.findAll().subscribe((users) => {
      this.users = users;
    });
  }

  changeRegisterModal() {
    this.registerUserModal = !this.registerUserModal;
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Erro!', detail: message });
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: message });
  }

  showWarn(message: string) {
    this.messageService.add({ severity: 'warn', summary: 'Ops...', detail: message });
  }

  onRowEditInit(user: User) {
    this.clonedUsers[user.id as unknown as string] = { ...user };
  }

  clear(table: Table) {
    table.clear();
  }

  changePassword(user: User) {
    this.userService.update(user)
    .subscribe(
      (response: any) => {
        this.showSuccess("Atualizado com sucesso!");
      },
      (error) => {
        console.log(error);
        if(error.status === 0) {
          this.showError("Erro desconhecido, tente novamente mais tarde.");
        } else {
          this.showError(error.error.message);
        }
      }
    );
  }

  formatNumber(number: any) {
    return `(${number.substring(0, 2)}) ${number.substring(2, 7)}-${number.substring(7)}`;
  }

  formatDate(arrayDate: any) {
    return `${this.padZero(arrayDate[2])}/${this.padZero(arrayDate[1])}/${arrayDate[0]}`
  }

  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}
