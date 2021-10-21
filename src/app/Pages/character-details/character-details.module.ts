import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CharacterDetailsPageRoutingModule } from './character-details-routing.module';

import { CharacterDetailsPage } from './character-details.page';
import { TranslateModule } from '@ngx-translate/core';
import {ErrorLoadingDataComponent} from '../../Components/error-loading-data/error-loading-data.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CharacterDetailsPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [CharacterDetailsPage, ErrorLoadingDataComponent]
})
export class CharacterDetailsPageModule {}
