import { GenderService } from "../service/GenderService";
import { Gender } from "./Gender";

export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    birthDate: Date;
    cpf: string;
    gender: Gender;
    phoneNumber: string;
    password: string;
    balance: number | null;
    active: boolean;

    constructor() {
        this.id = 0;
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.role = '';
        this.birthDate = new Date();
        this.cpf = '';
        this.gender = new Gender();
        this.phoneNumber = '';
        this.password = '';
        this.balance = 0;
        this.active = false;
      }
  }