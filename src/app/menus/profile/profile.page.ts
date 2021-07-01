import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import firebase from 'firebase/app';
import { ActionSheetController } from '@ionic/angular';
import { UserproviderService } from 'src/app/services/userprovider.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profile: any;

  profiledata: any;
  ownerprofile = [];
  ownerpro = [];
  constructor(private firestore: FirestoreService,
    private actionSheetCtrl: ActionSheetController,
    private userProvideserv : UserproviderService,
    private api: ApiService,
    ) { }

  ngOnInit() {
    this.profile = this.userProvideserv.loggedUser;
    // firebase.auth().onAuthStateChanged(user => {
    //   console.log('Authusers', user)
    //   if (user) {
    //     this.firestore.getOne('users', user.uid).subscribe(use => {
    //       this.ownerpro.push(use)
    //       console.log('oneuser', use)
    //     })
    //   }
    // })
    //this.registerdetails()
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Choose',
      cssClass:'my-action',
      buttons: [
        {
          text: 'Camera',
          role: 'destructive',
          icon: 'camera',
          cssClass:'camera-action',
          handler: () => {
            this.Accesscamera()
            console.log('The Camera has been clicked!');
          }

        }, {
          text: 'Gallery',
          icon: 'image',
          cssClass:'gallery-action',
          handler: () => {
            this.AccessGallery()
            console.log('The Gallery has been clicked!');
          }
        }, {
          text: 'Cancel',
          role: 'close',
          icon: 'close',
          cssClass:'close-action',
          handler: () => {
            console.log('The Gallery has been clicked!');
          }
        }
      ],
    });
    await actionSheet.present();
    actionSheet.onWillDismiss().then(() => {
      console.log('the action sheet is about to close');
    });
    actionSheet.onDidDismiss().then(() => {
      console.log('the action sheet has already closed');
    });
  }

 async Accesscamera() {
    await this.userProvideserv.openCameraProfile();
  }
 async AccessGallery() { 
    await this.userProvideserv.openAlbumProfile();

  }

 async save(){
    const profileinfo={
      bussinessname: this.profile.bussinessname,
      name : this.profile.name,
      Email: this.profile.Email
    }
     console.log('profile', profileinfo)
    this.api.updateprofile(this.userProvideserv.loggedUser.id, profileinfo).subscribe(async res=>{
      console.log('resultprofile', res);
    });
    const toast = await this.userProvideserv.createToast('Profile Updated',false, 'top',500,'toast-custom1-class');
     toast.present();
     console.log('profile updated',profileinfo)
     
  }
 
}
