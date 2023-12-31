import { Component, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Gender } from '../../chebet/model/Gender';
import { User } from '../../chebet/model/User';
import { GenderService } from '../../chebet/service/GenderService';
import { UserService } from '../../chebet/service/UserService';

@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers: [UserService]
})

export class EditUserComponent {
  userForm!: NgForm;
  genders: Gender[] | undefined;
  user: User | undefined;
  visible: boolean = false;

  constructor(genderService: GenderService, private userService: UserService, private renderer: Renderer2, private messageService: MessageService, private router: Router) {
    this.genders = genderService.getGenders();

    const token = localStorage.getItem('token');
    var sub = '';

    if (token) {
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      sub = tokenData.sub;

      userService.findByUsername(sub).subscribe(
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
  }

  changeModal() {
    this.visible = !this.visible;
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

  updateEmail(event: any) {
    if (this.user) {
      this.user.email = event.target.value;
    }
  }

  updatePhoneNumber(event: any) {
    if (this.user) {
      this.user.phoneNumber = event.target.value;
    }
  }
  updateGender(event: any) {
    if (this.user) {
      this.user.gender = event.target.value;
    }
  }
  
  update() {
    if (this.user) {
      if (this.checkFields()) {
        this.userService.update(this.user)
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
      } else {
        this.showWarn("Você precisa preencher todos os campos!")
      }
    }
  }

  deleteAccount() {
    if(this.user) {
      this.userService.delete(this.user)
      .subscribe(
        (response: any) => {
          this.showSuccess("Apagado com sucesso!");
          localStorage.removeItem('token');
          setTimeout(() => {
            this.router.navigate(['/main-content']);
          }, 2000);
        },  
        (error: any) => {
          this.showError(error.error.message);
        }
        );
      }
      this.visible = false;
    }

  checkFields() {
    if (this.user) {
      if (this.isBlank(this.user.email) || this.isBlank(this.user.phoneNumber)) {
        return false;
      }
      return true;
    }
    return false;
  }

  isBlank(value: string | null | undefined): boolean {
    return value === null || value === undefined || value.trim() === '';
  }
}
