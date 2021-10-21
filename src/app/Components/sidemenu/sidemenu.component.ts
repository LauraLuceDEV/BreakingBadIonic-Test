import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakingBadApiService } from 'src/app/Providers/breaking-bad-api.service';
import { MenuController} from '@ionic/angular';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'side-menu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent implements OnInit {

  constructor(private router: Router,
    private apiService: BreakingBadApiService,
    private menuCtrl: MenuController) { }

  ngOnInit() {}

  onClickEnglishPage(){}

  onClickSpanishPage(){}

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
