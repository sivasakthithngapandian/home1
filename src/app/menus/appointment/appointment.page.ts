import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router'
import {CalendarComponent, CalendarResult} from 'ion2-calendar'
import {AngularFireDatabase} from '@angular/fire/database'
import { FirestoreService } from 'src/app/services/firestore.service';
import {AngularFirestore} from '@angular/fire/firestore';
import { createElementCssSelector} from '@angular/compiler';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { ApiService } from 'src/app/services/api.service';
import { MenuController } from '@ionic/angular';
import { UserproviderService } from 'src/app/services/userprovider.service';
import { TranslateService } from '@ngx-translate/core';
import { I18nServiceService } from 'src/app/services/i18n-service.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';



@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit {

  public succes = "#228B22";
  Date : string;
  currentDate= new Date();
  currentMonth : string;
  value0 = '';

  numColumns: number = 2;
  numOptions: number = 144;
  
  @ViewChild(CalendarComponent,{static : false}) myCalendar:CalendarComponent;
  showAddEvent : boolean;
  minDate=new Date().toISOString();
  newEvent ={
    clientname : '',
    service : '',
    Date : '',
    time : '',
    ///  staff : '',
    //  staffname : ''
  };
  allEvents:any;
  today=[];

  //staffname
  staffdata: any;
  staffnamedata= [];
  public servicedatas:any=[];
  public servicelist: any =[];
  public staffmber = [];

  public service1data: any =[];
  public service1list: any = [];
  servicevalues = [];
  public staff = {
    staffname: '',
    worktime: '',
    phone: '',
    service: '',
    ServiceName: '',
    service1: '',

  }

  

  timeget: any[] = [
    [
      '00:00', '00:05', '00:10', '00:15', '00:20', '00:25', '00:30', '00:35', '00:40', '00:45', '00:50', '00:55',
      '01:00', '01:05', '01:10', '01:15', '01:20', '01:25', '01:30', '01:35', '01:40', '01:45', '01:50', '01:55',
      '02:00', '02:05', '02:10', '02:15', '02:20', '02:25', '02:30', '02:35', '02:40', '02:45', '02:50', '02:55',
      '03:00', '03:05', '03:10', '03:15', '03:20', '03:35', '03:30', '03:35', '03:40', '03:45', '03:50', '03:55',
      '04:00', '04:05', '04:10', '04:15', '04:20', '04:25', '04:30', '04:35', '04:40', '04:45', '04:50', '04:55',
      '05:00', '05:05', '05:10', '05:15', '05:20', '05:25', '05:30', '05:35', '05:40', '05:45', '05:50', '05:55',
      '06:00', '06:05', '06:10', '06:15', '06:20', '06:25', '06:30', '06:35', '06:40', '06:45', '06:50', '06:55',
      '07:00', '07:05', '07:10', '07:15', '07:20', '07:25', '07:30', '07:35', '07:40', '07:45', '07:50', '07:55',
      '08:00', '08:05', '08:10', '08:15', '08:20', '08:25', '08:30', '08:35', '08:40', '08:45', '08:50', '08:55',
      '09:00', '09:05', '09:10', '09:15', '09:20', '09:25', '09:30', '09:35', '09:40', '09:45', '09:50', '09:55',
      '10:00', '10:05', '10:10', '10:15', '10:70', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50', '10:55',
      '11:00', '11:05', '11:10', '11:15', '11:20', '11:25', '11:30', '11:35', '11:40', '11:45', '11:50', '11:55',
      '12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30', '12:35', '12:40', '12:45', '12:50', '12:55',
    ],
    [
      '13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55',
      '14:00', '14:00', '14:00', '14:00', '14:00', '14:00', '14:00', '14:00', '14:00', '14:45', '14:50', '14:55',
      '15:00', '15:05', '15:10', '15:15', '15:20', '15:25', '15:30', '15:35', '15:40', '15:45', '15:50', '15:55',
      '16:00', '16:05', '16:10', '16:15', '16:20', '16:25', '16:30', '16:35', '16:40', '16:45', '16:50', '16:55',
      '17:00', '17:05', '17:10', '17:15', '17:20', '17:25', '17:30', '17:35', '17:40', '17:45', '17:50', '17:55',
      '18:00', '18:05', '18:10', '18:15', '18:20', '18:25', '18:30', '18:35', '18:40', '18:45', '18:50', '18:55',
      '19:00', '19:05', '19:10', '19:15', '19:20', '19:25', '19:30', '19:35', '19:40', '19:45', '19:50', '19:55',
      '20:00', '20:05', '20:10', '20:15', '20:20', '20:25', '20:30', '20:35', '20:40', '20:45', '20:50', '20:55',
      '21:00', '21:05', '21:10', '21:15', '21:20', '21:25', '21:30', '21:35', '21:40', '21:45', '21:50', '21:55',
      '22:00', '22:05', '22:10', '22:15', '22:20', '22:25', '22:30', '22:35', '22:40', '22:45', '22:50', '22:55',
      '23:00', '23:05', '23:10', '23:15', '23:20', '23:25', '23:30', '23:35', '23:40', '23:45', '23:50', '23:55',
      '00:00'
    ]
  ]
  constructor(private router : Router,
              private api : ApiService,
              private pickerCtrl: PickerController,
              //private atp : AmazingTimePickerService,
               public firestore : FirestoreService,
               private userProvide: UserproviderService,
               private i18nService:I18nServiceService,
               private translate: TranslateService,
               private menuCtrl: MenuController) {
                translate.addLangs(['en','ta','hi']);
                translate.setDefaultLang('en');
                const browserLang = this.translate.getBrowserLang();
                translate.use(browserLang.match(/en | ta | hi /) ? browserLang : 'en');
                this.translate.use('en');
                  this.loadEvent();
               }
  onViewTitleChanged(title: string){
    this.currentMonth = title;
  }             

  ngOnInit() {
    this.menuCtrl.enable(true);
    this.menuCtrl.swipeGesture(false);
    this.i18nService.localeEvent.subscribe(locale => this.translate.use(locale));

    this.loadEvent();
   // staffname

   
   //service registration
   this.api.getservice(this.userProvide.loggedUser.id).subscribe(data=>{
    this.api.service1data=data;
    console.log('service register',this.api.service1data)
      for(let i of this.api.service1data)
      this.api.service1list.push(i)
   });
  //service in manua
   this.api.getaddservice(this.userProvide.loggedUser.id).subscribe(res=>{
     console.log('service add manual',res);
     this.api.servicedatas=res;
     for(let i of this.api.servicedatas)
     {
       this.api.servicelist.push(i);
     }
   });
  
  

  }
  

  changeLocale(locale){

    this.translate.use(locale.detail.value);
    console.log(locale);
    }
  
  showHideForm(){
    //this.staffNamedetails()
    this.showAddEvent = !this.showAddEvent;
    this.newEvent ={
      clientname: '',
      service : '',
      Date : new Date().toISOString(),
      time :'',
       //staff : '',
      // staffname :''
    };
    
  }

  addEvent(){
    var date= this.newEvent.Date.split('T') [0];
    const selectedTime={
      id : this.userProvide.loggedUser.id,
      clientname : this.newEvent.clientname,
      service: this.newEvent.service,
      Date : date,
      time : this.value0,
     // staff : this.staffnamelist.staffname + this.newEvent.staff
    };
    console.log(this.newEvent);
    //firestore...
    this.firestore.book(selectedTime).subscribe(res=>{
     this.allEvents=res;
    this.loadEvent();
    })  
    //this.api.updateBooking(selectedTime.id,selectedTime).subscribe(res =>{
    //  this.allEvents=res;
    // this.loadEvent();
    //})
    this.showHideForm();
  }

  loadEvent(){
    this.firestore.findAll('booking').subscribe(res=>{
      this.allEvents=res;
      console.log(this.allEvents);
    })
  }
  onTimeSelected(ev : any){
    const selected = new Date (ev.selectedTime);
    this.newEvent.Date = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    console.log(ev);
  }
  async onEventSelected(event: any){
    const selected = new Date(event.selectedEvent);
    this.newEvent.clientname,
    new Date(this.newEvent.Date),
    this.newEvent.service,
    this.newEvent.time,
   // this.staffnamelist.staffname
    console.log(event);
  }

  event(){
    this.today=[];
    for(let i of this.allEvents){
      if(i.Date === this.Date){
        this.today.push(i);
      }
    }
    console.log(this.today);
  }
  async Durationtime() {
    let options: PickerOptions = {
      buttons: [
        {
          text: "Cancel",
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: (value: any) => {
            this.value0 = value['col -0'].text + '-' + value['col -1'].text;
            console.log('value', this.value0);
          }
        }
      ],
      columns: this.getcolumns()
    };
    let picker = await this.pickerCtrl.create(options);
    picker.present()

  }

  getcolumns() {
    let columns = []
    for (let i = 0; i < this.numColumns; i++) {
      columns.push({
        name: `col -${i}`,
        options: this.getColumnOptions(i)
      })
    }
    return columns;
  }
  getColumnOptions(columIndex: number) {
    let options = []
    for (let i = 0; i < this.numOptions; i++) {
      options.push({
        text: this.timeget[columIndex][i % this.numOptions],
        value: i
      })
    }
    return options;
  }
  
 /* open(){
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time=>{
      this.newEvent.time=time;
      console.log(time);
    });
    
   }
  // client(){
  //   this.router.navigate(['/client'])
  // }

  // staffNamedetails(){
  //  this.staffnamelist.staffname = this.api.staffname
  //   const staffnameinfo={
  //     id : '+91909205728',
  //     staffName : this.staffnamelist.staffname
  //   }
  //   this.firestore.getdata('users',staffnameinfo.id,'staff',staffnameinfo).subscribe(res =>{
  //    this.staffdata =res
  //    console.log('staffname',this.staffdata)
  //    for(let i of this.staffdata){
  //      this.staffnamedata.push(i)
  //    }
  //   })
  // }
*/
}

