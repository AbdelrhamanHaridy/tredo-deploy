import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SystemLanguage } from '../../modules/shared/models/system-language.model';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(private translate: TranslateService) { }

  // ! commented cuz it's set in app config.ts
  // init(): void {
  //   this.translate.setDefaultLang('en');
  //   this.translate.use('en');
  //   console.log('init language', this.translate.currentLang);
  // }

  setLanguage(lang: SystemLanguage): void {
    console.log('TranslationService set language');
    this.translate.use(lang);
    document.documentElement.dir = lang === SystemLanguage.ARABIC ? 'rtl' : 'ltr';
  }

  toggleLanguage(): void {
    console.log('toggle language run', this.translate.currentLang);

    const currentLanguage =
      this.translate.currentLang === SystemLanguage.ARABIC ? SystemLanguage.ENGLISH : SystemLanguage.ARABIC;
    this.translate.use(currentLanguage);
    document.documentElement.dir = currentLanguage === SystemLanguage.ARABIC ? 'rtl' : 'ltr';
  }

  getCurrentLang(): string {
    return this.translate.currentLang;
  }
}
