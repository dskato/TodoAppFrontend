import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  currentLanguage: string = 'en';

  constructor(private translate: TranslateService) {
    translate.setDefaultLang(this.currentLanguage);
  }

  switchLanguage() {
    if (this.currentLanguage === 'en') {
      this.translate.use('es'); // Switch to Spanish
      this.currentLanguage = 'es';
    } else {
      this.translate.use('en'); // Switch to English
      this.currentLanguage = 'en';
    }
  }
}
