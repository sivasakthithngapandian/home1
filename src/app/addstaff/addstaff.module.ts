import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddstaffPageRoutingModule } from './addstaff-routing.module';

import { AddstaffPage } from './addstaff.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddstaffPageRoutingModule
  ],
  declarations: [AddstaffPage]
})
export class AddstaffPageModule {}
