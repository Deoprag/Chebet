import { Championship } from "./Championship";
import { Pilot } from "./Pilot";
import { Race } from "./Race";

export class HeadToHead {
    id: number;
    championship: Championship;
    race: Race;
    winner: Pilot;
    loser: Pilot;
    
    constructor() {
        this.id = 0;
        this.championship = new Championship;
        this.race = new Race;
        this.winner = new Pilot;
        this.loser = new Pilot;
    }
  }
