import { Component, OnInit } from '@angular/core';
import { Team } from '../domain/Team';
import { MessageService } from 'primeng/api';
import { TeamService } from '../service/TeamService';
import { Table } from 'primeng/table';

@Component({
  selector: 'team-dashboard',
  templateUrl: './team-dashboard.component.html',
  styleUrls: ['./team-dashboard.component.css'],
  providers: [MessageService]
})
export class TeamDashboardComponent implements OnInit {

  selectedTeam!: Team;

  teams!: Team[]

  clonedTeams: { [s: string]: Team } = {};

  constructor(private messageService: MessageService, private teamService: TeamService) {}

  ngOnInit() {
    this.teamService.findAll().subscribe((teams) => {
      this.teams = teams;
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

  onRowEditInit(team: Team) {
    this.clonedTeams[team.id as unknown as string] = { ...team };
  }

  onRowEditSave(team: Team) {
    if (team.name.length > 0) {
      delete this.clonedTeams[team.id as unknown as string];
      this.showSuccess('Atualizado com sucesso');
    } else {
      this.showError('O nome não pode ser vazio');
    }
  }

  onRowEditCancel(team: Team, index: number) {
    this.teams[index] = this.clonedTeams[team.id as unknown as string];
    delete this.clonedTeams[team.id as unknown as string];
  }
    
  onRowDelete(team: Team, index: number) {
    this.teams[index] = this.clonedTeams[team.id as unknown as string];
    delete this.clonedTeams[team.id as unknown as string];
  }

  registerTeam(name: String) {

  }

  clear(table: Table) {
    table.clear();
  }
}
