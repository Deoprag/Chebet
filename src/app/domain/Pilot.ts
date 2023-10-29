export class Pilot {
    id: number;
    name: string;
    nickname: string;
    birthDate: Date;
    team: number;

    constructor() {
        this.id = 0;
        this.name = '';
        this.nickname = '';
        this.birthDate = new Date();
        this.team = 0;
      }
  }