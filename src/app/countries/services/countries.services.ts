import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country.interface';
import { catchError, delay, map, Observable, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private _apiUrl: string = 'https://restcountries.com/v3.1'

  constructor(private httpClient: HttpClient) { }

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
    return this.getCountriesRequest(url);
  }

  searchCountry(term: string): Observable<Country[]>{
    const url: string = `${this._apiUrl}/name/${term}`;

    return this.getCountriesRequest(url);
  }

  searchRegion(region: string): Observable<Country[]> {
    const url: string = `${this._apiUrl}/region/${region}`;

    return this.getCountriesRequest(url);
  }
}
