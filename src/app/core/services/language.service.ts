import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGES, LanguageCode } from '../i18n/i18n.config';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private language = new BehaviorSubject<LanguageCode>('en');
  language$ = this.language.asObservable();

  constructor(private translate: TranslateService) {
    // تهيئة اللغات المتاحة
    translate.addLangs(Object.keys(LANGUAGES));

    // استرجاع اللغة المحفوظة من التخزين المحلي
    const savedLang = localStorage.getItem('language') as LanguageCode;
    if (savedLang && LANGUAGES[savedLang]) {
      this.setLanguage(savedLang);
    } else {
      // استخدام اللغة الافتراضية
      this.setLanguage('en');
    }
  }

  setLanguage(lang: LanguageCode) {
    if (LANGUAGES[lang]) {
      this.translate.use(lang);
      document.documentElement.dir = LANGUAGES[lang].dir;
      document.documentElement.lang = lang;
      localStorage.setItem('language', lang);
      this.language.next(lang);
    }
  }

  toggleLanguage() {
    const current = this.language.value;
    this.setLanguage(current === 'ar' ? 'en' : 'ar');
    window.location.reload();
  }

  getCurrentLanguage() {
    return LANGUAGES[this.language.value];
  }
}
