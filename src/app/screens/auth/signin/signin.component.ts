import { Component } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  signinForm!: FormGroup;

  constructor(
    private languageService: LanguageService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.signinForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      dateofbirth: ['', [Validators.required]],

      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  switchLanguage() {
    this.languageService.switchLanguage();
  }

  goHome() {
    this.router.navigate(['/login']);
  }
}
