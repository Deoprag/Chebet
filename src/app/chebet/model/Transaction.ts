import { TransactionType } from "./TransactionType";
import { User } from "./User";

export class Transaction {
    id!: number;
    transactionType!: TransactionType;
    value!: number;
    user!: User;
    dateTime!: Date;
  
    constructor() {
      this.id = 0;
      this.transactionType = new TransactionType;
      this.value = 0;
      this.user = new User;
      this.dateTime = new Date;
    }
  }
  