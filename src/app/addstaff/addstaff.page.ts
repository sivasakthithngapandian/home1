import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import {CalendarComponent, CalendarResult} from 'ion2-calendar';
import { ApiService } from 'src/app/services/api.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PickerOptions } from '@ionic/core'
import { IonSlides,PickerController, ActionSheetController} from '@ionic/angular'
import { UserproviderService } from 'src/app/services/userprovider.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-addstaff',
  templateUrl: './addstaff.page.html',
  styleUrls: ['./addstaff.page.scss'],
})
export class AddstaffPage implements OnInit {

  public succes = "#228B22";
  @ViewChild(CalendarComponent,{static : false}) myCalendar:CalendarComponent;
  minDate=new Date().toISOString();
  staffid:any;
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
        '10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50', '10:55',
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
  
    //value0 = 'Working Time';
    value0 = '09:00-18:00';
    value1 = '09:00-18:00';
    value2 = '09:00-18:00';
    value3 = '09:00-18:00';
    value4 = '09:00-18:00';
    value5 = '09:00-18:00';
    value6 = '09:00-18:00';
  
    numColumns: number = 2;
    numOptions: number = 144;
  
  
    public members = {
      staffname: '',
      worktime: '',
      phone: '',
      service: '',
    }
  
    public staff = {
      staffname: '',
      worktime: '',
      phone: '',
      service: '',
      ServiceName: '',
      service1: '',
  
    }
  
    staffdatamb: any;
    staffmembermb = []; //staffmembers
  
    public servicedatas:any=[];
    public servicelist: any =[];
    public staffmber = [];
  
    public service1data: any =[];
    public service1list: any = [];
    servicevalues = [];
  
    public staffs:any=[];
    public staffdata: any =[];
    public staffmember = [];
  
    staffmb = false;
    calendar = false;
  
    public slideOpts = {
      pagination: true,
      allowTouchMove: false,
    }
    fullscreenControl = false;
    
    
    checked = false;
    checked1 = false;
    checked2 = false;
    checked3 = false;
    checked4 = false;
    checked5 = false;
    checked6 = false;
  
    public openingTime: any;
  
    @ViewChild('#slides') slides: IonSlides
    //@ViewChild('content') content: IonContent

  constructor(private ngAuth: AngularFireAuth,
    private router: Router,
    private actionSheetCtrl :ActionSheetController,
    private firestore: FirestoreService,
    private pickercontrl: PickerController,
    private userProvideserv : UserproviderService,
    private menuCtrl: MenuController,
    //public translate: TranslateService,
    //private i18nService: I18nServiceService,
    private api: ApiService) { }

//ngOnInit() {
    // this.servicedetails()
    // this.service1details()
    // this.getStaffData()
    async ngOnInit() {
      const load = await this.userProvideserv.createLoader('Loading...');
      await load.present();
      this.api.getUser().subscribe(async data => {
        this.openingTime = data;
        console.log("loggeed openinngTime", this.openingTime);
        this.value0 = this.openingTime.OpeningHours.Monday;
        this.value1 = this.openingTime.OpeningHours.Tusday;
        this.value2 = this.openingTime.OpeningHours.Wednesday;
        this.value3 = this.openingTime.OpeningHours.Thursday;
        this.value4 = this.openingTime.OpeningHours.Friday;
        this.value5 = this.openingTime.OpeningHours.saturday;
        this.value6 = this.openingTime.OpeningHours.Sunday;
        await load.dismiss();
      });
    }
  
    onChangeEvent(event:any, day:string){
        if(day === 'mon') {
           this.openingTime.OpeningHours.Monday = event.detail.checked === false ? 'closed' :   this.value0;
        }
        if(day === 'tue') {
          this.openingTime.OpeningHours.Tusday = event.detail.checked === false ? 'closed' :   this.value1;
        }if(day === 'wed') {
          this.openingTime.OpeningHours.Wednesday = event.detail.checked === false ? 'closed' :   this.value2;
        }if(day === 'thu') {
          this.openingTime.OpeningHours.Thursday = event.detail.checked === false ? 'closed' :   this.value3;
        }if(day === 'fri') {
          this.openingTime.OpeningHours.Friday = event.detail.checked === false ? 'closed' :   this.value4;
        }if(day === 'sat') {
          this.openingTime.OpeningHours.saturday = event.detail.checked === false ? 'closed' :   this.value5;
        }if(day === 'sun') {
          this.openingTime.OpeningHours.Sunday = event.detail.checked === false ? 'closed' :   this.value6; 
        }
    }
  
  
    async Mondaytime(day: string) {
      let options: PickerOptions = {
        buttons: [
          {
            text: "Cancel",
            role: 'cancel',
          },
          {
            text: 'Ok',
            handler: (value2: any) => {
              console.log(value2);
              if(day === 'mon'){
               this.value0 = value2['col -0'].text + '-' + value2['col -1'].text;
               this.openingTime.OpeningHours.Monday = this.value0;
              }if(day === 'tue'){
                this.value1 = value2['col -0'].text + '-' + value2['col -1'].text;
                this.openingTime.OpeningHours.Tusday = this.value1;
              }if(day === 'wed'){
                this.value2 = value2['col -0'].text + '-' + value2['col -1'].text;
                this.openingTime.OpeningHours.Wednesday = this.value2;
              }if(day === 'thu'){
                this.value3 = value2['col -0'].text + '-' + value2['col -1'].text;
                this.openingTime.OpeningHours.Thursday = this.value3;
              }if(day === 'fri'){
                this.value4 = value2['col -0'].text + '-' + value2['col -1'].text;
                this.openingTime.OpeningHours.Friday = this.value4;
              }if(day === 'sat'){
                this.value5 = value2['col -0'].text + '-' + value2['col -1'].text;
                this.openingTime.OpeningHours.saturday = this.value5;
              }if(day === 'sun'){
                this.value6 = value2['col -0'].text + '-' + value2['col -1'].text;
                this.openingTime.OpeningHours.Sunday = this.value6;
              }
            }
          }
        ],
        columns: this.getcolumnsmon()
      };
      let picker = await this.pickercontrl.create(options);
      picker.present()
    }
  
