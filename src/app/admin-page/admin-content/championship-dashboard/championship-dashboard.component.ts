import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Championship } from 'src/app/chebet/model/Championship';
import { Pilot } from 'src/app/chebet/model/Pilot';
import { Team } from 'src/app/chebet/model/Team';
import { ChampionshipService } from 'src/app/chebet/service/ChampionshipService';
import { PilotService } from 'src/app/chebet/service/PilotService';

@Component({
  selector: 'championship-dashboard',
  templateUrl: './championship-dashboard.component.html',
  styleUrls: ['./championship-dashboard.component.css']
})
export class ChampionshipDashboardComponent {

  deleteModal = false;
  registerChampionshipModal = false;
  championships!: Championship[];
  pilots!: Pilot[];
  selectedTeam!: Team;
  championshipToDelete!: Championship;
  indexToDelete!: number;
  clonedChampionships: { [s: string]: Championship } = {};

  constructor(private messageService: MessageService, private championshipService: ChampionshipService, private pilotService: PilotService) {}

  ngOnInit() {
    this.refreshList();
  }

  refreshList() {
    this.championshipService.findAll().subscribe((championships) => {
      this.championships = championships;
    });
    this.pilotService.findAll().subscribe((pilots) => {
      this.pilots = pilots;
    });
  }

  updateSelectedTeam(event: any) {
    this.selectedTeam = event.value;
  }

  changeDeleteModal() {
    this.deleteModal = !this.deleteModal;
  }

  changeRegisterModal() {
    this.registerChampionshipModal = !this.registerChampionshipModal;
    this.selectedTeam = new Team;
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

  onRowEditInit(championship: Championship) {
    this.clonedChampionships[championship.id as unknown as string] = { ...championship };
  }

  onRowEditSave(championship: Championship, index: number) {
    this.championships[index] = this.clonedChampionships[championship.id as unknown as string];

    if (championship.name, championship.date) {
      this.championshipService.update(championship)
      .subscribe(
        (response: any) => {
          this.showSuccess("Atualizado com sucesso!");
          this.refreshList();
        },
        (error) => {
          console.log(error);
          delete this.clonedChampionships[championship.id as unknown as string];
          this.showError("Erro desconhecido, tente novamente mais tarde.");
        }
        );
    } else {
      this.showError('O nome não pode ser vazio');
    }
  }

  onRowEditCancel(championship: Championship, index: number) {
    this.championships[index] = this.clonedChampionships[championship.id as unknown as string];
    delete this.clonedChampionships[championship.id as unknown as string];
  }
    
  onRowDelete(championship: Championship, index: number) {
    this.championshipToDelete = championship;
    this.indexToDelete = index;
    this.changeDeleteModal();
  }

  registerChampionship(name: string, nickname: string) {
    var championship: Championship = new Championship;

    if (this.validateRegisterFields(championship)) {
      this.championshipService.register(championship)
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

    }
  }

  validateRegisterFields(championship: Championship) {
    if (!championship.name) {
      return false;
    }
    return true;
  }

  deleteChampionship() {
    this.championshipService.delete(this.championshipToDelete)
    .subscribe(
      (response: any) => {
        this.showSuccess("Apagado com sucesso!");
        this.changeDeleteModal();
        this.refreshList();
        this.championships[this.indexToDelete] = this.clonedChampionships[this.championshipToDelete.id as unknown as string];
        delete this.clonedChampionships[this.championshipToDelete.id as unknown as string];
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
