import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { HEROES } from 'src/assets/mock-heroes';
import { MessageService } from './message.service';
import { Hero } from './templates/Hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      )
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`Fetched hero: ${id}`)),
        catchError(this.handleError<Hero>(`getHero/${id}`))
      )
  }

  updateHero(hero: Hero) {
    return this.http.put(
      this.heroesUrl,
      hero,
      this.httpOptions
    ).pipe(
      tap(_ => this.log(`updated hero: ${hero.name}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  addHero(hero: Hero) {
    return this.http.post<Hero>(
      this.heroesUrl,
      hero,
      this.httpOptions
    ).pipe(
      tap(newHero => this.log(`Adding: ${newHero.name}`)),
      catchError(this.handleError<Hero>('addHero'))
    )
  }

  deleteHero(id: number) {
    const url = `${this.heroesUrl}/${id}`
    return this.http.delete<Hero>(
      url,
      this.httpOptions
    ).pipe(
      tap(_ => this.log(`delete hero: ${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    )
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if(!term.trim()) {
      return of([])
    }
    return this.http.get<Hero[]>(
      `${this.heroesUrl}/?name=${term}`
    ).pipe(
      tap(x => x.length
        ? this.log(`found heroes matching "${term}"`)
        : this.log(`found no terms matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    )
  }

  private handleError<T>(
    operation = 'operation',
    result?: T
  ) {
    return (error: any): Observable<T> => {
      console.error(error)
      this.log(`${operation} failed: ${error.message}`)
      return of(result as T)
    }
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`)
  }
}