    getcolumnsmon() {
      let columns = []
      for (let i = 0; i < this.numColumns; i++) {
        columns.push({
          name: `col -${i}`,
          options: this.getColumnOptionsmon(i)
        })
      }
      return columns;
    }
    getColumnOptionsmon(columIndex: number) {
      let options = []
      for (let i = 0; i < this.numOptions; i++) {
        options.push({
          text: this.timeget[columIndex][i % this.numOptions],
          value2: i
        })
      }
      return options;
    }
  
    async save(){
     const load = await this.userProvideserv.createLoader('Updating...');
     load.present();
     this.api.updateUser(this.userProvideserv.loggedUser.id, { OpeningHours: this.openingTime.OpeningHours }).subscribe(async res => {
         await load.dismiss();
         //slides.slideNext();
     });
    
  
    
    this.api.staffmember=[];
    this.api.staffdata=[];
    this.api.getaddstaff(this.userProvideserv.loggedUser.id).subscribe(use=>{
      console.log('staff details',use);
       this.api.staffdata=use;
       console.log('staffdetailssss', this.api.staffdata)
       for(let i of this.api.staffdata){
         this.api.staffs.push(i)
       }
    });
   //service registration
   this.api.getservice(this.userProvideserv.loggedUser.id).subscribe(data=>{
    this.api.service1data=data;
    console.log('service register',this.api.service1data)
      for(let i of this.api.service1data)
      this.api.service1list.push(i)
   });
  //service in manua
   this.api.getaddservice(this.userProvideserv.loggedUser.id).subscribe(res=>{
     console.log('service add manual',res);
     this.api.servicedatas=res;
     for(let i of this.api.servicedatas)
     {
       this.api.servicelist.push(i);
     }
   });
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Choose',
      cssClass: 'my-action',
      buttons: [
        {
          text: 'Camera',
          role: 'destructive',
          icon: 'camera',
          cssClass: 'camera-action',
          handler: () => {
            this.Accesscamera()
          }

        }, {
          text: 'Gallery',
          icon: 'image',
          cssClass: 'gallery-action',
          handler: () => {
            this.AccessGallery();
          }
        }, {
          text: 'Cancel',
          role: 'close',
          icon: 'close',
          cssClass: 'close-action',
          handler: () => {
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
this.staffid = await this.userProvideserv.openCameraStaff();

 }
 async AccessGallery() {
   this.staffid = await this.userProvideserv.openAlbumStaff();

 }
  back() {
    this.router.navigate(['/home'])
  }

  // async delete(){
  //     const actionsh = await this.actionsheet.create({
  //       header: 'Albums',
  //     cssClass: 'my-custom-class',
  //     buttons: [{
  //       text: 'Delete',
  //       role: 'destructive',
  //       icon: 'trash',
  //       handler: () => {
  //         console.log('Delete clicked');
  //       } 
  //     },
  //     { text: 'Cancel', role: 'cancel' }]
  //     })
  //     await actionsh.present();
  //     const {role}= await actionsh.onDidDismiss();
  //     console.log('action sheet dismis', role);
  // }
  getStaffDetails() {

    const staffInfo = {
      id: this.userProvideserv.loggedUser.id,
      staffid:this.staffid,
      staff_img:this.api.staff_img,
      staffName: this.staff.staffname,
      worktime: this.value0,
      phone: this.staff.phone,
      service: this.staff.service
      //serviceothers: this.service.ServiceName
 
    }
    console.log('result', staffInfo)
    this.api.updateStaff(staffInfo.id, staffInfo).subscribe((response) => {
      console.log('response', response)
    });
      this.staffmb=false;
      this.api.getaddstaff(this.userProvideserv.loggedUser.id).subscribe(use=>{
        console.log('staff details',use);
         this.api.staffdata=use;
         //console.log('staffdetailssss', this.api.staffdata)
         for(let i of this.api.staffdata){
           this.api.staffs.push(i)
         }
      });
  };



  //hideform
  staffHideForm() {
    this.staffmb = !this.staffmb;
    
  }
  calendarHideForm(){
    this.calendar = !this.calendar;
  }
  

  //workTime for staffs
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
    let picker = await this.pickercontrl.create(options);
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
  public next(slides) {
    console.log(slides);
    slides.slideNext();
  }

  public prev(slides) {
    console.log(slides);
    slides.slidePrev();
  }

}
