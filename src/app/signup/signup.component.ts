import { Component, OnInit } from '@angular/core';

interface Genre {
  name: string;
  code: string;
}

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  visible: boolean = false;
  value: string | undefined;
  genres: Genre[] | undefined;
  selectedGenre: Genre | undefined;
  
  ngOnInit() {
    this.genres = [
      { name: 'Masculino', code: 'M' },
      { name: 'Feminino', code: 'F' },
      { name: 'Outro', code: 'O' },
    ];    
  }

  showModal() {
    this.visible = true;
  }

  signUp() {

  }
}
