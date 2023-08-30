import { Component } from '@angular/core';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  visible: boolean = false;

  showModal() {
    this.visible = true;
  }

  signUp() {

  }
}
