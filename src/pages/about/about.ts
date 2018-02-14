import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { HomePage } from '../home/home';
import { Transfer2Page } from '../../pages/transfer2/transfer2';
import { Transfer3Page } from '../../pages/transfer3/transfer3';
import { TransactionServiceProvider } from '../../providers/transaction-service/transaction-service'

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController,public transactService: TransactionServiceProvider) {

  }
  transferToMyAcc(){
    this.transactService.showAlert("ATTENTION!!!", "This operation can not be performed because you currently have only one existing Phoenix Express account.");    
  }
  transferSameBank(){
    this.navCtrl.push(Transfer2Page)
  }
  transferOtherBank(){
    this.navCtrl.push(Transfer3Page)
  }
}
