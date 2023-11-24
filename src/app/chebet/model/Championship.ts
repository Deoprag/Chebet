import { Pilot } from "./Pilot";

export class Championship {
    id!: number;
    name!:string;
    date!:Date;
    endDate!:Date;
    pilots!: Pilot[];

    constructor() {
        
    }
}