import { Injectable } from '@angular/core';
import { Team } from '../model/Team';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
    constructor(private http: HttpClient) { }

  findAll(): Observable<Team[]> {
    const url = `http://localhost:8080/api/team/`;
  
    return this.http.get<Team[]>(url).pipe();
  }

  update(team: Team) {
    const url = `http://localhost:8080/api/team/`;
    var id = team.id;
    var name = team.name;
    return this.http.put(url, {
      id,
      name
    });
  }
  
  delete(team: Team) {
    const url = `http://localhost:8080/api/team/${team.id}`;
    return this.http.delete(url);
  }

  register(name: any) {
    const url = `http://localhost:8080/api/team/`;
    return this.http.post(url, {
      name
    });
  }
}
