import { Championship } from "./Championship";
import { Pilot } from "./Pilot";

export class SimpleVictory {
    id: number;
    championship: Championship;
    pilot: Pilot;

    constructor() {
        this.id = 0;
        this.championship = new Championship;
        this.pilot = new Pilot;
    }
  }
