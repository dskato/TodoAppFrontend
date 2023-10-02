import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country, City, State } from 'country-state-city';
import { AdminService } from 'src/app/services/api/admin/admin.service';
import { UserDto } from 'src/app/interfaces/user-dto';


@Component({
  selector: 'app-edit-business-dialog',
  templateUrl: './edit-business-dialog.component.html',
  styleUrls: ['./edit-business-dialog.component.css']
})
export class EditBusinessDialogComponent implements OnInit{

  addBusinessForm!: FormGroup;
  coutryList!: any;
  stateList!: any;
  cityList!: any;
  userList!: UserDto[];

  //---
  sCountry!: any;
  sState!: any;

  constructor(public dialogRef: MatDialogRef<EditBusinessDialogComponent>, private adminService:AdminService, private formBuilder:FormBuilder) {

    this.addBusinessForm = this.formBuilder.group({
      bname: ['', [Validators.required]],
      bdescription: [],
      bcountry: ['', [Validators.required]],
      bstate: ['', [Validators.required]],
      bcity: ['', [Validators.required]],
      bzipcode: [],
      baddress: ['', [Validators.required]],
      bphone: [],
      bemail: ['', [Validators.required]]
    });
    this.coutryList = Country.getAllCountries();

    this.adminService.getAssignableUsers().subscribe(
      (response) => {
        this.userList = response.data as unknown as UserDto[];
      },
      (error) => {
        console.log(error);
      }
    );

   }

  ngOnInit(): void {
  }

  onCloseClick(): void {
    this.dialogRef.close();
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
