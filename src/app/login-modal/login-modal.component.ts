import { Component } from '@angular/core';


@Component({
  selector: 'login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  visible: boolean = false;

  showModal() {
    this.visible = true;
  }
}
