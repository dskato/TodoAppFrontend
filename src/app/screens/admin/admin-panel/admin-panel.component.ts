import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {

  vvAddBusinessComponent: boolean = true;
  //vvUserComponent: boolean = false;

  constructor(){

  }


  showAddBusinessComponent(){
    this.vvAddBusinessComponent = true;
  }
}
