import { Component } from '@angular/core';
import { UserService } from '../service/userService';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent {

  visible: boolean = false;

  constructor(private userService: UserService, private messageService: MessageService) { }
  
  showModal() {
    this.visible = true;
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Usuário ou senha incorretos!' });
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Logado com sucesso!' });
  }
  
  showWarn() {
    this.messageService.add({ severity: 'warn', summary: 'Ops...', detail: 'Preencha todos os campos!' });
  }

  login(username: any, password: any) {
    console.log(username, password)
    if (isBlank(username) || isBlank(password)) {
      this.showWarn();
    } else {
      this.userService.login(username, password)
      .subscribe(
        (response: any) => {
          const token = response.token;
          console.log(token);
          
          localStorage.setItem('token', token);
          this.showSuccess();
        },
        (error) => {
          console.log("erro!");
          this.showError();
        }
        );
    }
  }
}

function isBlank(value: string | null | undefined): boolean {
  return value === null || value === undefined || value.trim() === '';
}
