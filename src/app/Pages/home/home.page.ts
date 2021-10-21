/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingController, MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { BBCharacter } from 'src/app/Models/Interfaces';
import { BreakingBadApiService } from 'src/app/Providers/breaking-bad-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements  OnInit, OnDestroy {
  public characterList: BBCharacter[] = [];
  public mainCharacterList: BBCharacter[] = [];
  public secondaryCharacterList: BBCharacter[] = [];
  public extraCharacterList: BBCharacter[] = [];
  public conexionFailed = false;
  public selectedLanguage = 'es';

  private subscription: Subscription = new Subscription();
  //-----
  // CICLO DE VIDA
  //-----
  ngOnInit(): void {
  }

  ionViewWillEnter(){
    this.characterList = [];
    this.presentLoading();
    this.loadData();
  }

  // Nos debuscribimos de nuestros observables activos
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  constructor(private apiService: BreakingBadApiService,
    private menuCtrl: MenuController,
    private loadingCtrl: LoadingController) {}


  //-----
  // MÉTODOS
  //-----

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Loading data',
      duration: 3500
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

  loadData() {
    this.subscription.add(
      this.apiService.getAllcharacters().subscribe( (resp)=>{
        this.loadingCtrl.dismiss();
        resp.forEach(element =>{
          this.characterList.push(element);
        });
        console.log(this.characterList)
        // Clonamos array
        this.extraCharacterList= [...this.characterList];
        // Personajes principales
        this.mainCharacterList = [...this.extraCharacterList.splice(0,9)];

        // Personajes secundarios y nos quedamos con el resto que son extras
        this.secondaryCharacterList = [...this.extraCharacterList.splice(0,10)];
      },
      error=>{
        console.log(error);
        this.conexionFailed = true;
        this.loadingCtrl.dismiss();})
    );
  }


  // Cambiamos el listado de los personajes para así poder filtrarlos
  onChangeCharacterSelect(event: any){
  const characterType = event.target.value;

  switch(characterType) {
    case 'principal': {
      this.characterList = this.mainCharacterList;
       break;
    }
    case 'secondary': {
      this.characterList = this.secondaryCharacterList;
       break;
    }
    case 'extras': {
      this.characterList = this.extraCharacterList;
      break;
   }
 }
}

// Nos abrirá el menu lateral para gestionar las opciones de idioma y demás
openSideBarMenu(){
  this.menuCtrl.toggle();
}
}

