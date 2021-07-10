import { Component, OnInit, NgZone, ViewChild } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FirestoreService } from '../services/firestore.service'
import { IonSlides, ActionSheetController, MenuController, PickerController } from '@ionic/angular'
import { PickerOptions } from '@ionic/core'
import { IonContent } from '@ionic/angular'
import { AgmMap, MarkerManager, MapsAPILoader } from '@agm/core'
import firebase from 'firebase/app'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { GoogleMapsAPIWrapper } from '@agm/core'
import { environment } from 'src/environments/environment';
import { UserproviderService } from '../services/userprovider.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  public mobile = {
    mobilenumber: '',
  }

  public slideOpts = {
    pagination: false,
    allowTouchMove: false,
  }


  autoCompleteItems = [];
  searchTerm = '';
  place = '';
  zoom = 16;
  disableDefaultUI = true;
  zoomControl = false;
  fullscreenControl = false;
  markerDraggable = false;
  styles = environment.MAP_STYLE;

  @ViewChild('#slides') slides: IonSlides
  @ViewChild(AgmMap) map: AgmMap
  @ViewChild('content') content: IonContent

  //agm-map
  public location = {
    latitude: '',
    longitude: '',
    viewport: '',
    address: '',
    city: '',
    zipcode: '',
    marker: MarkerManager

  }//agm-map

  public user = {

    phone2: '',
    dialcode: '+91',
    businessname: '',
    name: '',
    Email: '',
    phone: '',
    phone3:'',
    phone4:'',
    address: '',
  }
  mobileno: any;
  google: any;//agm-map
  geocoder: any;//agm-map
  //control? : any;
  public category: any = [];
 // OpeningTime: any=[];

  value0 = 'closed';
  value1 = 'closed';
  value2 = 'closed';
  value3 = 'closed';
  value4 = 'closed';
  value5 = 'closed';
  value6 = 'closed';

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
  checked = false
  checked1 = false
  checked2 = false
  checked3 = false
  checked4 = false
  checked5 = false
  checked6 = false

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

  latitude: any;
  longitude: any;
  draggable: boolean;
  address: string;

  mobiledata: any;
  mobilenum = [];
  mobilenu : any;
  constructor(private router: Router,
    private ngfire: AngularFireAuth,
    private api: ApiService,
    private firestore: FirestoreService,
    private formBuilder: FormBuilder,
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController,
    private pickercontrl: PickerController,

    //agm-map
    private mapsapiloader: MapsAPILoader,
    private wrapper: GoogleMapsAPIWrapper,
    private zoon: NgZone,
    private menuCtrl: MenuController,
    private userProvide: UserproviderService

  ) {
    

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
  ]//thurs


  numColumns: number = 2;
  numOptions: number = 156;



  onSelecteCheckBox(e) {
    console.log('checkbox event', e)
    this.checked = e.detail.checked
    if(e.detail.checked===true){
       this.value2='9:00-18:00'
    }else{
      this.value2 ="closed"
    }
  }

  onSelectTusday(ev) {
    console.log('checkbox', ev)
    this.checked1 = ev.detail.checked
    if(ev.detail.checked===true){
      this.value3="9:00-18:00"
    }else {
      this.value3="closed"
    }
  };
  onSelecteCheckBoxwed(e) {
    console.log('checkbox event', e)
    this.checked2 = e.detail.checked
    if(e.detail.checked===true){
      this.value1="9:00-18:00"
    }else {
      this.value1="closed"
    }

  }
  onSelecteCheckBoxthurs(e) {
    console.log('checkbox event', e)
    this.checked3 = e.detail.checked
    if(e.detail.checked===true){
      this.value0="9:00-18:00"
    }else {
      this.value0="closed"
    }

  }
  onSelecteCheckBoxfri(e) {
    console.log('checkbox event', e)
    this.checked4 = e.detail.checked
    if(e.detail.checked===true){
      this.value4="9:00-18:00"
    }else {
      this.value4="closed"
    }
  }
  onSelecteCheckBoxsat(e) {
    console.log('checkbox event', e)
    this.checked5 = e.detail.checked
    if(e.detail.checked===true){
      this.value5="9:00-18:00"
    }else{
      this.value5="closed"
    }
  }
  onSelecteCheckBoxsun(e) {
    console.log('checkbox event', e)
    this.checked6 = e.detail.checked
    if(e.detail.checked===true){
      this.value6="9:00-18:00"
    }else{
      this.value6="closed"
    }
  }

  async ngOnInit() {
    this.menuCtrl.enable(false);
    this.menuCtrl.swipeGesture(false);
    this.api.address = '';
    this.api.city = '';
    this.api.zipcode = '';
    this.userProvide.getJSON().then((result) => {
      this.category = result;
    });
    this.mobilenu = this.userProvide.loggedUser;
    

    //this.content.scrollToBottom(300)
    await navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      // this.findAddressbyCoordinates()
    })//agm-map
    //this.location.marker.draggable=true
    //this.phonedatails();
    this.searchPlace();
  }

  public next(slides) {
    console.log(slides);
    slides.slideNext();
  }

  public prev(slides) {
    console.log(slides);
    slides.slidePrev();
  }

  async nxtEmail(slides) {
    const check = await this.userProvide.validateEmail(this.user.Email);
    if (check) {
      slides.slideNext();
    } else {
      const toast = await this.userProvide.createToast('Please enter valid email', false, 'top' ,500,'toast-custom-class');
      await toast.present();
    }
  }


  register() {
    const client = {
      id:this.userProvide.loggedUser.id,
      name: this.user.name,
      bussinessname: this.user.businessname,
      Email: this.user.Email,
      latitude: this.api.latitude,
      longitude: this.api.longitude, 
      address: this.api.address + this.api.city+ this.api.zipcode,
      //phone: this.user.phone,
      // whatsappnumber: this.user.whatsappnumber,
    }

    this.api.updateprofile(this.userProvide.loggedUser.id,client).subscribe(async res=>{
      console.log('hours', res);
      this.userProvide.setLoggedInUser(client);
     this.userProvide.goToNew('/home');
    });
  }

 async savehours(slides){
    const OpeningTime={
      Monday: this.value2,
      Monday_shift1:this.value7,
      Monday_shift2:this.value8,
      Tusday: this.value3,
      Tusday_shift1:this.value9,
      Tusday_shift2:this.value10,
      Wednesday: this.value1,
      Wed_shift1: this.value11,
      Wed_shift2: this.value12,
      Thursday: this.value0,
      Thurs_shift1:this.value13,
      Thurs_shift2:this.value14,
      Friday: this.value4,
      fri_shift1:this.value15,
      fri_shift2:this.value16,
      saturday: this.value5,
      satu_shift1: this.value17,
      satu_shift2: this.value18,
      Sunday: this.value6,
      sun_shift1: this.value19,
      sun_shift2: this.value20,
    }
    console.log('opening Time', OpeningTime);
    this.api.updateprofile(this.userProvide.loggedUser.id, { OpeningHours : OpeningTime}).subscribe(async res=>{
      console.log('hours', res);
    })
    slides.slideNext();
    const toast = await this.userProvide.createToast('Time Saved',false, 'top', 500,'toast-custom1-class' )
    toast.present();
  }

   async phoneStorage(slides){
    const numberstore={
      phone:this.user.phone,
      phone2:this.user.phone2,
    }
    console.log('numbers update',numberstore)
    this.api.updateprofile(this.userProvide.loggedUser.id, { PhoneNumbers : numberstore}).subscribe(async res=>{
      console.log('hours', res);
    })
    slides.slideNext();
  }
  async searchPlace() {
    if (this.searchTerm) {
      //const place = ev.target.value;
      //console.log(place);
      this.place = '';
      const predictions = await this.api.getGooglePlaceAutoCompleteList(this.searchTerm, {}, 'IN');
      this.autoCompleteItems = [];
      //console.log(predictions);
      this.zoon.run(() => {
        if (predictions !== null) {
          predictions.forEach((prediction) => {
            this.autoCompleteItems.push(prediction.description);
            //console.log(this.autoCompleteItems);
          });
        }
      });
    }
  }

  async itemSelected(item, slides) {
    this.api.getLatLan(item).subscribe(result => {
      this.zoon.run(async () => {
        this.api.latitude = result.lat();
        this.api.longitude = result.lng();
        console.log(this.api.latitude, this.api.longitude);
        this.searchTerm = '';
        this.autoCompleteItems = [];
        const address = await this.api.getGeoCodedAddress(this.api.latitude, this.api.longitude);
        //this.api.street = `${address.block}, ${address.street}`
        this.api.address = `${address.frmtAddr}`;
        this.api.city = `${address.region}`;
        this.api.zipcode = `${address.zipCode}`;
        slides.slideNext();
      });
    });
  }

  async editedAddress(slides) {
    if (this.api.city.length !== 0 || this.api.zipcode.length !== 0 || this.api.address.length !== 0) {
      this.api.getLatLan(this.api.address).subscribe(result => {
        this.api.latitude = result.lat() + (0.0000000000100 * Math.random());
        this.api.longitude = result.lng() + (0.0000000000100 * Math.random());
        slides.slideNext();
      });
    } else {
      const toast = await this.userProvide.createToast('Please fill the address (or) city (or) zipcode', false, 'top',500,'toast-custom3-class');
      await toast.present();
    }
  }

  reset() {
    this.searchTerm = '';
  }

  close() {
    this.place = '';
  }

  nxtCategory(slides) {
    slides.slideNext();
  }

  checkBoxEvnt(ev: any) {
    if (ev.detail.checked === true) {
      this.api.category.push(ev.detail.value);
    } else if (ev.detail.checked === false) {
      this.api.category.forEach((data, index) => {
        if (data === ev.detail.value) { this.api.category.splice(index, 1); }
      });
    }
    console.log(this.api.category);
  }

  nxtService(slides) {
    this.category.filter(data => {
      this.api.category.forEach(categ => {
        if (data.category === categ) {
          this.api.services.push(data);
        }
      });
    });
    console.log(this.api.services);
    this.category = [];
    this.userProvide.getJSON().then((result) => {
      this.category = result;
      //console.log(result);
    });
    slides.slideNext();
  }

  savePrevService(slides) {
    this.api.services = [];
    this.api.category = [];
    slides.slidePrev();
  }

  saveService(slides) {
    this.api.createService(this.userProvide.loggedUser.id, { services: this.api.services }).subscribe(async res => {
      const toast = await this.userProvide.createToast('Service Updated', false, 'top',500,'toast-custom1-class');
      toast.present();
      console.log('Services Updated', this.api.services);
      slides.slideNext();
    });
  }


  //hideform
  TimeHideForm() {
    this.time = !this.time;
  }

  TimeHideForm1(){
    this.timemon = false;
  }
  TimeHideForm1mon(){
    this.timemon = true;
  }

  TimeHideForm2(){
    this.time1 = !this.time1;
  }
  TimeHideForm3(){
    this.timeTus= false;
  }
  TimeHideForm3tus(){
    this.timeTus= true;
  }

  TimeHideForm4(){
    this.time2= !this.time2;
  }
  TimeHideForm5(){
    this.timeWed= false;
  }
  TimeHideForm5wed(){
    this.timeWed= true;
  }

  TimeHideForm6(){
    this.time3= !this.time3;
  }
  TimeHideForm7(){
    this.timeThus = false;
  }
  TimeHideForm7thurs(){
    this.timeThus = true;
  }

  TimeHideForm8(){
    this.time4 =!this.time4
  }
  TimeHideForm9(){
    this.timeFri =false;
  }
  TimeHideForm9fri(){
    this.timeFri =true
  }

  TimeHideForm10(){
    this.time5 =!this.time5
  }
  TimeHideForm11(){
    this.timeSat =false;
  }
  TimeHideForm11sat(){
    this.timeSat =true
  }
  TimeHideForm12(){
    this.time6 =!this.time6
  }
  TimeHideForm13(){
    this.timeSun =false;
  }
  TimeHideForm13sun(){
    this.timeSun =true;
  }
  
  addPhoto() {
    this.presentActionSheet()
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
    await this.userProvide.openCamera();
 }
 async AccessGallery() {
   await this.userProvide.openAlbum();
 }
  
  getGeolocation() {
    this.router.navigate(['/geomap']);
  }

  
  //wednesday
  async wednesdaytime() {
    let options: PickerOptions = {
      buttons: [
        {
          text: "Cancel",
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: (value1: any) => {
            console.log(value1);
            this.value1 = value1['col -0'].text + '-' + value1['col -1'].text;
          }
        }
      ],
      columns: this.getcolumnswed()
    };
    let picker = await this.pickercontrl.create(options);
    picker.present()

  }
  getcolumnswed() {
    let columns = []
    for (let i = 0; i < this.numColumns; i++) {
      columns.push({
        name: `col -${i}`,
        options: this.getColumnOptionswed(i)
      })
    }
    return columns;
  }
  getColumnOptionswed(columIndex: number) {
    let options = []
    for (let i = 0; i < this.numOptions; i++) {
      options.push({
        text: this.timeget[columIndex][i % this.numOptions],
        value1: i
      })
    }
    return options;
  }


  //thursday
  async thursdaytime() {
    let options: PickerOptions = {
      buttons: [
        {
          text: "Cancel",
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: (value0: any) => {
            console.log(value0);
            this.value0 = value0['col -0'].text + '-' + value0['col -1'].text;
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

  //monday
  async Mondaytime() {
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
            this.value2 = value2['col -0'].text + '-' + value2['col -1'].text;
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

  //tusday
  async Tusdaytime() {
    let options: PickerOptions = {
      buttons: [
        {
          text: "Cancel",
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: (value3: any) => {
            console.log(value3);
            this.value3 = value3['col -0'].text + '-' + value3['col -1'].text;
          }
        }
      ],
      columns: this.getcolumnstus()
    };
    let picker = await this.pickercontrl.create(options);
    picker.present()
  }

  getcolumnstus() {
    let columns = []
    for (let i = 0; i < this.numColumns; i++) {
      columns.push({
        name: `col -${i}`,
        options: this.getColumnOptionstus(i)
      })
    }
    return columns;
  }
  getColumnOptionstus(columIndex: number) {
    let options = []
    for (let i = 0; i < this.numOptions; i++) {
      options.push({
        text: this.timeget[columIndex][i % this.numOptions],
        value3: i
      })
    }
    return options;
  }

  //friday
  async Fridaytime() {
    let options: PickerOptions = {
      buttons: [
        {
          text: "Cancel",
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: (value4: any) => {
            console.log(value4);
            this.value4 = value4['col -0'].text + '-' + value4['col -1'].text;
          }
        }
      ],
      columns: this.getcolumnsfri()
    };
    let picker = await this.pickercontrl.create(options);
    picker.present()
  }

  getcolumnsfri() {
    let columns = []
    for (let i = 0; i < this.numColumns; i++) {
      columns.push({
        name: `col -${i}`,
        options: this.getColumnOptionsfri(i)
      })
    }
    return columns;
  }
  getColumnOptionsfri(columIndex: number) {
    let options = []
    for (let i = 0; i < this.numOptions; i++) {
      options.push({
        text: this.timeget[columIndex][i % this.numOptions],
        value4: i
      })
    }
    return options;
  }

  //saturday
  async saturdaytime() {
    let options: PickerOptions = {
      buttons: [
        {
          text: "Cancel",
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: (value5: any) => {
            console.log(value5);
            this.value5 = value5['col -0'].text + '-' + value5['col -1'].text;
          }
        }
      ],
      columns: this.getcolumnsSat()
    };
    let picker = await this.pickercontrl.create(options);
    picker.present()
  }

  getcolumnsSat() {
    let columns = []
    for (let i = 0; i < this.numColumns; i++) {
      columns.push({
        name: `col -${i}`,
        options: this.getColumnOptionsSat(i)
      })
    }
    return columns;
  }
  getColumnOptionsSat(columIndex: number) {
    let options = []
    for (let i = 0; i < this.numOptions; i++) {
      options.push({
        text: this.timeget[columIndex][i % this.numOptions],
        value5: i
      })
    }
    return options;
  }

  async sundaytime() {
    let options: PickerOptions = {
      buttons: [
        {
          text: "Cancel",
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: (value6: any) => {
            console.log(value6);
            this.value6 = value6['col -0'].text + '-' + value6['col -1'].text;
          }
        }
      ],
      columns: this.getcolumnsSun()
    };
    let picker = await this.pickercontrl.create(options);
    picker.present()
  }

  getcolumnsSun() {
    let columns = []
    for (let i = 0; i < this.numColumns; i++) {
      columns.push({
        name: `col -${i}`,
        options: this.getColumnOptionsSun(i)
      })
    }
    return columns;
  }
  getColumnOptionsSun(columIndex: number) {
    let options = []
    for (let i = 0; i < this.numOptions; i++) {
      options.push({
        text: this.timeget[columIndex][i % this.numOptions],
        value6: i
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
            //  this.value7;
            }if(day === 'monNight'){
              this.value8 = value2['col -0'].text + '-' + value2['col -1'].text;
            }if(day === 'tusEve'){
              this.value9 = value2['col -0'].text + '-' + value2['col -1'].text;
            }if(day === 'tusNight'){
              this.value10 = value2['col -0'].text + '-' + value2['col -1'].text;
            }if(day === 'wedEve'){
              this.value11 = value2['col -0'].text + '-' + value2['col -1'].text;
            }if(day === 'wedNight'){
              this.value12 = value2['col -0'].text + '-' + value2['col -1'].text;
            }if(day === 'thurEve'){
              this.value13 = value2['col -0'].text + '-' + value2['col -1'].text;
            }
            if(day === 'thurNight'){
              this.value14 = value2['col -0'].text + '-' + value2['col -1'].text;
             //  this.value7;
             }if(day === 'friEve'){
               this.value15 = value2['col -0'].text + '-' + value2['col -1'].text;
             }if(day === 'friNight'){
               this.value16 = value2['col -0'].text + '-' + value2['col -1'].text;
             }if(day === 'satEve'){
               this.value17 = value2['col -0'].text + '-' + value2['col -1'].text;
             }if(day === 'satNight'){
               this.value18 = value2['col -0'].text + '-' + value2['col -1'].text;
             }if(day === 'sunEve'){
               this.value19 = value2['col -0'].text + '-' + value2['col -1'].text;
             }if(day === 'sunNight'){
               this.value20 = value2['col -0'].text + '-' + value2['col -1'].text;
             }
          }
        }
      ],
      columns: this.getcolumnsmon1()
    };
    let picker = await this.pickercontrl.create(options);
    picker.present()
  }

  getcolumnsmon1() {
    let columns = []
    for (let i = 0; i < this.numColumns; i++) {
      columns.push({
        name: `col -${i}`,
        options: this.getColumnOptionsmon1(i)
      })
    }
    return columns;
  }
  getColumnOptionsmon1(columIndex: number) {
    let options = []
    for (let i = 0; i < this.numOptions; i++) {
      options.push({
        text: this.timeget[columIndex][i % this.numOptions],
        value2: i
      })
    }
    return options;
  }

}
