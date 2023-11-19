import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Preparer } from 'src/app/chebet/model/Preparer';
import { Team } from 'src/app/chebet/model/Team';
import { PreparerService } from 'src/app/chebet/service/PreparerService';
import { TeamService } from 'src/app/chebet/service/TeamService';

@Component({
  selector: 'preparer-dashboard',
  templateUrl: './preparer-dashboard.component.html',
  styleUrls: ['./preparer-dashboard.component.css']
})
export class PreparerDashboardComponent {

  deleteModal = false;
  registerPreparerModal = false;
  preparers!: Preparer[];
  teams!: Team[];
  selectedTeam!: Team;
  preparerToDelete!: Preparer;
  indexToDelete!: number;
  clonedPreparers: { [s: string]: Preparer } = {};

  constructor(private messageService: MessageService, private preparerService: PreparerService, private teamService: TeamService) {}

  ngOnInit() {
    this.refreshList();
  }

  refreshList() {
    this.preparerService.findAll().subscribe((preparers) => {
      this.preparers = preparers;
    });
    this.teamService.findAll().subscribe((teams) => {
      this.teams = teams;
    });
  }

  updateSelectedTeam(event: any) {
    this.selectedTeam = event.value;
  }

  changeDeleteModal() {
    this.deleteModal = !this.deleteModal;
  }

  changeRegisterModal() {
    this.registerPreparerModal = !this.registerPreparerModal;
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

  onRowEditInit(preparer: Preparer) {
    this.clonedPreparers[preparer.id as unknown as string] = { ...preparer };
  }

  onRowEditSave(preparer: Preparer, index: number) {
    this.preparers[index] = this.clonedPreparers[preparer.id as unknown as string];
    if (preparer.name.length < 1 || preparer.nickname.length < 1) {
      this.preparerService.update(preparer)
      .subscribe(
        (response: any) => {
          this.showSuccess("Atualizado com sucesso!");
          this.refreshList();
        },
        (error) => {
          console.log(error);
          delete this.clonedPreparers[preparer.id as unknown as string];
          this.showError("Erro desconhecido, tente novamente mais tarde.");
        }
        );
    } else {
      this.showError('O nome não pode ser vazio');
    }
  }

  onRowEditCancel(preparer: Preparer, index: number) {
    this.preparers[index] = this.clonedPreparers[preparer.id as unknown as string];
    delete this.clonedPreparers[preparer.id as unknown as string];
  }
    
  onRowDelete(preparer: Preparer, index: number) {
    this.preparerToDelete = preparer;
    this.indexToDelete = index;
    this.changeDeleteModal();
  }

  registerPreparer(name: string, nickname: string) {
    var preparer: Preparer = new Preparer;
    preparer.name = name;
    preparer.nickname = nickname;
    preparer.team = this.selectedTeam;

    if (this.validateRegisterFields(preparer)) {
      this.preparerService.register(preparer)
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

  validateRegisterFields(preparer: Preparer) {
    if (!preparer.name || !preparer.nickname || !preparer.team) {
      return false;
    }
    return true;
  }

  deletePreparer() {
    this.preparerService.delete(this.preparerToDelete)
    .subscribe(
      (response: any) => {
        this.showSuccess("Apagado com sucesso!");
        this.changeDeleteModal();
        this.refreshList();
        this.preparers[this.indexToDelete] = this.clonedPreparers[this.preparerToDelete.id as unknown as string];
        delete this.clonedPreparers[this.preparerToDelete.id as unknown as string];
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
