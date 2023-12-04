import { Injectable } from '@angular/core';
import { Race } from '../model/Race';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Team } from '../model/Team';
import { Championship } from '../model/Championship';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  constructor(private http: HttpClient) { }

  findAll(): Observable<Race[]> {
    const url = `http://localhost:8080/api/race/`;
    return this.http.get<Race[]>(url).pipe();
  }
  
  findAllByChampionship(championship: Championship): Observable<Race[]> {
    const url = `http://localhost:8080/api/race/findByTeam/${championship.id}`;
    return this.http.get<Race[]>(url).pipe();
  }

  update(race: Race) {
    const url = `http://localhost:8080/api/race/`;
    var id = race.id;
    var pilot1Id = race.pilot1.id;
    var pilot1Time = '00:' + race.pilot1Time;
    var pilot1Broke = race.pilot1Broke;
    var pilot2Id = race.pilot2.id;
    var pilot2Time = '00:' + race.pilot2Time;
    var pilot2Broke = race.pilot2Broke;
    var championshipId = race.championship.id;

    return this.http.put(url, {
      id,
      pilot1Id,
      pilot1Time,
      pilot1Broke,
      pilot2Id,
      pilot2Time,
      pilot2Broke,
      championshipId
    });
  }
  
  delete(race: Race) {
    const url = `http://localhost:8080/api/race/${race.id}`;
    return this.http.delete(url);
  }
}
