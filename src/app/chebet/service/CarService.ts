import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Car } from '../model/Car';
import { Preparer } from '../model/Preparer';
import { Team } from '../model/Team';

@Injectable({
  providedIn: 'root'
})
export class CarService {
    constructor(private http: HttpClient) { }

  findAll(): Observable<Car[]> {
    const url = `http://localhost:8080/api/car/`;
    return this.http.get<Car[]>(url).pipe();
  }

  findAllByTeam(team: Team): Observable<Preparer[]> {
    const url = `http://localhost:8080/api/pilot/findByTeam/${team.id}`;
    return this.http.get<Preparer[]>(url).pipe();
  }

  update(car: Car) {
    const url = `http://localhost:8080/api/car/`;
    var id = car.id;
    var nickname = car.nickname;
    var year = car.year;
    var model = car.model;
    var color = car.color;
    var pilot = car.pilot.id;
    var preparer = car.pilot.id;
    return this.http.put(url, {
      id,
      nickname,
      year,
      model,
      color,
      pilot,
      preparer
    });
  }
  
  delete(car: Car) {
    const url = `http://localhost:8080/api/car/${car.id}`;
    return this.http.delete(url);
  }

  register(car: Car) {
    const url = `http://localhost:8080/api/car/`;
    var nickname = car.nickname;
    var year = car.year;
    var model = car.model;
    var color = car.color;
    var pilot = car.pilot.id;
    var preparer = car.preparer.id;

    return this.http.post(url, {
        nickname,
        year,
        model,
        color,
        pilot,
        preparer
    });
  }
}
