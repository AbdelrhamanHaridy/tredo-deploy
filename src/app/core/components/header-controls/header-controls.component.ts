import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { LanguageService } from '../../services/language.service';
import { LANGUAGES } from '../../i18n/i18n.config';

@Component({
  selector: 'app-header-controls',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    NzButtonModule,
    NzIconModule,
    NzDropDownModule,
  ],
  template: `
    <div class="flex items-center space-x-4 rtl:space-x-reverse">
      <!-- <button
        nz-button
        nzType="text"
        class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        (click)="themeService.toggleTheme()">
        <i nz-icon [nzType]="(themeService.theme$ | async) === 'dark' ? 'sun' : 'moon'" nzTheme="outline"></i>
      </button> -->

      <button
        nz-button
        nzType="text"
        class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        (click)="languageService.toggleLanguage()"
      >
        <span class="font-medium">{{
          languageService.getCurrentLanguage().name
        }}</span>
      </button>

      <button
        nz-button
        nzType="text"
        class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
      >
        <i nz-icon nzType="bell" nzTheme="outline"></i>
      </button>

      <div class="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
    </div>
  `,
})
export class HeaderControlsComponent {
  constructor(public languageService: LanguageService) {}
}
