import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AverageTime } from '../model/AverageTime';
import { Bet } from '../model/Bet';
import { BrokenCar } from '../model/BrokenCar';
import { HeadToHead } from '../model/HeadToHead';
import { SimplePosition } from '../model/SimplePosition';
import { SimpleVictory } from '../model/SimpleVictory';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class BetService {
    constructor(private http: HttpClient) { }

  findAll(): Observable<Bet[]> {
    const url = `http://localhost:8080/api/bet/`;
    return this.http.get<Bet[]>(url).pipe();
  }

  findAllByUser(user: User): Observable<Bet[]> {
    const url = `http://localhost:8080/api/bet/findByUser/${user.id}`;
    return this.http.get<Bet[]>(url).pipe();
  }
  
  delete(bet: Bet) {
    const url = `http://localhost:8080/api/bet/${bet.id}`;
    return this.http.delete(url);
  }

  register(bet: Bet, value: any, simpleVictory: SimpleVictory, brokenCar: BrokenCar, simplePosition: SimplePosition, averageTime: AverageTime, headToHead: HeadToHead) {
    const url = `http://localhost:8080/api/bet/`;
    var user_id = bet.user.id;
    var championship_id = bet.championship.id;
    var bet_type = bet.betType.code;
    var pilot_id = 0;
    switch(bet.betType.code) {
        case 'SimpleVictory':
            pilot_id = simpleVictory.pilot.id;
            
            break;
        case 'BrokenCar':
            pilot_id = brokenCar.pilot.id;
            
            break;
        case 'SimplePosition':
            pilot_id = simplePosition.pilot.id;
  
          break;
    }
    var car_position = simplePosition.position;
    var average_time1 = averageTime.averageTime1;
    var average_time2 = averageTime.averageTime2;
    var race_id = headToHead.race.id;
    var winner_id = headToHead.winner.id;
    var loser_id = headToHead.loser.id;
    
    return this.http.post(url, {
        value,
        user_id,
        championship_id,
        bet_type,
        pilot_id,
        car_position,
        average_time1,
        average_time2,
        race_id,
        winner_id,
        loser_id
    });
  }
}
