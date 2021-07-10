import { StaffPage} from 'src/app/menus/staff/staff.page';
import { Injectable } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { async } from 'q';

@Injectable({
  providedIn: 'root'
})
export class PopupModalService {

  constructor( private modalController: ModalController) {}

    async presentModal(){
      const modal = await this.modalController.create({
        component: StaffPage,
        cssClass: 'my-custom-class'
      });
      return await modal.present();
    }
    dismiss(){
      this.modalController.dismiss({
        'dismissed':true
      });
    }
   }

