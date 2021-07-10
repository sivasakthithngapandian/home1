import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppointmentPageRoutingModule } from './appointment-routing.module';

import { AppointmentPage } from './appointment.page';
import {CalendarModule} from 'ion2-calendar';
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
    TranslateModule.forChild({
      loader:{
        provide: TranslateLoader,
        useFactory: homeHttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    IonicModule,
    AppointmentPageRoutingModule,
    RouterModule.forChild([
      {
        path :'',
        component : AppointmentPage
      }
    ]),
    CalendarModule
    
    
  ],
  declarations: [AppointmentPage]
})
export class AppointmentPageModule {}
