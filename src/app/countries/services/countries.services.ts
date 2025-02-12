import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country.interface';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private _apiUrl: string = 'https://restcountries.com/v3.1'

  constructor(private httpClient: HttpClient) { }

  searchCapital(term: string): Observable<Country[]> {

    const url: string = `${this._apiUrl}/capital/${term}`;
    return this.httpClient.get<Country[]>(url);
  }

}
