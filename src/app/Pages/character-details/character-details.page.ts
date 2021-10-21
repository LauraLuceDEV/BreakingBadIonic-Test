import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { BBCharacter } from 'src/app/Models/Interfaces';
import { BreakingBadApiService } from 'src/app/Providers/breaking-bad-api.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.page.html',
  styleUrls: ['./character-details.page.scss'],
})
export class CharacterDetailsPage implements OnInit, OnDestroy {
  characterID: number;
  character: BBCharacter;
  characterName: string;
  characterQuote: string;
  conexionFailed = false;

  private subscription: Subscription = new Subscription();

  //----
  // CICLO DE VIDA
  //----
  constructor(private actRoute: ActivatedRoute,
    private router: Router,
    private loadingCtrl: LoadingController,
    private apiServ: BreakingBadApiService) { }

  ngOnInit() {}

  ionViewWillEnter(){
    this.presentLoading();
    this.chargeData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  //----
  // MÉTODOS
  //----

  goBackPage(){
    this.router.navigateByUrl('home');
  }

  // Ventana de loading
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Loading data',
      duration: 3000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  // Nos carga los datos
  async chargeData() {
    this.characterID = Number(this.actRoute.snapshot.paramMap.get('id'));
    this.characterName = this.actRoute.snapshot.paramMap.get('character-name');

    this.subscription.add(
      this.apiServ.getcharacterByID(this.characterID).subscribe( (resp) => {
        this.character = resp[0];

        this.subscription.add(
          this.apiServ.getRandomQuote(this.characterName).subscribe( (charNameResp) =>{
            this.loadingCtrl.dismiss();

            if(charNameResp.length > 0){
              const randomindex = Math.floor(Math.random() * (charNameResp.length - 0)) + 0;
              const quotes = [];
              charNameResp.forEach( element => { quotes.push(element);});
              this.characterQuote = quotes[randomindex].quote;
            }else{
              this.characterQuote = `. . .`;
            }
          },
          error => {
            this.conexionFailed = true;
            this.loadingCtrl.dismiss();
          })
        );
      },
      error => {
        this.conexionFailed = true;
        this.loadingCtrl.dismiss();
      }
      )
    );
  }
}
