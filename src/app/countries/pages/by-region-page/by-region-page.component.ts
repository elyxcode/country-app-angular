import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.services';

@Component({
  selector: 'countries-by-region-page',
  standalone: false,
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {

  public countries: Country[] = [];

  constructor(
    private countriesService: CountriesService,
  ){}

  searchByRegion(region: string): void {

    this.countriesService.searchRegion(region)
      .subscribe( countries => {
        this.countries = countries;
      })
  }
}
