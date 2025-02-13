import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country.interface';
import { catchError, Observable, of } from 'rxjs';
import { captureError } from 'rxjs/internal/util/errorContext';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private _apiUrl: string = 'https://restcountries.com/v3.1'

  constructor(private httpClient: HttpClient) { }

  searchCapital(term: string): Observable<Country[]> {

    const url: string = `${this._apiUrl}/capital/${term}`;
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(() => {
            return of([])
        })
      )
  }

  searchCountry(term: string): Observable<Country[]>{
    const url: string = `${this._apiUrl}/name/${term}`;

    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(() => {
          return of([])
        })
      )
  }

  searchRegion(region: string): Observable<Country[]> {
    const url: string = `${this._apiUrl}/region/${region}`;

    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(() => {
          return of([])
        })
      )
  }

}
