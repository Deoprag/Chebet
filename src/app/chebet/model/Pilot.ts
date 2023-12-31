import { Team } from "./Team";

export class Pilot {
    id: number;
    name: string;
    nickname: string;
    birthDate: Date;
    team: Team;
    active: boolean;

    constructor() {
        this.id = 0;
        this.name = '';
        this.nickname = '';
        this.birthDate = new Date();
        this.team = new Team();
        this.active = false;
      }
  }