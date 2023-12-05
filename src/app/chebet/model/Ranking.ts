import { Pilot } from "./Pilot";

export class Ranking {
    pilot: Pilot;
    position: number;
    time: any;
    broken: boolean;

    constructor() {
        this.pilot = new Pilot;
        this.position = 0;
        this.time = '';
        this.broken = false;
      }
  }