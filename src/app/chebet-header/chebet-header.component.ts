import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'chebet-header',
  templateUrl: './chebet-header.component.html',
  styleUrls: ['./chebet-header.component.css']
})

export class ChebetHeaderComponent {
  constructor(public dialogService: DialogService) {}

  showLoginDialog() {
    const dialogRef = this.dialogService.open(LoginModalComponent, {
      header: 'Teste',
      modal: true,
      style: { width: '50vw' },
      draggable: false,
      resizable: true,
    });
  }
}
