import { Component } from '@angular/core';
import { Championship } from 'src/app/chebet/model/Championship';
import { Race } from 'src/app/chebet/model/Race';
import { Ranking } from 'src/app/chebet/model/Ranking';
import { ChampionshipService } from 'src/app/chebet/service/ChampionshipService';
import { RaceService } from 'src/app/chebet/service/RaceService';

@Component({
  selector: 'statistics-dashboard',
  templateUrl: './statistics-dashboard.component.html',
  styleUrls: ['./statistics-dashboard.component.css']
})
export class StatisticsDashboardComponent {
  rankings!: Ranking[];
  championships!: Championship[];
  selectedChampionship!: Championship;
  races!: Race[];

  constructor(private championshipService: ChampionshipService, private raceService: RaceService) {
    this.championshipService.findAll().subscribe((championships) => {
      this.championships = [];
      championships.forEach(championship => {
        if(championship.finished) {
          this.championships.push(championship);
        }
      });
    });
  }

  updateSelectedChampionship(event: any) {
    this.selectedChampionship = event.value;
    this.raceService.findAllByChampionship(this.selectedChampionship).subscribe((races) => {
      this.races = races;
      this.rankings = [];
      this.races.forEach(race => {
        const ranking1 = new Ranking;
        const ranking2 = new Ranking;
        ranking1.pilot = race.pilot1;
        ranking1.time = race.pilot1Time;
        ranking1.broken = race.pilot1Broke;
        this.rankings.push(ranking1);
        
        ranking2.pilot = race.pilot2;
        ranking2.time = race.pilot2Time;
        ranking2.broken = race.pilot2Broke;
        this.rankings.push(ranking2);
      });
      this.rankings.sort((a, b) => {
        const timeA: string = this.convertTime(a.time);
        const timeB: string = this.convertTime(b.time);
      
        return timeA.localeCompare(timeB);
      });
      this.rankings.forEach((ranking, index) => {
        ranking.position = index + 1;
      });
    });
  }
  
  convertTime(stringTime: any) {
    if (stringTime) {
      const minute = Number(stringTime[1]);
      const second = Number(stringTime[2]);
      const millisecond = Number(stringTime[3]);
      const formattedMinute = minute.toString().padStart(2, '0');
      const formattedSecond = second.toString().padStart(2, '0');
      var formattedMillisecond = '000';
      if (millisecond) {
        formattedMillisecond = millisecond.toString().slice(0, 3);
      }
      const formattedTime = `${formattedMinute}:${formattedSecond}.${formattedMillisecond}`;

      return formattedTime;
    } else {
      return '';
    }
  }
}
