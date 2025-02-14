import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private _apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: {
      term: '',
      countries: []
    },
    byCountries: {
      term: '',
      countries: []
    },
    byRegion: {
      region: '',
      countries: []
    }
  }

  constructor(private httpClient: HttpClient) {
    this.loadToLocalStorage();
   }

  private saveToLocalStorage(){
    localStorage.setItem('cacheStorage', JSON.stringify(this.cacheStore));
  }

  private loadToLocalStorage(){

    if(!localStorage.getItem('cacheStorage')) return;

    this.cacheStore = JSON.parse(localStorage.getItem('cacheStorage')!);
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(() => of([])),
      )
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this._apiUrl}/alpha/${code}`;

    return this.httpClient.get<Country[]>(url)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(() => of(null))
      );
  }

  searchCapital(term: string): Observable<Country[]> {

    const url: string = `${this._apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCapital = { term, countries}),
        tap(() => this.saveToLocalStorage())
      );
  }

  searchCountry(term: string): Observable<Country[]>{
    const url: string = `${this._apiUrl}/name/${term}`;

    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCountries = { term, countries }),
        tap(() => this.saveToLocalStorage()),
      )
  }

  searchRegion(region: Region): Observable<Country[]> {
    const url: string = `${this._apiUrl}/region/${region}`;

    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byRegion = { region, countries }),
        tap(() => this.saveToLocalStorage()),
      );
  }
}
