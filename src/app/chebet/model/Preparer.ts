import { Team } from "./Team";

export class Preparer {
    id: number;
    name: string;
    nickname: string;
    team: Team;

    constructor() {
        this.id = 0;
        this.name = '';
        this.nickname = '';
        this.team = new Team;
      }
  }