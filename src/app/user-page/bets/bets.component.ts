import { ChangeDetectorRef, Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BetType } from 'src/app/chebet/model/BetType';
import { Championship } from 'src/app/chebet/model/Championship';
import { Pilot } from 'src/app/chebet/model/Pilot';
import { User } from 'src/app/chebet/model/User';
import { ChampionshipService } from 'src/app/chebet/service/ChampionshipService';
import { BetTypeService } from 'src/app/chebet/service/BetTypeService';
import { PilotService } from 'src/app/chebet/service/PilotService';
import { UserService } from 'src/app/chebet/service/UserService';
import { AuthService } from 'src/app/chebet/service/AuthService';
import { Race } from 'src/app/chebet/model/Race';
import { RaceService } from 'src/app/chebet/service/RaceService';
import { Bet } from 'src/app/chebet/model/Bet';
import { SimpleVictory } from 'src/app/chebet/model/SimpleVictory';
import { BrokenCar } from 'src/app/chebet/model/BrokenCar';
import { SimplePosition } from 'src/app/chebet/model/SimplePosition';
import { AverageTime } from 'src/app/chebet/model/AverageTime';
import { HeadToHead } from 'src/app/chebet/model/HeadToHead';
import { BetService } from 'src/app/chebet/service/BetService';

@Component({
  selector: 'bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.css'],
  providers: [MessageService, AuthService]
})
export class BetsComponent {
  championships!: Championship[];
  championship!: Championship;
  pilots!: Pilot[];
  betSidebar = false;
  showOneBet = false;
  history = false;
  bets!: Bet[];
  selectedBet!: Bet;
  betTypes!: BetType[];
  selectedBetType!: BetType;
  pilot1!: Pilot;
  pilot2!: Pilot;
  position!: number;
  positions!: number[];
  race!: Race;
  races!: Race[];
  racePilots!: Pilot[];
  user!: User;
  time1: number = 0;
  time2: number = 5;
  name: string = '';
  value: any;
  
  constructor(private championshipService: ChampionshipService, private pilotService: PilotService, private userService: UserService, private messageService: MessageService, private betTypeService: BetTypeService, private raceService: RaceService, private betService: BetService) {
    this.updateUser();
    this.refreshList();
  }

  loadPilots(championship: Championship) {
    this.pilotService.findAllByChampionship(championship).subscribe((pilots) => {
      this.pilots = pilots;
    });
  }
  
  loadRaces(championship: Championship) {
    this.raceService.findAllByChampionship(championship).subscribe((races) => {
      this.races = races;
    });
  }

