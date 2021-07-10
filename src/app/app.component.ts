import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { UserproviderService } from './services/userprovider.service';
import { Plugins, StatusBarStyle } from '@capacitor/core';
const { SplashScreen, StatusBar } = Plugins;
import firebase from 'firebase/app'
import { FirestoreService } from './services/firestore.service';
import { ApiService } from 'src/app/services/api.service';
import {User} from 'src/app/models/user';
import { TranslateService } from '@ngx-translate/core';
import { LoginPage } from 'src/app/login/login.page';
import { I18nServiceService } from './services/i18n-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  title = 'ngx-i18n';
  mobiledata: any;
  mobilenum = [];
  mobilenu : any;
  public loggedInUser: User;


  constructor(private router: Router,
   public   translate: TranslateService,
    private i18nService: I18nServiceService,
    private plt: Platform,
    private firestore: FirestoreService,
    private api: ApiService,
    private alertcontroller: AlertController,
    private userProvide: UserproviderService) {
      translate.addLangs(['en','ta','hi']);
                translate.setDefaultLang('en');
                const browserLang = this.translate.getBrowserLang();
                translate.use(browserLang.match(/en | ta | hi /) ? browserLang : 'en');
                this.translate.use('en');
    
    this.initializeApp();
    this.loggedInUser = this.userProvide.getUserData();
    //this.mobilenu = this.userProvide.loggedUser.name ? this.userProvide.loggedUser.name: '';
    if (this.loggedInUser) {
      if (this.loggedInUser.bussinessname !== null) {
        this.router.navigate(['/home']);
      }
      else {
        this.router.navigate(['/registration']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }


    async delete(){
      const alert = await this.alertcontroller.create({
        cssClass: 'my-custom-class',
         header: 'Confirm!',
         message: 'Do you want to delete this Account?',
         buttons:[
           {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            },
           },
           {
            text: 'Yes',
            handler: async(datang:any) => {
              this.firestore.delete('users',this.userProvide.loggedUser.id).then(res=>{
                this.userProvide.goToNew('/login');
               });
              await alert.dismiss();
            }
          }
        ]
      });
      await alert.present();
     
    // delete(){
    //   this.firestore.delete('users',this.userProvide.loggedUser.id).then(res=>{
    //    this.userProvide.goToNew('/login');
    //   });
    // }
  
    
  }
  
  
  changeLocale(locale){

    this.translate.use(locale.detail.value);
    console.log(locale);
    }

  async ngOnInit() {
    //this.mobilenu = this.userProvide.loggedUser
    this.i18nService.localeEvent.subscribe(locale => this.translate.use(locale));
  }

  initializeApp() {
    this.plt.ready().then(() => {
      StatusBar.setStyle({
        style: StatusBarStyle.Dark
      }).catch(err => { console.log(`ERROR ${err}`) });
      if (this.plt.is('android')) {
        StatusBar.setOverlaysWebView({
          overlay: false
        }).catch(err => { console.log(`ERROR ${err}`) });
        StatusBar.setBackgroundColor({
          color: '#228B22'
        }).catch(err => { console.log(`ERROR ${err}`) });
      }
      SplashScreen.hide();
    });
  }

  async close() {
    await this.userProvide.logout();
    this.router.navigate(['/login'])
  }

}
