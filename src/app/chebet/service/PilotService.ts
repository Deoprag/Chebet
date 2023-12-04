import { Injectable } from '@angular/core';
import { Pilot } from '../model/Pilot';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Team } from '../model/Team';

@Injectable({
  providedIn: 'root'
})
export class PilotService {
  constructor(private http: HttpClient) { }

  findAll(): Observable<Pilot[]> {
    const url = `http://localhost:8080/api/pilot/`;
    return this.http.get<Pilot[]>(url).pipe();
  }

  findAllActives(): Observable<Pilot[]> {
    const url = `http://localhost:8080/api/pilot/getActives`;
    return this.http.get<Pilot[]>(url).pipe();
  }
  
  findAllByTeam(team: Team): Observable<Pilot[]> {
    const url = `http://localhost:8080/api/pilot/findByTeam/${team.id}`;
    return this.http.get<Pilot[]>(url).pipe();
  }

  update(pilot: Pilot, date: any) {
    const url = `http://localhost:8080/api/pilot/`;
    var id = pilot.id;
    var name = pilot.name;
    var nickname = pilot.nickname;
    var birthDate = date;
    var team = pilot.team.name;
    var active = pilot.active;

    return this.http.put(url, {
      id,
      name,
      nickname,
      birthDate,
      team,
      active
    });
  }
  
  delete(pilot: Pilot) {
    const url = `http://localhost:8080/api/pilot/${pilot.id}`;
    return this.http.delete(url);
  }

  register(pilot: Pilot) {
    const url = `http://localhost:8080/api/pilot/`;
    var name = pilot.name;
    var nickname = pilot.nickname;
    var birthDate = pilot.birthDate;
    var team = pilot.team.name;
    var active = pilot.active;

    return this.http.post(url, {
      name,
      nickname,
      birthDate,
      team,
      active
    });
  }
}
