import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// PETICIONES
import { HttpClient, HttpClientModule } from '@angular/common/http';

// TRADUCCIÓN DE LA APPLICACIÓN
import{ TranslateLoader, TranslateModule} from '@ngx-translate/core';

// Componente - Menu Lateral
import {SidemenuComponent} from '../app/Components/sidemenu/sidemenu.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  declarations: [AppComponent, SidemenuComponent],
  entryComponents: [SidemenuComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
