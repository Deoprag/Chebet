import { AverageTime } from "./AverageTime";
import { BetType } from "./BetType";
import { BrokenCar } from "./BrokenCar";
import { Championship } from "./Championship";
import { HeadToHead } from "./HeadToHead";
import { SimplePosition } from "./SimplePosition";
import { SimpleVictory } from "./SimpleVictory";
import { Transaction } from "./Transaction";
import { User } from "./User";

export class Bet {
    id: number;
    betType: BetType;
    transaction: Transaction;
    championship: Championship;
    user: User;
    simpleVictory: SimpleVictory;
    brokenCar: BrokenCar;
    simplePosition: SimplePosition;
    averageTime: AverageTime;
    headToHead: HeadToHead;

    constructor() {
        this.id = 0;
        this.betType = new BetType;
        this.transaction = new Transaction;
        this.championship = new Championship;
        this.user = new User;
        this.simpleVictory = new SimpleVictory;
        this.brokenCar = new BrokenCar;
        this.simplePosition = new SimplePosition;
        this.averageTime = new AverageTime;
        this.headToHead = new HeadToHead;
      }
  }
