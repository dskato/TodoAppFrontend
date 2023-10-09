import { Component } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { RouteGuardService } from 'src/app/services/auth-guard/route-guard.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent {
  vvAddBusinessComponent: boolean = false;
  vvBIManagementOptionsComponent: boolean = false;
  vvUserManagementComponent: boolean = false;
  vvEventManagementComponent: boolean = false;
  vvAddEventComponent: boolean = true;


  //Component visibilty
  vvAddBIOption: boolean = false;

  constructor(
    private languageService: LanguageService,
    private routeGuardService: RouteGuardService,
    private tokenService: TokenService
  ) {
    this.tokenService.redirectIfNotValid('/login');
    
    if (tokenService.getUserRole() == 'SUPERADMIN') {
      this.vvAddBIOption = true;
    } else {
      this.vvAddBIOption = false;
    }
  }

  showComponent(componentName: string) {
    this.vvAddBusinessComponent = componentName === 'addBusiness';
    this.vvBIManagementOptionsComponent = componentName === 'biManagement';
    this.vvUserManagementComponent = componentName === 'userManagement';
    this.vvEventManagementComponent = componentName === 'eventManagement';
    this.vvAddEventComponent = componentName === 'addEvent';

  }

  switchLanguage() {
    this.languageService.switchLanguage();
  }

  logOut() {
    this.routeGuardService.logOut();
  }
}
