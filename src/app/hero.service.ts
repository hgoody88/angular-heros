import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HEROES } from 'src/assets/mock-heroes';
import { MessageService } from './message.service';
import { Hero } from './templates/Hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES)
    this.messageService.add('HeroService: fetched heroes!')
    return heroes
  }
}
