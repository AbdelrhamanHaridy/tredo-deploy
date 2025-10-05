import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { NZ_I18N, ar_EG, en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import ar from '@angular/common/locales/ar';
import en from '@angular/common/locales/en';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';

import { createTranslateLoader } from './core/i18n/i18n.config';
import {
  provideHttpClient,
  HttpClient,
  HTTP_INTERCEPTORS,
  withInterceptors,
} from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {
  MenuOutline,
  HomeOutline,
  AreaChartOutline,
  FileTextOutline,
  SettingOutline,
  MoonOutline,
  BellOutline,
  SunOutline,
  UserOutline,
  LockOutline,
  LogoutOutline,
  SearchOutline,
  PlusOutline,
  EditOutline,
  DeleteOutline,
  DownloadOutline,
  UploadOutline,
  InfoCircleOutline,
  ExclamationCircleOutline,
  CheckCircleOutline,
  CloseCircleOutline,
} from '@ant-design/icons-angular/icons';
import { LoaderInterceptor } from './core/services/admin/interceptors/loader.interceptor';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { GlobalInterceptor } from './core/interceptors/global.interceptor';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

registerLocaleData(en);
registerLocaleData(ar);

const icons: IconDefinition[] = [
  MenuOutline,
  HomeOutline,
  AreaChartOutline,
  FileTextOutline,
  SettingOutline,
  MoonOutline,
  BellOutline,
  SunOutline,
  UserOutline,
  LockOutline,
  LogoutOutline,
  SearchOutline,
  PlusOutline,
  EditOutline,
  DeleteOutline,
  DownloadOutline,
  UploadOutline,
  InfoCircleOutline,
  ExclamationCircleOutline,
  CheckCircleOutline,
  CloseCircleOutline,
];

export const appConfig: ApplicationConfig = {
  providers: [
    BrowserAnimationsModule,
    // provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    MessageService,
    provideHttpClient(
      withInterceptors([GlobalInterceptor, TokenInterceptor, LoaderInterceptor])
    ),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
      }),
      NzIconModule.forRoot(icons),
      NzDropDownModule
    ),
    { provide: NZ_I18N, useValue: en_US },
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.my-app-dark',
          /* cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, primeng, tailwind-utilities'
          } */
        },
      },
    }),
  ],
};
