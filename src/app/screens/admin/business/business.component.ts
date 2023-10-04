import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country, City, State } from 'country-state-city';
import { AdminService } from 'src/app/services/api/admin/admin.service';
import { UserDto } from 'src/app/interfaces/user-dto';
import { TokenService } from 'src/app/services/token/token.service';
import { SaveBusiness } from 'src/app/interfaces/save-business';
import { ToastrService } from 'ngx-toastr';
import { AssignUser } from 'src/app/interfaces/assign-user';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private toastr: ToastrService,
    private translateService: TranslateService
  ) {
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

  saveBusiness() {
    var saveBusinessDto = {} as SaveBusiness;
    if (this.addBusinessForm.valid) {
      
      var sCountry = this.addBusinessForm.get('bcountry')?.value;
      var sState = this.addBusinessForm.get('bstate')?.value;
      var sCity = this.addBusinessForm.get('bcity')?.value;

      saveBusinessDto.name = this.addBusinessForm.get('bname')?.value;
      saveBusinessDto.description =
        this.addBusinessForm.get('bdescription')?.value;
      saveBusinessDto.address = this.addBusinessForm.get('baddress')?.value;
      saveBusinessDto.country = sCountry.name;
      saveBusinessDto.state = sState.name;
      saveBusinessDto.city = sCity.name;
      saveBusinessDto.zipCode = this.addBusinessForm.get('bzipcode')?.value;
      saveBusinessDto.phone = this.addBusinessForm.get('bphone')?.value;
      saveBusinessDto.email = this.addBusinessForm.get('bemail')?.value;

      //Add business
      this.adminService.saveBusiness(saveBusinessDto).subscribe(
        (response) => {
          if (response.code == 200) {
            this.toastr.success(
              this.translateService.instant('business-succesfully'),
              'Ok'
            );
          } else {
            this.toastr.error(response.data, 'Error');
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

/*
            var businessId = response.data;
            var assignUserDto = {} as AssignUser;
            assignUserDto.idBusiness = parseInt(businessId);
            assignUserDto.idUser = representativeUser.idUser;
            assignUserDto.isRepresentative = true;
            //Make selected user representative
            this.adminService.makeUserRepresentative(assignUserDto).subscribe(
              (response) => {
                if (response.code == 200) {
                  this.toastr.success(
                    this.translateService.instant('business-succesfully'),
                    'Ok'
                  );
                } else {
                  this.toastr.error(response.data, 'Error');
                }
              },
              (error) => {
                console.log(error);
              }
            );

            this.adminService.getAssignableUsers().subscribe(
      (response) => {
        this.userList = response.data as unknown as UserDto[];
      },
      (error) => {
        console.log(error);
      }
    );
            */
