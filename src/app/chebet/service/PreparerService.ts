import { Injectable } from '@angular/core';
import { Preparer } from '../model/Preparer';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Team } from '../model/Team';

@Injectable({
  providedIn: 'root'
})
export class PreparerService {
  constructor(private http: HttpClient) { }

  findAll(): Observable<Preparer[]> {
    const url = `http://localhost:8080/api/preparer/`;
    return this.http.get<Preparer[]>(url).pipe();
  }

  findAllByTeam(team: Team): Observable<Preparer[]> {
    const url = `http://localhost:8080/api/preparer/findByTeam/${team.id}`;
    return this.http.get<Preparer[]>(url).pipe();
  }

  update(preparer: Preparer) {
    const url = `http://localhost:8080/api/preparer/`;
    var id = preparer.id;
    var name = preparer.name;
    var nickname = preparer.nickname;
    var team = preparer.team.id;

    return this.http.put(url, {
      id,
      name,
      nickname,
      team
    });
  }
  
  delete(preparer: Preparer) {
    const url = `http://localhost:8080/api/preparer/${preparer.id}`;
    return this.http.delete(url);
  }

  register(preparer: Preparer) {
    var name = preparer.name;
    var nickname = preparer.nickname;
    var team = preparer.team.id;

    const url = `http://localhost:8080/api/preparer/`;
    return this.http.post(url, {
      name,
      nickname,
      team
    });
  }
}
