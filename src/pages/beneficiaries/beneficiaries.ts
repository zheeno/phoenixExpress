import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TransactionServiceProvider } from '../../providers/transaction-service/transaction-service';
import { Transfer2_1Page } from '../../pages/transfer2-1/transfer2-1';

/**
 * Generated class for the BeneficiariesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-beneficiaries',
  templateUrl: 'beneficiaries.html',
})
export class BeneficiariesPage {
 
  Benefs:any;
  verifiedBen:any;
  temp:any;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams, 
    public transactService: TransactionServiceProvider) {
  }

  ionViewDidLoad() {
    this.Benefs = this.navParams.get("benefs");
  }

  wireSameBnkBen(destAccNo){//
    if(destAccNo > 0 ){
      this.transactService.postData({"acc_no": destAccNo, "token": localStorage.getItem("token")}, "verifyAcc")
      .then(result => {
        this.temp = result;
        this.verifiedBen = this.temp;
          if(this.verifiedBen[0].status == 0){
            this.transactService.showAlert("Invalid Account", "Account does not exist.<br>Please try again with a valid Phoenix Express account number.");
          }else{
            this.navCtrl.push(Transfer2_1Page, { "data": this.verifiedBen });
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

  delBen(index, id){
      this.transactService.postData({"user_id":this.transactService.account.user_id, "ben_id": id}, "delBenef")
      .then(result => {
        this.Benefs = result;
          if(this.Benefs.length == 0){
            this.transactService.showAlert("Info", "There are no beneficiaries associated with this account");
          }
        }, (err) => {
        //alert error
        this.transactService.showAlert("Connection Error", "Please check your internet settings");
      })
  }

}
