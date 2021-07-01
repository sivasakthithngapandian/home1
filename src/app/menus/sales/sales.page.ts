import { Component, OnInit } from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx'
import {ApiService} from 'src/app/services/api.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import {ActionSheetController} from '@ionic/angular';
import { UserproviderService } from 'src/app/services/userprovider.service';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {

  prodid:any;
public productDetail = {
    productname : '',
    productcolor: '',
    productmodel: '',
    productprice:''
  };
  allDetail:any=[];
  product:any=[];
  proInfo:any = [];
  staffmb = false;
  constructor(private camera: Camera,
              private api : ApiService,
              private firestore: FirestoreService,
              private actionSheetCtrl: ActionSheetController,
              private userProvideserv : UserproviderService,
              ) { }

    options: CameraOptions = {
           quality: 100,
           sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
           destinationType: this.camera.DestinationType.FILE_URI,
          encodingType: this.camera.EncodingType.JPEG,
           mediaType: this.camera.MediaType.PICTURE
              }
                         
  ngOnInit() {
    this.api.getaddproduct(this.userProvideserv.loggedUser.id).subscribe(use=>{
      console.log('product detail',use);
       this.api.productdata=use;
       for(let i of this.api.productdata){
         this.proInfo.push(i)
       }
    });

  }
  showHideForm() {
  this.staffmb = !this.staffmb;
    
 }
  addphoto() {
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
this.prodid = await this.userProvideserv.openCameraProduct();

 }
 async AccessGallery() {
   this.prodid = await this.userProvideserv.openAlbumProduct();

 }
  
  addProductDetail(){
    const selectedProduct={
    id:this.userProvideserv.loggedUser.id,
    prodid:this.prodid,
    product_img:this.api.product_img,
    productname: this.productDetail.productname,
    productcolor: this.productDetail.productcolor,
    productmodel:this.productDetail.productmodel,
    productprice:this.productDetail.productprice
  };
  console.log(this.productDetail);
  console.log('result',selectedProduct)
  this.api.updateProduct(selectedProduct.id, selectedProduct).subscribe((response) => {
    console.log('response', response)
  });
    this.staffmb=false;
    this.api.getaddproduct(this.userProvideserv.loggedUser.id).subscribe(use=>{
      console.log('product detail',use);
       this.api.productdata=use;
       for(let i of this.api.productdata){
         this.proInfo.push(i)
       }
    });
};
}
