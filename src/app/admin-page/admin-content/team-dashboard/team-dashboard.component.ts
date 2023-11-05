import { Component, OnInit } from '@angular/core';
import { Team } from '../../../chebet/model/Team';
import { MessageService } from 'primeng/api';
import { TeamService } from '../../../chebet/service/TeamService';
import { Table } from 'primeng/table';

@Component({
  selector: 'team-dashboard',
  templateUrl: './team-dashboard.component.html',
  styleUrls: ['./team-dashboard.component.css'],
  providers: [MessageService]
})
export class TeamDashboardComponent implements OnInit {

  deleteModal = false;

  registerTeamModal = false;

  teams!: Team[]

  teamToDelete!: Team;

  indexToDelete!: number;

  clonedTeams: { [s: string]: Team } = {};

  constructor(private messageService: MessageService, private teamService: TeamService) {}

  ngOnInit() {
    this.refreshList();
  }

  refreshList() {
    this.teamService.findAll().subscribe((teams) => {
      this.teams = teams;
    });
  }

  changeDeleteModal() {
    this.deleteModal = !this.deleteModal;
  }

  changeRegisterModal() {
    this.registerTeamModal = !this.registerTeamModal;
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

  onRowEditInit(team: Team) {
    this.clonedTeams[team.id as unknown as string] = { ...team };
  }

  onRowEditSave(team: Team, index: number) {
    this.teams[index] = this.clonedTeams[team.id as unknown as string];
    if (team.name.length > 0) {
      this.teamService.update(team)
      .subscribe(
        (response: any) => {
          this.showSuccess("Atualizado com sucesso!");
          this.refreshList();
        },
        (error) => {
          console.log(error);
          delete this.clonedTeams[team.id as unknown as string];
          this.showError("Erro desconhecido, tente novamente mais tarde.");
        }
        );
    } else {
      this.showError('O nome não pode ser vazio');
    }
  }

  onRowEditCancel(team: Team, index: number) {
    this.teams[index] = this.clonedTeams[team.id as unknown as string];
    delete this.clonedTeams[team.id as unknown as string];
  }
    
  onRowDelete(team: Team, index: number) {
    this.teamToDelete = team;
    this.indexToDelete = index;
    this.changeDeleteModal();
  }

  registerTeam(name: String) {
    this.teamService.register(name)
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
  }

  deleteTeam() {
    this.teamService.delete(this.teamToDelete)
    .subscribe(
      (response: any) => {
        this.showSuccess("Apagado com sucesso!");
        this.changeDeleteModal();
        this.refreshList();
        this.teams[this.indexToDelete] = this.clonedTeams[this.teamToDelete.id as unknown as string];
        delete this.clonedTeams[this.teamToDelete.id as unknown as string];
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
