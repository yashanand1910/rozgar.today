import { Component, Input } from '@angular/core';

import { I18nService } from '@i18n/services';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.less']
})
export class LanguageSelectorComponent {
  @Input() inNavbar = false;
  @Input() menuClass = '';

  constructor(private i18nService: I18nService) {}

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }
}