  loadBets() {
    this.betService.findAllByUser(this.user).subscribe((bets) => {
      this.bets = bets;
    });
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

  updateUser() {
    const token = localStorage.getItem('token');
    this.betTypes = this.betTypeService.getBetTypes();
    var sub = '';

    if (token) {
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      sub = tokenData.sub;

      this.userService.findByUsername(sub).subscribe(
        (user: User) => {
          this.user = user;
          this.betService.findAllByUser(this.user).subscribe((bets) => {
            this.bets = bets;
          });
        },
        (error: any) => {
          console.error('Erro ao buscar o usuário:', error);
        }
      );
    }
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

  startBet(championship: Championship) {
    this.betSidebar = !this.betSidebar;
    this.championship = championship;
    this.name = championship.name;
    this.loadRaces(championship);
  }

  updateSecondValue() {
    this.time2 = this.time1 + 5;
  }

  formatSecondsToTime(seconds: any): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedTime = `${this.padZero(minutes)}:${this.padZero(remainingSeconds)}`;
    return formattedTime;
  }

  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  updateSelectedBet(event: any) {
    this.selectedBetType = event.value;
  }
  
  updateSelectedPilot1(event: any) {
    this.pilot1 = event.value;
    this.positions = Array.from({ length: this.championship.pilots.length }, (_, index) => index + 1);
  }

  updateSelectedPilot2(event: any) {
    this.pilot2 = event.value;
  }

  updateSelectedRace() {
    this.racePilots = [this.race.pilot1, this.race.pilot2];
  }

  updateWinner(event: any) {
    this.pilot1 = event.value;
    if (this.pilot1 === this.racePilots[0]) {
      this.pilot2 = this.racePilots[1];
    } else if (this.pilot1 === this.racePilots[1]) {
      this.pilot2 = this.racePilots[0];
    }
  }

  updateSelectedPosition(event: any) {
    this.position = event.value;
  }

  updateValue(event: any) {
    this.value = event;
  }

  confirmBet() {
    if (this.value >= 1) {
      const bet: Bet = new Bet;
      bet.betType = this.selectedBetType;
      bet.championship = this.championship;
      bet.user = this.user;
      const simpleVictory: SimpleVictory = new SimpleVictory;
      const brokenCar: BrokenCar = new BrokenCar;
      const simplePosition: SimplePosition = new SimplePosition;
      const averageTime: AverageTime = new AverageTime;
      const headToHead: HeadToHead = new HeadToHead;
      
      switch (this.selectedBetType.code) {
        case 'SimpleVictory':
          simpleVictory.championship = this.championship;
          simpleVictory.pilot = this.pilot1;
  
          break;
        case 'BrokenCar':
          brokenCar.championship = this.championship;
          brokenCar.pilot = this.pilot1;
  
          break;
        case 'SimplePosition':
          simplePosition.championship = this.championship;
          simplePosition.pilot = this.pilot1;
          simplePosition.position = this.position;
  
          break;
        case 'AverageTime':
          averageTime.championship = this.championship;
          averageTime.averageTime1 = `00:${this.formatSecondsToTime(this.time1)}`;
          averageTime.averageTime2 = `00:${this.formatSecondsToTime(this.time2)}`;
  
          break;
        case 'HeadToHead':
          headToHead.championship = this.championship;
          headToHead.race = this.race;
          headToHead.winner = this.pilot1;
          headToHead.loser = this.pilot2;
  
          break;
      }

      this.betService.register(bet, this.value, simpleVictory, brokenCar, simplePosition, averageTime, headToHead)
      .subscribe(
        (response: any) => {
          this.showSuccess("Aposta realizada com sucesso!"); 
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
        (error) => {
          this.showError(error.error.message);
        }
        );
        this.betSidebar = !this.betSidebar;
    } else {
      this.showWarn("Escolha um valor maior que R$1,00")
    }
  }

  convertBetType(betTypeUnformatted: any) {
    const lowercaseBetTypeUnformatted = betTypeUnformatted;
    const matchingBetType = this.betTypes.find(betType => betType.code.toLowerCase() === lowercaseBetTypeUnformatted);
    return matchingBetType?.name;
  }

  showHistory() {
    this.history = !this.history;
  }

  showBet(bet: Bet) {
    this.showOneBet = !this.showOneBet;
    this.history = false;
    this.selectedBet = bet;
  }

  formatDate(arrayDate: any) {
    return `${this.padZero(arrayDate[2])}/${this.padZero(arrayDate[1])}/${arrayDate[0]} - ${this.padZero(arrayDate[3])}:${this.padZero(arrayDate[4])}`
  }

  deleteBet(betToDelete: Bet) {
    this.betService.delete(betToDelete)
      .subscribe(
        (response: any) => {
          this.showSuccess("Aposta apagada com sucesso!");
          this.showOneBet = false;
          this.selectedBet = new Bet;
          
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
        (error) => {
          this.showError(error.error.message);
        }
      );
  }

  convertTime(stringTime: any) {
    if (stringTime) {
      const minute = Number(stringTime[1]);
      var second = Number(stringTime[2]);
      const formattedMinute = minute.toString().padStart(2, '0');
      if(!second) {
        second = 0;
      }
      const formattedSecond = second.toString().padStart(2, '0');
      const formattedTime = `${formattedMinute}:${formattedSecond}`;

      return formattedTime;
    } else {
      return '';
    }
  }
}
