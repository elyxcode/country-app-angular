import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.services';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  standalone: false,
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  public countries: Country[] = [];

  constructor(
    private countriesService: CountriesService,
  ){}

  searchByCapital(term: string): void {
    this.countriesService.searchCapital(term)
    .subscribe(countries =>
      this.countries = countries
    )
    console.log({ term })
    console.log({ countries: this.countries})
  }

}
