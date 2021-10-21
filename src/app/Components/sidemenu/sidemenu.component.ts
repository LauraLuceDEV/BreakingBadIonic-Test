import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakingBadApiService } from 'src/app/Providers/breaking-bad-api.service';
import { MenuController} from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'side-menu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent implements OnInit {
  selectedLanguage = 'es';

  constructor(private router: Router,
    private apiService: BreakingBadApiService,
    private menuCtrl: MenuController,
    private translateService: TranslateService) {
      this.translateService.setDefaultLang(this.selectedLanguage);
      this.translateService.use(this.selectedLanguage);
     }

  ngOnInit() {}

  onClickEnglishPage(){
    this.translateService.use('en');
  }

  onClickSpanishPage(){
    this.translateService.use('es');
  }

  onClickRandomCharacter(){
    this.apiService.getRandomcharacter().subscribe(
      (resp) => {
        const characterID = Number(resp[0].char_id);
        console.log(characterID);
        this.router.navigateByUrl(`/character-details/${characterID}`);
      }
    );
    this.menuCtrl.close();
  }

}
