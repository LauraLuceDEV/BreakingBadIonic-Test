/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { BBCharacter } from 'src/app/Models/Interfaces';
import { BreakingBadApiService } from 'src/app/Providers/breaking-bad-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements  OnInit {
  public characterList: BBCharacter[] = [];
  public mainCharacterList: BBCharacter[] = [];
  public secondaryCharacterList: BBCharacter[] = [];
  public extraCharacterList: BBCharacter[] = [];
  selectedLanguage = 'es';
  //-----
  // CICLO DE VIDA
  //-----
  ngOnInit(): void {}

  ionViewWillEnter(){
    this.loadData();
  }

  constructor(private apiService: BreakingBadApiService,
    private menuCtrl: MenuController) {}


  //-----
  // MÉTODOS
  //-----

  loadData() {
    this.apiService.getAllcharacters().subscribe( (resp)=>{
      resp.forEach(element =>{
        this.characterList.push(element);
      });
      // Clonamos array
      this.extraCharacterList= [...this.characterList];
      // Personajes principales
      this.mainCharacterList = this.extraCharacterList.splice(0,9);

      // Personajes secundarios y nos quedamos con el resto que son extras
      this.secondaryCharacterList = this.extraCharacterList.splice(0,10);
    });
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

