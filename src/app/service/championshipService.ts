import { Injectable } from '@angular/core';
    
@Injectable()
export class ChampionshipService {
    getChampionshipsData() {
        return [
            {
                name:"Campeonato 01",
                quantity: 13,
                endDate: new Date(2017, 6, 22),
                betQuantity: 32
            },
            {
                name:"Campeonato 02",
                quantity: 10,
                endDate: new Date(2019, 3, 1),
                betQuantity: 20
            },
            {
                name:"Campeonato 03",
                quantity: 8,
                endDate: new Date(2016, 4, 18),
                betQuantity: 43
            },
            {
                name:"Campeonato 04",
                quantity: 15,
                endDate: new Date(2021, 11, 11),
                betQuantity: 98
            },
            {
                name:"Campeonato 05",
                quantity: 20,
                endDate: new Date(2022, 6, 29),
                betQuantity: 110
            },
            {
                name:"Campeonato 06",
                quantity: 14,
                endDate: new Date(2020, 2, 27),
                betQuantity: 28
            },
            {
                name:"Campeonato 07",
                quantity: 9,
                endDate: new Date(2018, 3, 12),
                betQuantity: 19
            }
        ];
    }
    
    getChampionships() {
        return Promise.resolve(this.getChampionshipsData());
    }
};