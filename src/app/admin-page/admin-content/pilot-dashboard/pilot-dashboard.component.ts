import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Pilot } from 'src/app/chebet/model/Pilot';
import { Team } from 'src/app/chebet/model/Team';
import { PilotService } from 'src/app/chebet/service/PilotService';
import { TeamService } from 'src/app/chebet/service/TeamService';

@Component({
  selector: 'pilot-dashboard',
  templateUrl: './pilot-dashboard.component.html',
  styleUrls: ['./pilot-dashboard.component.css'],
  providers: [DatePipe]
})
export class PilotDashboardComponent implements OnInit {
  deleteModal = false;
  registerPilotModal = false;
  active: boolean = false;
  birthDate: any;
  pilots!: Pilot[];
  teams!: Team[];
  selectedTeam!: Team;
  pilotToDelete!: Pilot;
  indexToDelete!: number;
  clonedPilots: { [s: string]: Pilot } = {};
  intermediateDate: any;

  constructor(private messageService: MessageService, private pilotService: PilotService, private teamService: TeamService, private datePipe: DatePipe) {}

  ngOnInit() {
    this.refreshList();
  }

  updateDate(event: any) {
    this.birthDate = event ? this.datePipe.transform(event, 'dd/MM/yyyy') : '';
  }

  updateSelectedTeam(event: any) {
    this.selectedTeam = event.value;
  }

  changeActive() {
    this.active = !this.active;
  }

  refreshList() {
    this.pilotService.findAll().subscribe((pilots) => {
      this.pilots = pilots;
    });
    this.teamService.findAll().subscribe((teams) => {
      this.teams = teams;
    });
  }

  arrayToDate(dateArray: number[]): Date {
    if (dateArray.length === 3) {
      return new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
    } else {
      return new Date(0,0,0);
    }
  }

  changeDeleteModal() {
    this.deleteModal = !this.deleteModal;
  }
  
  changeRegisterModal() {
    this.registerPilotModal = !this.registerPilotModal;
    this.active = false;
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

  onRowEditInit(pilot: Pilot) {
    this.intermediateDate = new Date(pilot.birthDate);
    this.active = pilot.active;
    this.clonedPilots[pilot.id as unknown as string] = { ...pilot };
  }

  onRowEditSave(pilot: Pilot, index: number) {
    this.pilots[index] = this.clonedPilots[pilot.id as unknown as string];
    var tempDate = this.datePipe.transform(this.intermediateDate, 'dd/MM/yyyy');
    if(this.selectedTeam) {
      pilot.team = this.selectedTeam;
    }
    if (this.validateEditFields(pilot)) {
      this.pilotService.update(pilot, tempDate)
      .subscribe(
        (response: any) => {
          this.showSuccess("Atualizado com sucesso!");
          this.refreshList();
        },
        (error) => {
          console.log(error.message);
          delete this.clonedPilots[pilot.id as unknown as string];
          this.showError(error.message);
        }
        );
    } else {
      this.showError('Preencha todos os campos!');
    }
  }

  validateEditFields(pilot: Pilot) {
    if (!pilot.name || !pilot.nickname || !pilot.team || !this.intermediateDate) {
      return false;
    } else {
      return true;
    }
  }

  validateRegisterFields(name: any, nickname: any, team: any) {
    if (!name || !nickname || !team || !this.birthDate) {
      return false;
    } else {
      return true;
    }
  }

  onRowEditCancel(pilot: Pilot, index: number) {
    this.pilots[index] = this.clonedPilots[pilot.id as unknown as string];
    delete this.clonedPilots[pilot.id as unknown as string];
  }
    
  onRowDelete(pilot: Pilot, index: number) {
    this.pilotToDelete = pilot;
    this.indexToDelete = index;
    this.changeDeleteModal();
  }

  registerPilot(name: any, nickname: any, team: any) {
    var pilot: Pilot = new Pilot;
    if (this.validateRegisterFields(name, nickname, team)) {
      pilot.name = name;
      pilot.nickname = nickname;
      pilot.team = team;
      pilot.birthDate = this.birthDate;
      pilot.active = this.active;

      this.pilotService.register(pilot)
        .subscribe(
          (response: any) => {
            this.showSuccess("Cadastrado com sucesso!");
            this.changeRegisterModal();
            this.refreshList();
          },
          (error) => {
            if(error.status === 0) {
              this.showError("Erro desconhecido, tente novamente mais tarde.");
            } else {
              this.showError(error.error.message);
            }
            console.log(error);
          }
        );
    } else {
      this.showWarn("Preencha todos os campos!");
    }
  }

  deletePilot() {
    this.pilotService.delete(this.pilotToDelete)
    .subscribe(
      (response: any) => {
        this.showSuccess("Apagado com sucesso!");
        this.changeDeleteModal();
        this.refreshList();
        this.pilots[this.indexToDelete] = this.clonedPilots[this.pilotToDelete.id as unknown as string];
        delete this.clonedPilots[this.pilotToDelete.id as unknown as string];
      },  
      (error: any) => {
        console.log(error);
        if(error.status === 0) {
          this.showError("Erro desconhecido, tente novamente mais tarde.");
        } else {
          this.showError(error.error.message);
        }
        this.changeDeleteModal();
      }
    );
  }

  clear(table: Table) {
    table.clear();
  }
}
