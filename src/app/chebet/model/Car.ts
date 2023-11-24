import { Pilot } from "./Pilot";
import { Preparer } from "./Preparer";

export class Car {
    id: number;
    nickname: string;
    year: number;
    model: string;
    color: string;
    pilot: Pilot;
    preparer: Preparer | null | undefined;

    constructor() {
        this.id = 0;
        this.nickname = '';
        this.year = 0;
        this.model = '';
        this.color = '';
        this.pilot = new Pilot();
        this.preparer = new Preparer();
      }
  }
