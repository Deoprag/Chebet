import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Gender } from '../domain/Gender';
import { UserService } from '../service/UserService';
import { last } from 'rxjs';
import { GenderService } from '../service/GenderService';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [DatePipe]
})
export class SignupComponent {
  visible: boolean = false;
  value: string | undefined;
  genders: Gender[] | undefined;
  birthDate: any;
  userTerms: boolean = false;

  constructor(private messageService: MessageService, private datePipe: DatePipe, private userService: UserService, private genderService: GenderService) {
    this.genders = genderService.getGenders();
  }

  acceptTerms() {
    this.userTerms = !this.userTerms;
  }

  updateDate(event: any) {
    this.birthDate = event ? this.datePipe.transform(event, 'dd/MM/yyyy') : '';
  }

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

  signUp(firstName: any, lastName: any, email: any, cpf: any, gender: any, password: any, passwordConfirmation: any, phoneNumber: any) {
    if (checkFields(firstName, lastName, email, cpf, gender, password, passwordConfirmation, this.birthDate, phoneNumber)) {
      if (!this.userTerms) {
        this.showWarn("Você precisa aceitar os termos de uso para continuar!");
      } else {
        this.userService.signUp(firstName, lastName, email, cpf, gender, password, this.birthDate, phoneNumber)
        .subscribe(
          (response: any) => {
            this.showSuccess("Cadastrado com sucesso!");
            this.visible = false;
            clearFields();
          },
          (error) => {
            if(error.status === 0) {
              this.showError("Erro desconhecido, tente novamente mais tarde.");
            } else {
              // Tratar erros de inserção do usuário
            }
          }
          );
      }
    } else {
      this.showWarn("Preencha todos os campos!");
    }
  }
}

function clearFields() {
    
}

function checkFields(firstName: string, lastName: string, cpf: string, email: string, 
  password: string, passwordConfirmation: string, birthDate: any, gender: string, phoneNumber: string): boolean {
  if (!firstName || !lastName || !cpf || !email || !password ||
    !passwordConfirmation || !birthDate || !gender || !phoneNumber) {
    return false;
  }
  return true;
}
