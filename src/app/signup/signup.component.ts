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
      { name: 'Não-Binário', code: 'NB' },
      { name: 'Gênero Fluido', code: 'GF' },
      { name: 'Transgênero', code: 'T' },
      { name: 'Intersexo', code: 'I' },
      { name: 'Agênero', code: 'AG' },
      { name: 'Demigênero', code: 'DG' },
      { name: 'Neutrois', code: 'NT' },
      { name: 'Andrógino', code: 'AN' },
      { name: 'Bigênero', code: 'BG' },
      { name: 'Dois Espíritos', code: 'DE' },
      { name: 'Outro', code: 'O' },
    ];    
  }

  showModal() {
    this.visible = true;
  }

  signUp() {

  }
}
