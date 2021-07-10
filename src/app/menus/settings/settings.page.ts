import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { I18nServiceService } from 'src/app/services/i18n-service.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    private i18nService:I18nServiceService,
    private translate: TranslateService,
  ) { translate.addLangs(['en','ta','hi']);
  translate.setDefaultLang('en');
  const browserLang = this.translate.getBrowserLang();
  translate.use(browserLang.match(/en | ta | hi /) ? browserLang : 'en');
  this.translate.use('en');
   
 } 

  ngOnInit() {
    this.i18nService.localeEvent.subscribe(locale => this.translate.use(locale));
  }

  
  changeLocale(locale){

    this.translate.use(locale.detail.value);
    console.log(locale);
    }
  }
