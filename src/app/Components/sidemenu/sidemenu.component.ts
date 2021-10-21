/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakingBadApiService } from 'src/app/Providers/breaking-bad-api.service';
import { MenuController} from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'side-menu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  selectedLanguage = 'es';

  constructor(private router: Router,
    private apiService: BreakingBadApiService,
    private menuCtrl: MenuController,
    private translateService: TranslateService) {
      this.translateService.setDefaultLang(this.selectedLanguage);
      this.translateService.use(this.selectedLanguage);
     }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClickEnglishPage(){
    this.translateService.use('en');
  }

  onClickSpanishPage(){
    this.translateService.use('es');
  }

  onClickRandomCharacter(){
    this.subscription.add(
      this.apiService.getRandomcharacter().subscribe(
      (resp) => {
        const characterID = Number(resp[0].char_id);
        let characterName;

        this.subscription.add(this.apiService.getcharacterByID(characterID)
          .subscribe( (resp2) =>{
          characterName = resp2[0].name;
          this.router.navigateByUrl(`/character-details/${characterID}/${characterName}`);
          }
          )
        );
      }
    )
  );
    this.menuCtrl.close();
  }

}
