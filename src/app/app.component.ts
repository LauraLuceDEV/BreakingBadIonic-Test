import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // Idioma por defecto (inglés)
  selectedLanguage = 'en';

  // constructor(private translateService: TranslateService) {
  //   this.translateService.setDefaultLang(this.selectedLanguage);
  //   this.translateService.use(this.selectedLanguage);
  // }

  // toogleLanguage(lang: string) {
  //   this.translateService.use(lang);
  // }
}
