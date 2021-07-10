import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular';
import { RegistrationPageRoutingModule, } from './registration-routing.module';
import { RegistrationPage } from './registration.page';
import { AgmCoreModule } from '@agm/core';
import { RouterModule } from '@angular/router';

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
    RegistrationPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader:{
        provide: TranslateLoader,
        useFactory: homeHttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AgmCoreModule,
    RouterModule.forChild([
      {
        path: '',
        component: RegistrationPage
      }
    ]),
  ],
  declarations: [RegistrationPage]
})
export class RegistrationPageModule { }
