import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { HeroService } from '../hero.service';
import { Hero } from '../templates/Hero';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>
  private searchTerms = new Subject<string>()

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        return this.heroService.searchHeroes(term)
      })
    )
  }

  // Push a search term into the observable stream
  search(term: string): void {
    this.searchTerms.next(term)
  }

}
