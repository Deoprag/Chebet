import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Pilot } from 'src/app/chebet/model/Pilot';
import { Race } from 'src/app/chebet/model/Race';
import { PilotService } from 'src/app/chebet/service/PilotService';
import { RaceService } from 'src/app/chebet/service/RaceService';

@Component({
  selector: 'race-dashboard',
  templateUrl: './race-dashboard.component.html',
  styleUrls: ['./race-dashboard.component.css'],
  providers: [DatePipe]
})
export class RaceDashboardComponent {
  
  deleteModal = false;
  registerRaceModal = false;
  races!: Race[];
  clonedRaces: { [s: string]: Race } = {};
  pilot1Broke = false;
  pilot2Broke = false;

  constructor(private messageService: MessageService, private raceService: RaceService, private pilotService: PilotService, private datePipe: DatePipe) {}

  ngOnInit() {
    this.refreshList();
  }

  refreshList() {
    this.raceService.findAll().subscribe((races) => {
      this.races = races;
    });
  }

  changePilot1Broke() {
    this.pilot1Broke = !this.pilot1Broke;
    console.log(this.pilot1Broke);
  }
  
  changePilot2Broke() {
    this.pilot2Broke = !this.pilot2Broke;
    console.log(this.pilot2Broke);
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

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Erro!', detail: message });
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: message });
  }

  showWarn(message: string) {
    this.messageService.add({ severity: 'warn', summary: 'Ops...', detail: message });
  }

  onRowEditInit(race: Race) {
    this.clonedRaces[race.id as unknown as string] = { ...race };
    this.pilot1Broke = race.pilot1Broke;
    this.pilot2Broke = race.pilot2Broke;
  }

  onRowEditSave(race: Race, index: number) {
    this.races[index] = this.clonedRaces[race.id as unknown as string];
    if ((race.pilot1Time || this.pilot1Broke) && (race.pilot2Time || this.pilot2Broke)) {
      if(Array.isArray(race.pilot1Time)) {
        race.pilot1Time = this.convertTime(race.pilot1Time);
      }
      if(Array.isArray(race.pilot2Time)) {
        race.pilot2Time = this.convertTime(race.pilot2Time);
      }
      race.pilot1Broke = this.pilot1Broke;
      if(this.pilot1Broke) {
        race.pilot1Time = '09:59.999'
      }
      race.pilot2Broke = this.pilot2Broke;
      if(this.pilot2Broke) {
        race.pilot2Time = '09:59.999'
      }

      this.raceService.update(race)
      .subscribe(
        (response: any) => {
          this.showSuccess("Atualizado com sucesso!");
          this.refreshList();
        },
        (error) => {
          delete this.clonedRaces[race.id as unknown as string];
          this.showError(error.error.message);
        }
        );
    } else {
      this.showError('Preencha todos os campos!');
  }
}

  onRowEditCancel(race: Race, index: number) {
    this.races[index] = this.clonedRaces[race.id as unknown as string];
    delete this.clonedRaces[race.id as unknown as string];
    this.pilot1Broke = false;
    this.pilot2Broke = false;
  }
}
