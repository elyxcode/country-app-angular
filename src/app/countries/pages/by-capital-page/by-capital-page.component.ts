import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.services';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-capital-page',
  standalone: false,
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  public countries: Country[] = [];
  public isLoading: boolean = false;

  constructor(
    private countriesService: CountriesService,
  ){}

  searchByCapital(term: string): void {
    this.isLoading = true;

    this.countriesService.searchCapital(term)
    .subscribe(countries => {
        this.countries = countries
        this.isLoading = false
      }
    )
  }
}
