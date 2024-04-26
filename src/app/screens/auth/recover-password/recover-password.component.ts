import { Component } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/api/auth/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { RouteGuardService } from 'src/app/services/auth-guard/route-guard.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css'],
})
export class RecoverPasswordComponent {
  email!: string;
  code!: string;
  newPassword!: string;
  verifyNewPassword!: string;

  vvCodeInput: boolean = false;
  vvNewPasswordInput: boolean = false;

  constructor(
    private languageService: LanguageService,
    private router: Router,
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private translateService: TranslateService,
    private routeGuard: RouteGuardService
    
  ) {
    this.routeGuard.redirectBasedOnRole();
  }

  switchLanguage() {
    this.languageService.switchLanguage();
  }

  goHome() {
    this.router.navigate(['/login']);
  }

  restorePassword() {
    if (this.email) {
      this.authService.restorePassword(this.email).subscribe(
        (respose) => {
          if (respose.code != 200) {
            /* this.toastr.error(respose.data, 'Error'); */
          } else {
            this.vvCodeInput = true;
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      /* this.toastr.error(
        this.translateService.instant('sigin-validation-email'),
        'Error'
      ); */
    }
  }

  verifyCode() {
    if (this.code) {
      this.authService.verifyCode(this.code).subscribe(
        (respose) => {
          if (respose.code != 200) {
            /* this.toastr.error(respose.data, 'Error'); */
          } else {
            this.vvNewPasswordInput = true;
           /*  this.toastr.success(
              this.translateService.instant('rpassword-validation-codeok'),
              'Ok'
            ); */
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      /* this.toastr.error(
        this.translateService.instant('rpassword-validation-code'),
        'Error'
      ); */
    }
  }

  changePassword() {
    if (!this.newPassword || !this.verifyNewPassword) {
      /* this.toastr.error(
        this.translateService.instant('sigin-validation-password'),
        'Error'
      ); */
    } else {
      if (this.newPassword != this.verifyNewPassword) {
        /* this.toastr.error(
          this.translateService.instant('rpassword-notmatch'),
          'Error'
        ); */
      } else {
        this.authService.changePassword(this.code, this.newPassword).subscribe(
          (response) => {
            if(response.code != 200){
             /*  this.toastr.error(
                response.data,
                'Error'
              ); */
            }else{
              this.toastr.success(
                this.translateService.instant('rpassword-allok'),
                'Ok'
              );
              this.goHome();
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }
}
