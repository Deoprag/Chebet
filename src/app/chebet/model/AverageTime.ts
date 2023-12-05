import { Championship } from "./Championship";

export class AverageTime {
    id: number;
    championship: Championship;
    averageTime1: string;
    averageTime2: string;
    
    constructor() {
        this.id = 0;
        this.championship = new Championship;
        this.averageTime1 = '';
        this.averageTime2 = '';
      }
  }
