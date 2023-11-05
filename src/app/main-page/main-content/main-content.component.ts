import { Component } from '@angular/core';
import { Championship } from '../../chebet/model/Championship';
import { ChampionshipService } from '../../chebet/service/ChampionshipService';

@Component({
  selector: 'main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent {
  championships!: Championship[];

  constructor(private championshipService: ChampionshipService) {}

  ngOnInit() {
      this.championshipService.getChampionships().then((data) => {
          this.championships = data;
      });
  }

  showChampionship() {
    
  }
}
