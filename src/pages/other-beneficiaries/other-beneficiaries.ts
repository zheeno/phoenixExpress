import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TransactionServiceProvider } from '../../providers/transaction-service/transaction-service';
import { Transfer3Page } from '../../pages/transfer3/transfer3';

/**
 * Generated class for the BeneficiariesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-other-beneficiaries',
  templateUrl: 'other-beneficiaries.html',
})
export class OtherBeneficiariesPage {
 
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

  populateFields(id){
    this.navCtrl.push(Transfer3Page, {"data": this.Benefs[id]})
  }

  delOthBen(acc_no){
      this.transactService.postData({"user_id":this.transactService.account.user_id, "acc_no": acc_no}, "delOthBenef")
      .then(result => {
        this.Benefs = result;
          if(this.Benefs.length == 0){
            this.transactService.showAlert("Info", "There are no beneficiaries associated with this account");
          }
        }, (err) => {
        //alert error
        this.transactService.showAlert("Connection Error", "Please check your internet settings");
      })  }

}

