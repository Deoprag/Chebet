import { Component } from '@angular/core';
import { Championship } from '../domain/championship';
import { ChampionshipService } from '../service/championshipService';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})

export class MainHeaderComponent {
  championships!: Championship[];

  constructor(private championshipService: ChampionshipService) {}

  ngOnInit() {
      this.championshipService.getChampionships().then((data) => {
          this.championships = data;
      });
  }
}
