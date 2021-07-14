import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FirestoreService } from 'src/app/services/firestore.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { UserproviderService } from 'src/app/services/userprovider.service';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-opening',
  templateUrl: './opening.page.html',
  styleUrls: ['./opening.page.scss'],
})
export class OpeningPage implements OnInit {

  public succes = "#228B22";

  public myTimeFormMon: FormGroup
  private OpenTimeMon: number = 1;

  public myTimeForm: FormGroup;
  private OpenTime: number = 1;

  public myTimeFormwed: FormGroup;
  private OpenTimewed: number = 1;

  public myTimeFormthurs: FormGroup
  private OpenTimethurs: number = 1;

  public myTimeFormfri: FormGroup
  private OpenTimefri: number = 1;

  public myTimeFormsat: FormGroup
  private OpenTimesat: number = 1;

  public myTimeFormsun: FormGroup
  private OpenTimesun: number = 1;

  value0 = '9:00-18:00';
  value1 = '9:00-18:00';
  value2 = '9:00-18:00';
  value3 = '9:00-18:00';
  value4 = '9:00-18:00';
  value5 = '9:00-18:00';
  value6 = '9:00-18:00';

  value7 = 'closed';
  value8 = 'closed';
  value9 = 'closed';
  value10 = 'closed';
  value11 = 'closed';
  value12 = 'closed';
  value13 = 'closed';

  value14 = 'closed';
  value15 = 'closed';
  value16 = 'closed';
  value17 = 'closed';
  value18 = 'closed';
  value19 = 'closed';
  value20 = 'closed';

  checked = false;
  checked1 = false;
  checked2 = false;
  checked3 = false;
  checked4 = false;
  checked5 = false;
  checked6 = false;

  time= true;
  timemon= true;
  time1= true;
  timeTus= true;
  time2= true;
  timeWed= true;
  time3= true;
  timeThus= true;
  time4= true;
  timeFri= true;
  time5= true;
  timeSat= true;
  time6= true;
  timeSun= true;

  public openingTime: any;

  timeget: any[] = [
    [
      '0:00', '0:05', '0:10', '0:15', '0:20', '0:25', '0:30', '0:35', '0:40', '0:45', '0:50', '0:55',
      '1:00', '1:05', '1:10', '1:15', '1:20', '1:25', '1:30', '1:35', '1:40', '1:45', '1:50', '1:55',
      '2:00', '2:05', '2:10', '2:15', '2:20', '2:25', '2:30', '2:35', '2:40', '2:45', '2:50', '2:55',
      '3:00', '3:05', '3:10', '3:15', '3:20', '3:35', '3:30', '3:35', '3:40', '3:45', '3:50', '3:55',
      '4:00', '4:05', '4:10', '4:15', '4:20', '4:25', '4:30', '4:35', '4:40', '4:45', '4:50', '4:55',
      '5:00', '5:05', '5:10', '5:15', '5:20', '5:25', '5:30', '5:35', '5:40', '5:45', '5:50', '5:55',
      '6:00', '6:05', '6:10', '6:15', '6:20', '6:25', '6:30', '6:35', '6:40', '6:45', '6:50', '6:55',
      '7:00', '7:05', '7:10', '7:15', '7:20', '7:25', '7:30', '7:35', '7:40', '7:45', '7:50', '7:55',
      '8:00', '8:05', '8:10', '8:15', '8:20', '8:25', '8:30', '8:35', '8:40', '8:45', '8:50', '8:55',
      '9:00', '9:05', '9:10', '9:15', '9:20', '9:25', '9:30', '9:35', '9:40', '9:45', '9:50', '9:55',
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
  ]//thurs
  
  numColumns: number = 2;
  numOptions: number = 156;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private userProvider: UserproviderService,
    private firestore: FirestoreService,
    private pickerCtrl: PickerController,
    private api: ApiService) {

  }

