import { DatePipe } from '@angular/common';
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
  styleUrls: ['./championship-dashboard.component.css'],
  providers: [DatePipe]
})

export class ChampionshipDashboardComponent {

  deleteModal = false;
  registerChampionshipModal = false;
  championships!: Championship[];
  pilots!: Pilot[];
  selectedPilots!: Pilot[];
  championshipToDelete!: Championship;
  indexToDelete!: number;
  clonedChampionships: { [s: string]: Championship } = {};
  rangeDate!: Date[];
  today: Date = new Date();

  constructor(private messageService: MessageService, private championshipService: ChampionshipService, private pilotService: PilotService, private datePipe: DatePipe) {}

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

  arrayToDate(dateArray: any): Date {
    if (dateArray.length > 4) {
      return new Date(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4]);
    } else {
      return new Date(0,0,0);
    }
  }

  changeDeleteModal() {
    this.deleteModal = !this.deleteModal;
  }

  changeRegisterModal() {
    this.registerChampionshipModal = !this.registerChampionshipModal;
    this.rangeDate = [];
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
    this.rangeDate = [this.arrayToDate(championship.date), this.arrayToDate(championship.endDate)];
  }

  onRowEditSave(championship: Championship, index: number) {
    this.championships[index] = this.clonedChampionships[championship.id as unknown as string];
    if (championship.name && this.rangeDate) {
      championship.date = this.rangeDate[0];
      championship.endDate = this.rangeDate[1];
      var pilots: string = this.getPilotsIds(championship.pilots);

      this.championshipService.update(championship, pilots)
      .subscribe(
        (response: any) => {
          this.showSuccess("Atualizado com sucesso!");
          this.refreshList();
        },
        (error) => {
          delete this.clonedChampionships[championship.id as unknown as string];
          this.showError(error.error.message);
        }
        );
    } else {
      if (!this.rangeDate) {
        this.showError('Selecione pelo menos uma data e hora de inicio!');
      } else {
        this.showError('Preencha todos os campos!');
      }
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

  registerChampionship(name: any) {
    var championship: Championship = new Championship;
    championship.name = name;
    championship.date = this.rangeDate[0];
    championship.endDate = this.rangeDate[1];    
    var pilots: string = this.getPilotsIds(this.selectedPilots);

    if (this.validateRegisterFields(championship)) {
      this.championshipService.register(championship, pilots)
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
      this.showError('Preencha todos os campos!');
    }
  }

  getPilotsIds(pilots: Pilot[]) {
    let pilotsIds = "";
    pilots.forEach((pilot, index) => {
      pilotsIds += pilot.id;
  
      if (index < pilots.length - 1) {
        pilotsIds += ', ';
      }
    });
    return pilotsIds;
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
