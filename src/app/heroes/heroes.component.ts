import { Component, OnInit } from '@angular/core'
import { HEROES } from 'src/assets/mock-heroes'
import { Hero } from '../templates/Hero'

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = HEROES

  constructor() { }

  ngOnInit(): void {
  }

  selectedHero? : Hero
  onSelect(hero: Hero) {
    this.selectedHero = hero
  }

}