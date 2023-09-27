import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country, City, State } from 'country-state-city';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css'],
})
export class BusinessComponent {
  addBusinessForm!: FormGroup;
  coutryList!: any;
  stateList!: any;
  cityList!: any;

  //---
  sCountry!: any;
  sState!: any;

  constructor(private formBuilder: FormBuilder) {
    this.addBusinessForm = this.formBuilder.group({
      bname: ['', [Validators.required]],
      bdescription: [],
      bcountry: ['', [Validators.required]],
      bstate: ['', [Validators.required]],
      bcity: ['', [Validators.required]],
      bzipcode: [],
      baddress: ['', [Validators.required]],
      bphone: [],
      bemail: [],
    });
    this.coutryList = Country.getAllCountries();
  }

  onCountrySelection() {
    this.sCountry = this.addBusinessForm.get('bcountry')?.value;
    this.stateList = State.getStatesOfCountry(this.sCountry.isoCode);
  }
  onStateSelection() {
    this.sState = this.addBusinessForm.get('bstate')?.value;
    this.cityList = City.getCitiesOfState(
      this.sCountry.isoCode,
      this.sState.isoCode
    );
  }
}
