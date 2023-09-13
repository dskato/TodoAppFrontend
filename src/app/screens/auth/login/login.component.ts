import { Component } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { AuthenticationService } from 'src/app/services/api/auth/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private languageService: LanguageService,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private translateService: TranslateService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  switchLanguage() {
    this.languageService.switchLanguage();
  }

  sigin(){
    this.router.navigate(['/signin']);
  }

  login() {
    if (this.loginForm.valid) {
      this.authService
        .login(
          this.loginForm.get('email')?.value,
          this.loginForm.get('password')?.value
        )
        .subscribe(
          (response) => {
            if (response.code != 200) {
              this.toastr.error(
                this.translateService.instant('incorrect-auth'),
                'Error'
              );
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
}
