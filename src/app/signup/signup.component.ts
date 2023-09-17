import { Component } from '@angular/core';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  visible: boolean = false;
  value: string | undefined;

  showModal() {
    this.visible = true;
  }

  signUp() {

  }
}
