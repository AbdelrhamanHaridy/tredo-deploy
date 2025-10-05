import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet],
  template: `
    <router-outlet></router-outlet>
  `,
  styles: ``
})
export class AuthComponent {
  constructor(
    // public themeService: ThemeService,
    public languageService: LanguageService
  ) { }
}
