import { Component } from '@angular/core';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  visible: boolean = false;

  showModal() {
    this.visible = true;
  }

  login() {

  }
}
