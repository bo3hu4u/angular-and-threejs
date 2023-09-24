import { Injectable } from '@angular/core';
import {Hero} from "./hero";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {

  createDb() {
     const heroes: Hero[] = [
      {id: 12, name: 'Dr. Nice', alive: true},
      {id: 13, name: 'Bombasto', alive: true},
      {id: 14, name: 'Celeritas', alive: true},
      {id: 15, name: 'Magneta', alive: true},
      {id: 16, name: 'RubberMan', alive: false},
      {id: 17, name: 'Dynama', alive: true},
      {id: 18, name: 'Dr. IQ', alive: true},
      {id: 19, name: 'Magma', alive: true},
      {id: 20, name: 'Tornado', alive: true}
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
