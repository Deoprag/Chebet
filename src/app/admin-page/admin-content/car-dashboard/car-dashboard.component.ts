import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Car } from 'src/app/chebet/model/Car';
import { Pilot } from 'src/app/chebet/model/Pilot';
import { Preparer } from 'src/app/chebet/model/Preparer';
import { Team } from 'src/app/chebet/model/Team';
import { CarService } from 'src/app/chebet/service/CarService';
import { PilotService } from 'src/app/chebet/service/PilotService';
import { PreparerService } from 'src/app/chebet/service/PreparerService';
import { TeamService } from 'src/app/chebet/service/TeamService';

@Component({
  selector: 'car-dashboard',
  templateUrl: './car-dashboard.component.html',
  styleUrls: ['./car-dashboard.component.css'],
  providers: [DatePipe]
})
export class CarDashboardComponent implements OnInit{
  deleteModal = false;
  registerCarModal = false;
  editing = false;
  cars!: Car[];
  teams!: Team[];
  preparers!: Preparer[];
  pilots!: Pilot[];
  colors!: any[];
  selectedTeam!: Team;
  selectedPreparer!: Preparer;
  selectedPilot!: Pilot;
  selectedColor!: any;
  carToDelete!: Car;
  indexToDelete!: number;
  clonedCars: { [s: string]: Car } = {};

  constructor(private messageService: MessageService, private carService: CarService, private teamService: TeamService, private pilotService: PilotService, private preparerService: PreparerService, private datePipe: DatePipe) {}

  ngOnInit() {
    this.refreshList();
    this.colors = [
      'Amarelo',
      'Azul',
      'Branco',
      'Fantasia',
      'Laranja',
      'Marrom',
      'Preto',
      'Prata',
      'Roxo',
      'Vermelho'
  ];
  }

  capitalizeFirstLetter(input: string): string {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }

  updateSelectedPilot(event: any) {
    this.selectedPilot = event.value;
  }

  updateSelectedPreparer(event: any) {
    this.selectedPreparer = event.value;
  }

  updateSelectedColor(event: any) {
    this.selectedColor = event.value;
  }
  
  updateSelectedTeam(event: any) {
    this.selectedTeam = event.value;
    this.selectedPilot = new Pilot();
    this.selectedPreparer = new Preparer();

    this.pilotService.findAllByTeam(this.selectedTeam).subscribe((pilots) => {
      this.pilots = pilots;
    });
    this.preparerService.findAllByTeam(this.selectedTeam).subscribe((preparers) => {
      this.preparers = preparers;
      this.preparers.unshift({id: 0, name: "Não possui", nickname: "", team: new Team})
    });
  }

  refreshList() {
    this.carService.findAll().subscribe((cars) => {
      this.cars = cars;
    });
    this.teamService.findAll().subscribe((teams) => {
      this.teams = teams;
    });
  } 

  arrayToDate(dateArray: number[]): Date {
    if (dateArray.length === 3) {
      return new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
    } else {
      return new Date(0,0,0);
    }
  }

  changeDeleteModal() {
    this.deleteModal = !this.deleteModal;
  }
  
  changeRegisterModal() {
    if(this.editing) {
      this.showWarn("Não é possível registrar um novo carro durante a edição de outro.")
    } else {
      this.selectedColor = '';
      this.selectedTeam = new Team();
      this.selectedPilot = new Pilot();
      this.selectedPreparer = new Preparer();
      this.pilots = [];
      this.preparers = [];
      this.registerCarModal = !this.registerCarModal;  
    }
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Erro!', detail: message });
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: message });
  }

  showWarn(message: string) {
    this.messageService.add({ severity: 'warn', summary: 'Ops...', detail: message });
  }

  onRowEditInit(car: Car) {
    this.clonedCars[car.id as unknown as string] = { ...car };
    this.selectedTeam = car.pilot.team;
    this.editing = true;

    this.pilotService.findAllByTeam(this.selectedTeam).subscribe((pilots) => {
      this.pilots = pilots;
    });
    this.preparerService.findAllByTeam(this.selectedTeam).subscribe((preparers) => {
      this.preparers = preparers;
      this.preparers.unshift({id: 0, name: "Não possui", nickname: "", team: new Team})
    });
  }

  onRowEditSave(car: Car, index: number) {
    this.cars[index] = this.clonedCars[car.id as unknown as string];
    if (this.validateEditFields(car)) {
      this.carService.update(car)
      .subscribe(
        (response: any) => {
          this.showSuccess("Atualizado com sucesso!");
          this.refreshList();
        },
        (error) => {
          delete this.clonedCars[car.id as unknown as string];
          this.showError(error.error.message);
        }
        );
    } else {
      this.showError('Preencha todos os campos!');
    }
    this.editing = false;
  }

  validateEditFields(car: Car) {
    if (!car.nickname || !car.year || !car.model || !car.color || !car.pilot) {
      return false;
    } else {
      return true;
    }
  }

  validateRegisterFields(nickname: any, year: any, model: any, color: any, pilot: any) {
    if (!nickname || !year || !model || !color || !pilot) {
      return false;
    } else {
      return true;
    }
  }

  onRowEditCancel(car: Car, index: number) {
    this.cars[index] = this.clonedCars[car.id as unknown as string];
    delete this.clonedCars[car.id as unknown as string];
    this.editing = false;
    this.refreshList();
  }
    
  onRowDelete(car: Car, index: number) {
    this.carToDelete = car;
    this.indexToDelete = index;
    this.editing = false;
    this.changeDeleteModal();
  }

  registerCar(nickname: any, year: any, model: any) {
    var car: Car = new Car;
    if (this.validateRegisterFields(nickname, year, model, this.selectedColor, this.selectedPilot)) {
      car.nickname = nickname;
      car.year = year;
      car.model = model;
      car.color = this.selectedColor;
      car.pilot = this.selectedPilot;
      car.preparer = this.selectedPreparer;
      this.carService.register(car)
        .subscribe(
          (response: any) => {
            this.showSuccess("Cadastrado com sucesso!");
            this.changeRegisterModal();
            this.refreshList();
          },
          (error) => {
            if(error.status === 0) {
              this.showError("Erro desconhecido, tente novamente mais tarde.");
            } else {
              this.showError(error.error.message);
            }
            console.log(error);
          }
        );
    } else {
      this.showWarn("Preencha todos os campos!");
    }
  }

  deleteCar() {
    this.carService.delete(this.carToDelete)
    .subscribe(
      (response: any) => {
        this.showSuccess("Apagado com sucesso!");
        this.changeDeleteModal();
        this.refreshList();
        this.cars[this.indexToDelete] = this.clonedCars[this.carToDelete.id as unknown as string];
        delete this.clonedCars[this.carToDelete.id as unknown as string];
      },  
      (error: any) => {
        console.log(error);
        if(error.status === 0) {
          this.showError("Erro desconhecido, tente novamente mais tarde.");
        } else {
          this.showError(error.error.message);
        }
        this.changeDeleteModal();
      }
    );
  }

  clear(table: Table) {
    table.clear();
  }
}
