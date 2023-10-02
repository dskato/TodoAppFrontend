import { Component } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { RouteGuardService } from 'src/app/services/auth-guard/route-guard.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {

  vvAddBusinessComponent: boolean = false;
  vvBIManagementOptionsComponent: boolean = true;
  //vvUserComponent: boolean = false;

  constructor(private languageService: LanguageService, private routeGuardService: RouteGuardService){

  }


  showComponent(componentName: string) {
    this.vvAddBusinessComponent = componentName === 'addBusiness';
    this.vvBIManagementOptionsComponent = componentName === 'biManagement';
  }

  switchLanguage() {
    this.languageService.switchLanguage();
  }

  logOut(){
    this.routeGuardService.logOut();
  }
}
