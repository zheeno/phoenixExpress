import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { TransactionServiceProvider } from '../../providers/transaction-service/transaction-service'
import { BeneficiariesPage } from '../beneficiaries/beneficiaries';
import { Transfer2_1Page } from '../../pages/transfer2-1/transfer2-1';


/**
 * Generated class for the Transfer2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transfer2',
  templateUrl: 'transfer2.html',
})
export class Transfer2Page {
  destAccNo: number;
  temp: any;
  verified  = new BehaviorSubject<any>({}); //for storing the receiver's account details
  castVer = this.verified.asObservable();
  benefs:any;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public transactService: TransactionServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Transfer2Page');
  }

  beneficiaries(){ //...check for beneficiaries within the bank
    this.transactService.postData({"user_id":this.transactService.account.user_id}, "showBenef")
    .then(result => {
      this.benefs = result;
      console.log(this.benefs.length)
        if(this.benefs.length == 0){
          this.transactService.showAlert("Info", "There are no beneficiaries associated with this account");
        }else{
          //navigate to beneficiaries page 
          console.log(this.benefs)
            this.navCtrl.push(BeneficiariesPage, {"benefs": this.benefs});
        }
      }, (err) => {
      //alert error
      this.transactService.showAlert("Connection Error", "Please check your internet settings");
    })
  }


  verifyAccount(){
    if(this.destAccNo > 0 ){
      this.transactService.postData({"acc_no": this.destAccNo, "token": localStorage.getItem("token")}, "verifyAcc")
      .then(result => {
          this.temp = result;
          this.verified = this.temp;
          console.log(this.verified[0])
          if(this.verified[0].status == 0){
          this.transactService.showAlert("Invalid Account", "Account does not exist.<br>Please try again with a valid Phoenix Express account number.");
          }else{
            this.navCtrl.push(Transfer2_1Page, { "data": this.verified });
          }
        }, (err) => {
        //alert error
        this.transactService.showAlert("Connection Error", "Please check your internet settings");
      })
    }else{
        //alert user
        this.transactService.showAlert("Alert", "Please provide a valid account number");
      }
  }
  
    presentModal(page, data) { //modal method
      let modal = this.modalCtrl.create(page, data);
      modal.present();
    }
  
}
