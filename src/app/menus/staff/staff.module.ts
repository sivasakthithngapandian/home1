import { Component,NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StaffPageRoutingModule } from './staff-routing.module';
import {CalendarModule} from 'ion2-calendar'
import { StaffPage } from './staff.page';
import {RouterModule} from '@angular/router';
import { AppPluginWeb } from '@capacitor/core';


import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

export function homeHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/login/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild({
      loader:{
        provide: TranslateLoader,
        useFactory: homeHttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    
    StaffPageRoutingModule,
    RouterModule.forChild([
      {
        path :'',
        component : StaffPage
      }
    ]),
    CalendarModule

  ],
  declarations: [StaffPage]
})
export class StaffPageModule {}
