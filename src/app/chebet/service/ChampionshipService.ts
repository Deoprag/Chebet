import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Championship } from '../model/Championship';
import { Preparer } from '../model/Preparer';
import { Team } from '../model/Team';

@Injectable({
  providedIn: 'root'
})
export class ChampionshipService {
    constructor(private http: HttpClient) { }

  findAll(): Observable<Championship[]> {
    const url = `http://localhost:8080/api/championship/`;
    return this.http.get<Championship[]>(url).pipe();
  }

  update(championship: Championship) {
    const url = `http://localhost:8080/api/championship/`;
    var id = championship.id;
    var name = championship.name;
    var date = championship.date;
    var endDate = championship.endDate;
    var pilots = championship.pilots;
    return this.http.put(url, {
      id,
      name,
      date,
      endDate,
      pilots
    });
  }
  
  delete(championship: Championship) {
    const url = `http://localhost:8080/api/championship/${championship.id}`;
    return this.http.delete(url);
  }
  
  register(championship: Championship, pilots: any) {
    const url = `http://localhost:8080/api/championship/`;

    console.log(championship);
    console.log(pilots);
    
    var name = championship.name;
    var date = championship.date;
    var endDate = championship.endDate;
    return this.http.post(url, {
      name,
      date,
      endDate,
      pilots
    });
  }
}
