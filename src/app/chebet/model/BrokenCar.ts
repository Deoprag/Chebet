import { Championship } from "./Championship";
import { Pilot } from "./Pilot";

export class BrokenCar {
    id: number;
    championship: Championship;
    pilot: Pilot;

    constructor() {
        this.id = 0;
        this.championship = new Championship;
        this.pilot = new Pilot;
      }
  }
