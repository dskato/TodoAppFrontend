import { Component } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/api/auth/authentication.service';
import { SaveUser } from 'src/app/interfaces/save-user';
import { TranslateService } from '@ngx-translate/core';
import { RouteGuardService } from 'src/app/services/auth-guard/route-guard.service';
import { SaveBusiness } from 'src/app/interfaces/save-business';
import { AdminService } from 'src/app/services/api/admin/admin.service';
import { AssignUser } from 'src/app/interfaces/assign-user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  signinForm!: FormGroup;
  businessList!: SaveBusiness[];

  constructor(
    private languageService: LanguageService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthenticationService,
    private translateService: TranslateService,
    private routeGuard: RouteGuardService,
    private adminService: AdminService
  ) {
    this.routeGuard.redirectBasedOnRole();

    this.adminService.getAllBusiness().subscribe(
      (response) => {
        this.businessList = response.data as unknown as SaveBusiness[];
      },
      (error) => {
        console.log(error);
      }
    );

    this.signinForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      dateofbirth: ['', [Validators.required]],

      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      assignedBusiness: [Validators.required],
    });
  }

  saveUser() {
    var saveUserDto = {} as SaveUser;

    if (this.signinForm.valid) {
      
      var selectedBusiness = this.signinForm.get('assignedBusiness')?.value;
      
      if (selectedBusiness.idBusiness == undefined) {
        /* this.toastr.error(this.translateService.instant('sigin-NOTOK'), 'Error'); */
        return;
      }
      saveUserDto.firstName = this.signinForm.get('firstname')?.value;
      saveUserDto.lastName = this.signinForm.get('lastname')?.value;
      saveUserDto.phoneNumber = this.signinForm.get('phone')?.value;
      saveUserDto.address = this.signinForm.get('address')?.value;
      saveUserDto.dateOfBirth = this.signinForm.get('dateofbirth')?.value;
      saveUserDto.email = this.signinForm.get('email')?.value;
      saveUserDto.password = this.signinForm.get('password')?.value;
      saveUserDto.idRole = 1; //By default set user role!

      //Save user
      this.authService.registerUser(saveUserDto).subscribe(
        (response) => {
          console.log(response);
          if (response.code == 200) {
            //Assign user to business
            var assignUserDto = {} as AssignUser;
            assignUserDto.idUser = parseInt(response.data); // returns the userId
            assignUserDto.idBusiness = selectedBusiness.idBusiness;
            this.adminService.assignUserToBusiness(assignUserDto).subscribe(
              (response) => {
                if (response.code == 200) {
                  /* this.toastr.success(
                    this.translateService.instant('sigin-OK'),
                    'Ok'
                  ); */
                  this.goHome();
                } else {
                  /* this.toastr.error(response.data, 'Error'); */
                }
              },
              (error) => {
                console.log(error);
              }
            );
          } else {
            /* this.toastr.error(response.data, 'Error'); */
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  switchLanguage() {
    this.languageService.switchLanguage();
  }

  goHome() {
    this.router.navigate(['/login']);
  }
}