  async ngOnInit() {
    const load = await this.userProvider.createLoader('Loading...');
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

      this.value7 = this.openingTime.OpeningHours.Monday_shift1;
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
    let picker = await this.pickerCtrl.create(options);
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

  async Mondaytime1(day: string) {
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
            if(day === 'monEve'){
             this.value7 = value2['col -0'].text + '-' + value2['col -1'].text;
             this.openingTime.OpeningHours.Monday_shift1 = this.value7;
            }if(day === 'monNight'){
              this.value8 = value2['col -0'].text + '-' + value2['col -1'].text;
              this.openingTime.OpeningHours.Monday_shift2 = this.value8;
            }if(day === 'tusEve'){
              this.value9 = value2['col -0'].text + '-' + value2['col -1'].text;
              this.openingTime.OpeningHours.Tusday_shift1 = this.value9;
            }if(day === 'tusNight'){
              this.value10 = value2['col -0'].text + '-' + value2['col -1'].text;
              this.openingTime.OpeningHours.Tusday_shift2 = this.value10;
            }if(day === 'wedEve'){
              this.value11 = value2['col -0'].text + '-' + value2['col -1'].text;
              this.openingTime.OpeningHours.Wed_shift1 = this.value11;
            }if(day === 'wedNight'){
              this.value12 = value2['col -0'].text + '-' + value2['col -1'].text;
              this.openingTime.OpeningHours.Wed_shift2 = this.value12;
            }if(day === 'thurEve'){
              this.value13 = value2['col -0'].text + '-' + value2['col -1'].text;
              this.openingTime.OpeningHours.Thurs_shift1 = this.value13;
            }
            if(day === 'thurNight'){
              this.value14 = value2['col -0'].text + '-' + value2['col -1'].text;
              this.openingTime.OpeningHours.Thurs_shift2 = this.value14;
             }if(day === 'friEve'){
               this.value15 = value2['col -0'].text + '-' + value2['col -1'].text;
              this.openingTime.OpeningHours.fri_shift1 = this.value15;
             }if(day === 'friNight'){
               this.value16 = value2['col -0'].text + '-' + value2['col -1'].text;
              this.openingTime.OpeningHours.fri_shift2 = this.value16;
             }if(day === 'satEve'){
               this.value17 = value2['col -0'].text + '-' + value2['col -1'].text;
              this.openingTime.OpeningHours.satu_shift1 = this.value17;
             }if(day === 'satNight'){
               this.value18 = value2['col -0'].text + '-' + value2['col -1'].text;
              this.openingTime.OpeningHours.satu_shift2 = this.value18;
             }if(day === 'sunEve'){
               this.value19 = value2['col -0'].text + '-' + value2['col -1'].text;
              this.openingTime.OpeningHours.sun_shift1 = this.value19;
             }if(day === 'sunNight'){
               this.value20 = value2['col -0'].text + '-' + value2['col -1'].text;
              this.openingTime.OpeningHours.sun_shift2 = this.value20;
             }
          }
        }
      ],
      columns: this.getcolumnsmon()
    };
    let picker = await this.pickerCtrl.create(options);
    picker.present()
  }

  getcolumnsmond() {
    let columns = []
    for (let i = 0; i < this.numColumns; i++) {
      columns.push({
        name: `col -${i}`,
        options: this.getColumnOptionsmond(i)
      })
    }
    return columns;
  }
  getColumnOptionsmond(columIndex: number) {
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
   const load = await this.userProvider.createLoader('Updating...');
   load.present();
   this.api.updateUser(this.userProvider.loggedUser.id, { OpeningHours: this.openingTime.OpeningHours }).subscribe(async res => {
       await load.dismiss();
       this.userProvider.goToNew('/settings');
   });
  }

  back() {
    this.router.navigate(['/home'])
  }

  TimeHideForm(day:string) {
    this.time = !this.time;

    if(day === 'monEvn') {
      this.openingTime.OpeningHours.Monday_shift1=!this.time === false ? 'closed' :   this.value7;
   }
  }

  TimeHideForm1(){
    this.timemon = false;

  }
  TimeHideForm1mon(day:string){
    this.timemon = true;
    if(day === 'monNight') {
      this.openingTime.OpeningHours.Monday_shift2=!this.timemon === false ? 'closed' :   this.value8;
   }
  }

  TimeHideForm2(day:string){
    this.time1 = !this.time1;
    if(day === 'tusEvn') {
      this.openingTime.OpeningHours.Tusday_shift1=!this.time1 === false ? 'closed' :   this.value9;
   }
  }
  TimeHideForm3(){
    this.timeTus= false;
  }
  TimeHideForm3tus(day:string){
    this.timeTus= true;
    if(day === 'tusNight') {
      this.openingTime.OpeningHours.Tusday_shift2=!this.timeTus === false ? 'closed' :   this.value10;
   }
  }

  TimeHideForm4(day:string){
    this.time2= !this.time2;
    if(day === 'wedEvn') {
      this.openingTime.OpeningHours.Wed_shift1=!this.time2 === false ? 'closed' :   this.value11;
   }
  }
  TimeHideForm5(){
    this.timeWed= false;
  }
  TimeHideForm5wed(day:string){
    this.timeWed= true;
    if(day === 'wedNight') {
      this.openingTime.OpeningHours.Wed_shift2=!this.timeWed === false ? 'closed' :   this.value12;
   }
  }

  TimeHideForm6(day:string){
    this.time3= !this.time3;
    if(day === 'thursEvn') {
      this.openingTime.OpeningHours.Thurs_shift1=!this.time3 === false ? 'closed' :   this.value13;
   }
  }
  TimeHideForm7(){
    this.timeThus = false;
  }
  TimeHideForm7thurs(day:string){
    this.timeThus = true;
    if(day === 'thursngt') {
      this.openingTime.OpeningHours.Thurs_shift2=!this.timeThus === false ? 'closed' :   this.value14;
   }
  }

  TimeHideForm8(day:string){
    this.time4 =!this.time4
    if(day === 'friEvn') {
      this.openingTime.OpeningHours.fri_shift1=!this.time4 === false ? 'closed' :   this.value15;
   }
  }
  TimeHideForm9(){
    this.timeFri =false;
  }
  TimeHideForm9fri(day:string){
    this.timeFri =true
    if(day === 'friNight') {
      this.openingTime.OpeningHours.fri_shift2=!this.timeFri === false ? 'closed' :   this.value16;
   }
  }

  TimeHideForm10(day:string){
    this.time5 =!this.time5
    if(day === 'satEvn') {
      this.openingTime.OpeningHours.satu_shift1=!this.time5 === false ? 'closed' :   this.value17;
   }
  }
  TimeHideForm11(){
    this.timeSat =false;
    
  }
  TimeHideForm11sat(day:string){
    this.timeSat =true
    if(day === 'satNight') {
      this.openingTime.OpeningHours.satu_shift2=!this.timeSat === false ? 'closed' :   this.value18;
   }
  }

  TimeHideForm12(day:string){
    this.time6 =!this.time6
    if(day === 'sunEvn') {
      this.openingTime.OpeningHours.sun_shift1=!this.time6 === false ? 'closed' :   this.value19;
   }
  }
  TimeHideForm13(){
    this.timeSun =false;
  }
  TimeHideForm13sun(day:string){
    this.timeSun =true;
    if(day === 'sunNight') {
      this.openingTime.OpeningHours.sun_shift2=!this.timeSun === false ? 'closed' :   this.value19;
   }
  }
}
