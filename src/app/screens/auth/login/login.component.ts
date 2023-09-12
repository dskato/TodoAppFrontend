import { Component } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private languageService: LanguageService) {
    
  }

  switchLanguage(){
    this.languageService.switchLanguage();
  }
  
}
