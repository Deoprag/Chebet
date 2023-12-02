import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Observable, interval } from 'rxjs';
import { User } from 'src/app/chebet/model/User';
import { AuthService } from 'src/app/chebet/service/AuthService';
import { UserService } from 'src/app/chebet/service/UserService';


@Component({
  selector: 'user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css'],
  providers: [MessageService, AuthService]
})

export class UserHeaderComponent implements OnInit{
  user!: User | undefined;
  items!: MenuItem[] | any;

  constructor(private userService: UserService, private messageService: MessageService){}

  ngOnInit() {
    const token = localStorage.getItem('token');
    var sub = '';

    if (token) {
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      sub = tokenData.sub;

      this.userService.findByUsername(sub).subscribe(
        (user: User | undefined) => {
          this.user = user;
          if (this.user) {
          }
        },
        (error: any) => {
          console.error('Erro ao buscar o usuário:', error);
        }
      );
    } else {
      this.user = undefined;
    }

    this.items = [
      {
          label: 'Depositar',
          icon: 'pi pi-plus',
          command: () => {

          }
      },
      {
          label: 'Sacar',
          icon: 'pi pi-minus',
          command: () => {

          }
      },
      {
          label: 'Perfil',
          icon: 'pi pi-user-edit',
          command: () => {
              this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
          }
      },
      {
        separator: true
      },
      {
          label: 'Sair',
          icon: 'pi pi-sign-out',
          command: () => {
            this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
        }      
      },
  ];
}
}