import { Component } from '@angular/core';
import { RouteGuardService } from 'src/app/services/auth-guard/route-guard.service';
import { LanguageService } from 'src/app/services/language.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css'],
})
export class CheckInComponent {
  constructor(
    private tokenService: TokenService,
    private languageService: LanguageService,
    private routeGuardService: RouteGuardService
  ) {
    this.tokenService.redirectIfNotValid('/login');
  }

  switchLanguage() {
    this.languageService.switchLanguage();
  }

  logOut(){
    this.routeGuardService.logOut();
  }
}
