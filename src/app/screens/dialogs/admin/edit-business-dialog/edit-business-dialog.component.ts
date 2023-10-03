import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country, City, State } from 'country-state-city';
import { AdminService } from 'src/app/services/api/admin/admin.service';
import { UserDto } from 'src/app/interfaces/user-dto';
import { SaveBusiness } from 'src/app/interfaces/save-business';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-business-dialog',
  templateUrl: './edit-business-dialog.component.html',
  styleUrls: ['./edit-business-dialog.component.css'],
})
export class EditBusinessDialogComponent implements OnInit {
  addBusinessForm!: FormGroup;
  coutryList!: any;
  stateList!: any;
  cityList!: any;
  userList!: UserDto[];

  //---
  sCountry!: any;
  sState!: any;
  sCity!: any;
  //--
  selectedBI!: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditBusinessDialogComponent>,
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private translateService: TranslateService
  ) {
    this.selectedBI = this.data;
    this.addBusinessForm = this.formBuilder.group({
      bname: [this.selectedBI.name || '', [Validators.required]],
      bdescription: [this.selectedBI.description || ''],
      bcountry: [this.selectedBI.country || '', [Validators.required]],
      bstate: [this.selectedBI.state || '', [Validators.required]],
      bcity: [this.selectedBI.city || '', [Validators.required]],
      bzipcode: [this.selectedBI.zipCode || ''],
      baddress: [this.selectedBI.address || '', [Validators.required]],
      bphone: [this.selectedBI.phone || ''],
      bemail: [this.selectedBI.email || '', [Validators.required]],
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

  ngOnInit(): void {}

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

  onCitySelection() {
    this.sCity = this.addBusinessForm.get('bcity')?.value;
  }

  updateBusiness() {
    var saveBusinessDto = {} as SaveBusiness;
    if (
      this.addBusinessForm.valid &&
      this.sCountry != undefined &&
      this.sState != undefined &&
      this.sCity != undefined
    ) {
      
      saveBusinessDto.idBusiness = this.selectedBI.idBusiness;
      saveBusinessDto.name = this.addBusinessForm.get('bname')?.value;
      saveBusinessDto.description =
        this.addBusinessForm.get('bdescription')?.value;
      saveBusinessDto.address = this.addBusinessForm.get('baddress')?.value;
      saveBusinessDto.country = this.sCountry.name;
      saveBusinessDto.state = this.sState.name;
      saveBusinessDto.city = this.sCity.name;
      saveBusinessDto.zipCode = this.addBusinessForm.get('bzipcode')?.value;
      saveBusinessDto.phone = this.addBusinessForm.get('bphone')?.value;
      saveBusinessDto.email = this.addBusinessForm.get('bemail')?.value;

      this.adminService.updateBusiness(saveBusinessDto).subscribe(
        (response) => {
          if (response.code == 200) {
            this.toastr.success(
              this.translateService.instant('businessform-edit-ok'),
              'Ok'
            );
            this.onCloseClick();
          } else {
            this.toastr.error(response.data, 'Error');
            this.onCloseClick();
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.toastr.error(
        this.translateService.instant('business-add-description'),
        'Error'
      );
    }
  }
}
