import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const LANGUAGES = {
  ar: {
    name: 'العربية',
    dir: 'rtl',
    code: 'ar'
  },
  en: {
    name: 'English',
    dir: 'ltr',
    code: 'en'
  }
};

export type LanguageCode = keyof typeof LANGUAGES;