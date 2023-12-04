import { Time } from "@angular/common";
import { Pilot } from "./Pilot";
import { Championship } from "./Championship";

export class Race {
    id: number;
    raceNumber: number;
    pilot1: Pilot;
    pilot1Time: string;
    pilot1Broke: boolean;
    pilot2: Pilot;
    pilot2Time: string;
    pilot2Broke: boolean;
    championship: Championship;

    constructor() {
        this.id = 0;
        this.raceNumber = 0;
        this.pilot1 = new Pilot;
        this.pilot1Time = '';
        this.pilot1Broke = false;
        this.pilot2 = new Pilot;
        this.pilot2Time = '';
        this.pilot2Broke = false;
        this.championship = new Championship;
    }
}