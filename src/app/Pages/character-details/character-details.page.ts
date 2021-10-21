import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BBCharacter } from 'src/app/Models/Interfaces';
import { BreakingBadApiService } from 'src/app/Providers/breaking-bad-api.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.page.html',
  styleUrls: ['./character-details.page.scss'],
})
export class CharacterDetailsPage implements OnInit {
  characterID: number;
  character: BBCharacter;
  characterName: string;
  characterQuote: string;

  //----
  // CICLO DE VIDA
  //----
  constructor(private actRoute: ActivatedRoute,
    private router: Router,
    private apiServ: BreakingBadApiService) { }

  ngOnInit() {}

  ionViewWillEnter(){
    this.chargeData();
  }


  //----
  // MÉTODOS
  //----

  goBackPage(){
    this.router.navigateByUrl('home');
  }
  async chargeData() {
    this.characterID = Number(this.actRoute.snapshot.paramMap.get('id'));
    this.characterName = this.actRoute.snapshot.paramMap.get('character-name');

    this.apiServ.getcharacterByID(this.characterID).subscribe( (resp) => {
      this.character = resp[0];
    });

    this.apiServ.getRandomQuote(this.characterName).subscribe( (resp) =>{
      const randomindex = Math.floor(Math.random() * (resp.length - 0)) + 0;
      const quotes = [];
      resp.forEach( element => { quotes.push(element);});
      this.characterQuote = quotes[randomindex].quote;
    });
  }

}
