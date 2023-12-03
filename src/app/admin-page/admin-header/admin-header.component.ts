import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { User } from 'src/app/chebet/model/User';
import { UserService } from 'src/app/chebet/service/UserService';

@Component({
  selector: 'admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
  items!: MenuItem[] | any;
  user!: User;

  constructor(private router: Router, private userService: UserService) {}
  
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
          }
        },
        (error: any) => {
          console.error('Erro ao buscar o usuário:', error);
        }
      );
    }
  }

  ngOnInit() {
    this.updateUser();
    const token = localStorage.getItem('token');
    var tokenData = JSON.parse(atob(token!.split('.')[1]));

    this.items = [
      {
        label: 'Trocar Menu',
        icon: 'pi pi-arrow-right-arrow-left',
        command: () => {
            this.router.navigate(['/user-content']);
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
}
