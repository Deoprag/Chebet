import { Injectable } from '@angular/core';
import { Team } from '../domain/Team';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
    constructor(private http: HttpClient) { }

  findAll(): Observable<Team[]> {
    const url = `http://localhost:8080/api/team/`;
  
    return this.http.get<Team[]>(url).pipe(
    //   map((response: any) => {
    //     if (Array.isArray(response)) {
    //         // Mapeie cada objeto da resposta para o modelo Team
    //         return response.map((teamData: any) => {
    //           return {
    //             id: teamData.id,
    //             name: teamData.name,
    //           };
    //         });
    //       } else {
    //         // Caso contrário, retorne um array vazio ou lide com o erro conforme necessário
    //         return [];
    //       }
    //   }
    //   )
    );
  }
}
