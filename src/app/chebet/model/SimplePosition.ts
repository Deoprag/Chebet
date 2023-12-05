import { Championship } from "./Championship";
import { Pilot } from "./Pilot";

export class SimplePosition {
    id: number;
    championship: Championship;
    pilot: Pilot;
    position: number;

    constructor() {
        this.id = 0;
        this.championship = new Championship;
        this.pilot = new Pilot;
        this.position = 0;
      }
  }
