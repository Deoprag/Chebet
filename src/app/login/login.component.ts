import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiService } from '../service/ApiService';
import { UserService } from '../service/UserService';
import { Router } from '@angular/router';
import { AuthService } from '../service/AuthService';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService, ApiService, AuthService]
})
export class LoginComponent {

  visible: boolean = false;

  constructor(private userService: UserService, private messageService: MessageService, private router: Router, private authService: AuthService) { }
  
  showModal() {
    this.visible = true;
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

  login(username: any, password: any) {
    if (isBlank(username) || isBlank(password)) {
      this.showWarn("Preencha todos os campos!");
    } else {
      this.userService.login(username, password)
      .subscribe(
        (response: any) => {
          const token = response.token;            
          localStorage.setItem('token', token);
          this.visible = false;
          this.showSuccess("Logado com sucesso!");
          const tokenData = JSON.parse(atob(token.split('.')[1]));
          if(!this.authService.isAdmin()) {
            this.router.navigate(['/edit-user'])
          } else if (this.authService.isAdmin()) {
            this.router.navigate(['/admin-dashboard'])
          } else {
            this.showError("Erro desconhecido, tente novamente mais tarde.");
          }
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
}

function isBlank(value: string | null | undefined): boolean {
  return value === null || value === undefined || value.trim() === '';
}
