import { Component } from '@angular/core';
import { Championship } from 'src/app/chebet/model/Championship';
import { Pilot } from 'src/app/chebet/model/Pilot';
import { ChampionshipService } from 'src/app/chebet/service/ChampionshipService';
import { PilotService } from 'src/app/chebet/service/PilotService';

@Component({
  selector: 'bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.css']
})
export class BetsComponent {
  championships!: Championship[];
  pilots!: Pilot[];
  
  constructor(private championshipService: ChampionshipService, private pilotService: PilotService) {
    this.refreshList();
  }

  refreshList() {
    this.championshipService.findAll().subscribe((championships) => {
      this.championships = championships;
    });
    this.pilotService.findAllActives().subscribe((pilots) => {
      this.pilots = pilots;
    });
  }

  arrayToDate(dateArray: any): Date {
    if (dateArray.length > 4) {
      return new Date(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4], dateArray[5]);
    } else {
      return new Date(0,0,0);
    }
  }

  bet(championship: Championship) {
    
  }
}
